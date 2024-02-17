'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LeaseAgreement } from '../../../lib/model/domain_definitions';
import { Card, Tooltip, Row, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import { useContractContext } from '@/components/shared/context/ContractContext';

const App: React.FC = () => {
  const [leaseAgreements, setLeaseAgreements] = useState<Array<LeaseAgreement> | null>([]);

  const { contractInstance } = useContractContext() || {};

  useEffect(() => {
    const getLeaseAgreements = async () => {
      try {
        const leaseAgreements: LeaseAgreement[] =
          await contractInstance?.getRegisteredLeaseAgreement();
        setLeaseAgreements(leaseAgreements);
      } catch (error) {
        console.log(error);
      }
    };
    getLeaseAgreements();
  }, [contractInstance]);

  return (
    <section>
      <Title level={1}>Proposals</Title>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {leaseAgreements?.map((la) => (
          <Col span={6} key={la.id} xs={24} md={6}>
            <Card actions={[<Tooltip title="Alquilar" key="edit"></Tooltip>]}>
              <Meta avatar={'Id: ' + la.id.toString()} description={la.state} />
              {la.state.toString()}
              {la.tenant.email}
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default App;
