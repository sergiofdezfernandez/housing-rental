import React, { useState } from "react";
import { IWeb3Context, useWeb3Context } from "../components/web3/Web3Context";
import { useEffect } from "react";
import { Property } from "../components/model/Property";
import Image from "next/image";
import Icon, {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Switch, Card, Avatar, Skeleton, Tooltip, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const App: React.FC = () => {
  const {
    state: { contract, isAuthenticated },
  } = useWeb3Context() as IWeb3Context;
  const [properties, setProperties] = useState<Array<Property> | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      const properties: Array<Property> =
        await contract.getRegisteredProperties();
      setProperties(properties);
      setLoading(false);
    };
    if (contract && isAuthenticated) {
      getProperties();
    } else {
      setProperties([]);
    }
  }, [contract, isAuthenticated]);

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {properties?.map((p) => (
        <Col span={6} key={p.id} xs={24} md={6}>
          <Card
            loading={loading}
            actions={[
              <Tooltip title="Alquilar" key="edit">
                <Link
                  href={{
                    pathname: "/rentProperty",
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
              <Image
                alt="example"
                src="static/images/house.svg"
                width={200}
                height={200}
              ></Image>
            }
          >
            <Meta
              avatar={"Id: " + p.id.toString()}
              title={p.price + "€"}
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
  );
};

export default App;
