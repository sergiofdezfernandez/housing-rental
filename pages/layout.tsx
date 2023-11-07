import { DisconnectOutlined, HomeOutlined, WalletFilled } from '@ant-design/icons';
import { Button, Menu, Row, Col, Typography, theme, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Layout, { Header, Content, Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import type { IWeb3Context } from '../components/web3/Web3Context';
import { useWeb3Context } from '../components/web3/Web3Context';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [userDetails, setUserDetails] = useState({
    email: '',
    role: '',
    authenticated: false,
  });
  const router = useRouter();

  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, accountBalance },
  } = useWeb3Context() as IWeb3Context;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user != null) {
        try {
          const { data } = await supabase.from('user_roles').select('*').eq('id', user.id);
          if (data != null) {
            setUserDetails({
              role: data[0]?.role || 'TENANT',
              email: data[0]?.email || 'unknown',
              authenticated: true,
            });
          }
        } catch (error) {
          setUserDetails({
            role: '',
            email: '',
            authenticated: false,
          });
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, [setUserDetails]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      disconnect;
      router.push('/');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline">
          {userDetails.authenticated && (
            <Menu.ItemGroup>
              <Menu.Item key={2}>
                <HomeOutlined></HomeOutlined>
                <span>Inicio</span>
                <Link href={'/'}></Link>
              </Menu.Item>
              <Menu.Item key={10}>
                <span>Propiedades</span>
                <Link href={'/dashboard/properties'}></Link>
              </Menu.Item>
              <Menu.Item key={4}>
                <span>Propuestas de contrato</span>
                <Link href={'/dashboard/proposals'}></Link>
              </Menu.Item>
              <Menu.Item onClick={signOut} danger={true}>
                <DisconnectOutlined />
                <span>Cerrar Sesión</span>
              </Menu.Item>
            </Menu.ItemGroup>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', backgroundColor: colorBgContainer }}>
          <div className="logo" />
          <div style={{ flex: 1 }}></div>
          {isAuthenticated && userDetails.authenticated ? (
            <Row>
              <Col span={16}>
                <Typography.Text strong={true}>
                  Balance de la cuenta: <span>{parseFloat(accountBalance!).toFixed(3)}</span>
                  <sub>ETH</sub>
                </Typography.Text>
              </Col>
              <Space />
              <Col span={8}>
                <Button key={5} onClick={disconnect} danger={true}>
                  <WalletFilled></WalletFilled>
                  <span>Desconectar cartera</span>
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span={24}>
                <Button key={6} onClick={connectWallet}>
                  <WalletFilled></WalletFilled>
                  <span>Conectar cartera</span>
                </Button>
              </Col>
            </Row>
          )}
        </Header>
        <Content style={{ margin: '1em' }}>{children}</Content>
        <Footer>Housing Rental System Developed by Sergio Fernández Fernández ©2023</Footer>
      </Layout>
    </Layout>
  );
}
