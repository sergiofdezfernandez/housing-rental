import React, { useState } from 'react';
import Icon, {
  HomeOutlined,
  WalletFilled
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { IWeb3Context, useWeb3Context } from '../components/web3/Web3Context';
import Link from 'next/link';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const { Header, Content, Footer, Sider } = Layout;

const LogOutSvg = () => (
  <svg fill="#ffffff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.207 9H5V7h7.136L11.05 5.914 12.464 4.5 16 8.036l-3.536 3.535-1.414-1.414L12.207 9zM10 4H8V2H2v12h6v-2h2v4H0V0h10v4z" fill-rule="evenodd"></path> </g></svg>
);

const LogOutIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogOutSvg} {...props} />
);


const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context() as IWeb3Context;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg"
        collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" >
          <Menu.Item key={1}>
            <HomeOutlined></HomeOutlined>
            <span>Inicio</span>
            <Link href={'/'}></Link>
          </Menu.Item>
          {!isAuthenticated ? (
            <Menu.Item key={2} onClick={connectWallet}>
              <WalletFilled></WalletFilled>
              <span>Conectar cartera</span>
            </Menu.Item>
          ) : (
            <Menu.Item key={3} danger={true} onClick={disconnect}>
              <LogOutIcon />
              <span>Desconectar cartera</span>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div>
            Bienvenido al sistema basado en Web3 para el alquiler de propiedades.
          </div>
        </Content>
        <Footer>Housing Rental System Developed by Sergio Fernández Fernández ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;