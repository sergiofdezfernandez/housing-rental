'use client';
import { useContractContext } from '@/components/shared/context/ContractContext';
import { LeaseAgreement } from '@/lib/model/domain_definitions';
import { Row, Col, Card } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [leaseAgreements, setLeaseAgreements] = useState<Array<LeaseAgreement> | null>([]);
  const { contractInstance } = useContractContext() || {};

  useEffect(() => {
    const getLeaseAgreements = async () => {
      try {
        const leaseAgreements: LeaseAgreement[] =
          await contractInstance?.getRegisteredLeaseAgreement();
        setLeaseAgreements(leaseAgreements.filter((la) => la.tenant.email === 'sergio@uniovi.es'));
      } catch (error) {
        console.error(error);
      }
    };
    getLeaseAgreements();
  }, [contractInstance]);

  return (
    <section>
      <Title level={1}>Mis Contratos activos</Title>
      <Row gutter={[8, 8]}>
        {leaseAgreements?.map((la) => (
          <Col span={4} key={la.id} xs={24} md={6}>
            <Card
              actions={[]}
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
              </dl>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default App;
