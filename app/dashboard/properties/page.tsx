'use client';
import { Property } from '@/lib/model/domain_definitions';
import { KeyOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Col, Card, FloatButton, Button, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useContractContext } from '@/components/shared/context/ContractContext';

const App: React.FC = () => {
  const { replace } = useRouter();
  const [properties, setProperties] = useState<Array<Property> | null>([]);
  const [loading, setLoading] = useState(true);
  const { contractInstance } = useContractContext() || {};
  const pathname = usePathname();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const properties: Property[] = await contractInstance?.getRegisteredProperties();
        setLoading(false);
        setProperties(properties);
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, [contractInstance]);

  function addProperty() {
    replace(`${pathname}/new`);
  }

  function rentProperty(property: Property) {
    const params = new URLSearchParams();
    params.set('propertyId', property.id.toString());
    params.set('securityDeposit', property.securityDeposit.toString());
    params.set('price', property.price.toString());
    replace(`${pathname}/rent?${params.toString()}`);
  }

  return (
    <section>
      <FloatButton shape="circle" type="default" icon={<PlusOutlined />} onClick={addProperty} />
      <Title level={1}>Propiedades</Title>
      <Row gutter={16}>
        {properties?.map((p) => (
          <Col span={4} key={p.id} xs={24} md={6}>
            <Card
              title={p.postalAddress}
              loading={loading}
              cover={
                <Image alt="example" src="properties/house.svg" width={200} height={200}></Image>
              }
              actions={[
                <Button onClick={() => rentProperty(p)} disabled={p.isRented}>
                  <KeyOutlined />
                  Alquilar
                </Button>,
              ]}
            >
              {p.isRented && (
                <Tag color="default" icon={<StopOutlined />}>
                  Alquilada
                </Tag>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default App;
