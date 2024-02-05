'use client';
import {
  UserOutlined,
  UploadOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@/app/global.css';
import Web3ContextProvider from '@/components/web3/Web3Context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { supabase } from '@/lib/supabase-client';
import { handleAuthError } from '@/components/shared/error_handler';

const links = [
  { name: 'Home', href: '/', icon: HomeOutlined },
  { name: 'Real State Properties', href: '/properties', icon: UnorderedListOutlined },
  { name: 'Proposals', href: '/proposals', icon: UploadOutlined },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) handleAuthError(error);
      else {
        if (data.session) setUserEmail(data.session.user.email!);
      }
    };

    fetchProfile();
  }, []);
  return (
    <html lang="en">
      <body>
        <Web3ContextProvider>
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
                <Header
                  style={{
                    color: '#fffbe6',
                    backgroundColor: '#141414',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <UserOutlined>{userEmail}</UserOutlined>
                </Header>
                <Content>{children}</Content>
                <SpeedInsights />
                <Footer>Developed by Sergio Fernández ©2023-2024</Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </Web3ContextProvider>
      </body>
    </html>
  );
}
