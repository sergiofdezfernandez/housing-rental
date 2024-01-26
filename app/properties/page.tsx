'use client';
import { IWeb3Context, useWeb3Context } from '@/components/web3/Web3Context';
import { Property } from '@/lib/model/domain_definitions';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Tooltip, FloatButton } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  const router = useRouter();
  const {
    state: { contract, isAuthenticated },
  } = useWeb3Context() as IWeb3Context;
  const [properties, setProperties] = useState<Array<Property> | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      const properties: Array<Property> = await contract.getRegisteredProperties();
      setProperties(properties);
      setLoading(false);
    };
    if (contract && isAuthenticated) {
      getProperties();
    } else {
      setProperties([]);
    }
  }, [contract, isAuthenticated]);

  function addProperty() {
    router.push('/properties/new');
  }

  return (
    <section>
      <FloatButton shape="circle" type="default" icon={<PlusOutlined />} onClick={addProperty} />
      <Title level={1}>Properties page</Title>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {properties?.map((p) => (
          <Col span={6} key={p.id} xs={24} md={6}>
            <Card
              loading={loading}
              actions={[
                <Tooltip title="Alquilar" key="edit">
                  <Link
                    href={{
                      pathname: '/properties/rent',
                      query: {
                        propertyId: p.id.toString(),
                        securityDeposit: p.securityDeposit.toString(),
                      },
                    }}
                  >
                    <EditOutlined />
                  </Link>
                </Tooltip>,
              ]}
              cover={
                <Image alt="example" src="properties/house.svg" width={200} height={200}></Image>
              }
            >
              <Meta
                avatar={'Id: ' + p.id.toString()}
                title={p.price + '€'}
                description={p.description}
              />
              <dl>
                <dt>Dirección postal:</dt>
                <dd>{p.postalAddress}</dd>
                <dt>Nombre arrendatario</dt>
                <dd>{p.landlord.name}</dd>
              </dl>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default App;
