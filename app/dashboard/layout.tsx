'use client';
import { CustomHeader } from '@/components/shared/CustomHeader';
import { User } from '@/lib/model/domain_definitions';
import { createClient } from '@/lib/supabase/client';
import { HomeOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeOutlined },
  { name: 'Propiedades', href: '/dashboard/properties', icon: UnorderedListOutlined },
  { name: 'Propuestas', href: '/dashboard/proposals', icon: UploadOutlined },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const supabase = createClient();
  const [user, setUser] = useState<User>();

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
    fetchUser();
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <>
        <Sider breakpoint="lg" collapsedWidth={0}>
          <Menu
            theme="dark"
            items={[...links].map((link, index) => ({
              key: String(index + 1),
              icon: React.createElement(link.icon),
              label: <Link href={link.href}>{link.name}</Link>,
            }))}
          />
        </Sider>
      </>
      <Layout>
        <CustomHeader user={user}></CustomHeader>
        <Content
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer>Developed by Sergio Fernández ©2023-2024</Footer>
      </Layout>
    </Layout>
  );
}
