'use client';
import { Property } from '@/lib/model/domain_definitions';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Tooltip, FloatButton } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractContext } from '@/components/shared/context/ContractContext';

const App: React.FC = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<Array<Property> | null>([]);
  const { contractInstance } = useContractContext() || {};

  useEffect(() => {
    const getProperties = async () => {
      try {
        const properties: Property[] = await contractInstance?.getRegisteredProperties();
        setProperties(properties.filter((property) => !property.isRented));
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, [contractInstance]);

  function addProperty() {
    router.push('properties/new');
  }

  return (
    <section>
      <FloatButton shape="circle" type="default" icon={<PlusOutlined />} onClick={addProperty} />
      <Title level={1}>Properties</Title>
      <Row gutter={[8, 8]}>
        {properties?.map((p) => (
          <Col span={4} key={p.id} xs={24} md={6}>
            <Card
              actions={[
                <Tooltip title="Alquilar" key="edit">
                  <Link
                    href={{
                      pathname: '/dashboard/properties/rent',
                      query: {
                        propertyId: p.id.toString(),
                        securityDeposit: p.securityDeposit.toString(),
                        price: p.price.toString(),
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
