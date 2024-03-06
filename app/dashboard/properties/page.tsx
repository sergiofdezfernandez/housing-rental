'use client';
import { Property } from '@/lib/model/domain_definitions';
import { KeyOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Col, Card, FloatButton, Button, Tag, Empty } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useContractContext } from '@/components/shared/context/ContractContext';
import useUserProfile from '@/hooks/useUserProfile';
import { createClient } from '@/lib/supabase/client';

export default function properties() {
  const supabase = createClient();
  const { replace } = useRouter();
  const [properties, setProperties] = useState<Array<Property> | null>([]);
  const [globalLoading, setLoading] = useState(true);
  const { contractInstance } = useContractContext() || {};
  const { userProfile } = useUserProfile(supabase) || {};
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
      {userProfile?.roles?.includes('LANDLORD') && (
        <FloatButton shape="circle" type="default" icon={<PlusOutlined />} onClick={addProperty} />
      )}

      <Title level={1}>Propiedades</Title>
      <Row gutter={16}>
        {properties?.length && properties.length > 0 ? (
          properties?.map((p) => (
            <Col span={4} key={p.id} xs={24} md={6}>
              <Card
                title={p.postalAddress}
                loading={globalLoading}
                cover={
                  <Image alt="example" src="properties/house.svg" width={200} height={200}></Image>
                }
                actions={[
                  <Button
                    onClick={() => rentProperty(p)}
                    disabled={p.isRented || userProfile?.roles?.includes('LANDLORD')}
                  >
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
          ))
        ) : (
          <Col span={24}>
            <Empty />
          </Col>
        )}
      </Row>
    </section>
  );
}
