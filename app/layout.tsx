'use client';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React from 'react';
import '@/app/global.css';

const links = [
  { name: 'Home', href: '/', icon: UserOutlined },
  { name: 'Real State Properties', href: '/properties', icon: VideoCameraOutlined },
  { name: 'Proposals', href: '/proposals', icon: UploadOutlined },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fffbe6',
              colorBgLayout: '#fffbe6',
              colorFillContent: '#141414',
              colorBgContainer: '#141414',
            },
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Layout
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: colorBgContainer,
            }}
          >
            <Sider breakpoint="lg" collapsedWidth={0} style={{ backgroundColor: '#141414' }}>
              <Menu
                items={[...links].map((link, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(link.icon),
                  label: <Link href={link.href}>{link.name}</Link>,
                }))}
              />
            </Sider>
            <Layout>
              <Content>{children}</Content>
              <Footer>Developed by Sergio Fernández ©2023</Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
