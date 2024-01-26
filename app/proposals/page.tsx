'use client';
import React, { useState } from 'react';
import { IWeb3Context, useWeb3Context } from '../../components/web3/Web3Context';
import { useEffect } from 'react';
import { LeaseAgreement } from '../../lib/model/domain_definitions';
import { Card, Tooltip, Row, Col } from 'antd';
import Meta from 'antd/es/card/Meta';

const App: React.FC = () => {
  const {
    state: { contract, isAuthenticated },
  } = useWeb3Context() as IWeb3Context;
  const [leaseAgreements, setLeaseAgreements] = useState<Array<LeaseAgreement> | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeaseAgreements = async () => {
      const leaseAgreements: Array<LeaseAgreement> = await contract!.getRegisteredLeaseAgreement();
      setLeaseAgreements(leaseAgreements);
      setLoading(false);
    };
    if (contract && isAuthenticated) {
      getLeaseAgreements();
    } else {
      setLeaseAgreements([]);
    }
  }, [contract, isAuthenticated]);

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {leaseAgreements?.map((la) => (
        <Col span={6} key={la.id} xs={24} md={6}>
          <Card loading={loading} actions={[<Tooltip title="Alquilar" key="edit"></Tooltip>]}>
            <Meta
              avatar={'Id: ' + la.id.toString()}
              title={la.leaseDuration}
              description={la.state}
            />
            {la.state.toString()}
            {la.tenant.email}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default App;
