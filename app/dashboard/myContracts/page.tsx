'use client';
import { useContractContext } from '@/components/shared/context/ContractContext';
import useUserProfile from '@/hooks/useUserProfile';
import { LeaseAgreement, State } from '@/lib/model/domain_definitions';
import { createClient } from '@/lib/supabase/client';
import { EuroCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Tooltip, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const supabase = createClient();
  const [leaseAgreements, setLeaseAgreements] = useState<Array<LeaseAgreement> | null>([]);
  const { contractInstance } = useContractContext() || {};
  const { userProfile } = useUserProfile(supabase) || {};

  useEffect(() => {
    const getLeaseAgreements = async () => {
      try {
        const leaseAgreements: LeaseAgreement[] =
          await contractInstance?.getRegisteredLeaseAgreement();
        setLeaseAgreements(leaseAgreements);
      } catch (error) {
        console.error(error);
      }
    };
    getLeaseAgreements();
  }, [contractInstance, userProfile]);

  async function payRent(agreementId: number, price: number) {
    try {
      await contractInstance?.payRent(agreementId, { value: price });
    } catch (error: any) {
      notification.error({ message: error.reason });
    }
  }

  async function returnProperty(agreementId: number) {
    try {
      await contractInstance?.returnProperty(agreementId);
    } catch (error: any) {
      notification.error({ message: error.reason });
    }
  }

  return (
    <section>
      <Title level={1}>Mis Contratos</Title>
      <Row gutter={[8, 8]}>
        {leaseAgreements?.map((la) => (
          <Col span={4} key={la.id} xs={24} md={6}>
            <Card
              actions={[
                <Tooltip title="Pagar" key="edit">
                  <Button
                    onClick={() => payRent(la.id, la.property.price)}
                    icon={<EuroCircleOutlined />}
                  >
                    Pagar Renta
                  </Button>
                </Tooltip>,
                <Tooltip title="Finalizar Alquiler" key="edit">
                  <Button onClick={() => returnProperty(la.id)} icon={<RollbackOutlined />}>
                    Finalizar Contrato
                  </Button>
                </Tooltip>,
              ]}
              cover={
                <Image
                  alt="example"
                  src="myProperties/current_contract.svg"
                  loading="lazy"
                  width={100}
                  height={100}
                  quality={100}
                ></Image>
              }
            >
              <dl>
                <dt>Inquilino</dt>
                <dd>{la.tenant.name}</dd>
                <dt>Estado</dt>
                <dd>{State[la.state]}</dd>
                <dt>Coste</dt>
                <dd>{la.property.price.toString()}€</dd>
                <dt>Renta pagada</dt>
                <dd>{la.totalRentPaid.toString()}</dd>
              </dl>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default App;
