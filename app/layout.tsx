'use client';
import { UploadOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@/app/global.css';
import Web3ContextProvider from '@/components/web3/Web3Context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { CustomHeader } from '@/components/shared/Header';
import { User } from '@/lib/model/domain_definitions';
import { createClient } from '@/lib/supabase/client';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/', icon: HomeOutlined },
  { name: 'Real State Properties', href: '/properties', icon: UnorderedListOutlined },
  { name: 'Proposals', href: '/proposals', icon: UploadOutlined },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        return;
      }

      const { data: userRoleData, error: userRoleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('id', userData.user.id);
      if (userRoleError) {
        return;
      }
      setUser({ email: userData.user.email, role: userRoleData[0]?.role_name || 'DEFAULT_ROLE' });
    };
    if (initialized || user) {
      fetchUser();
    } else {
      setInitialized(true);
    }
  }, [user]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
              {pathName !== '/login' && pathName !== '/signup' && (
                <>
                  <Sider breakpoint="lg" collapsedWidth={0} style={{ backgroundColor: '#141414' }}>
                    <Menu
                      items={[...links].map((link, index) => ({
                        key: String(index + 1),
                        icon: React.createElement(link.icon),
                        label: <Link href={link.href}>{link.name}</Link>,
                      }))}
                    />
                  </Sider>
                </>
              )}
              <Layout>
                {pathName !== '/login' && pathName !== '/signup' && (
                  <CustomHeader user={user}></CustomHeader>
                )}
                <Content>
                  <AntdRegistry>{children}</AntdRegistry>
                </Content>
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
