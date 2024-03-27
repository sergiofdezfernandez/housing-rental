'use client';
import CustomBreadCrumb from '@/components/shared/Breadcrumb';
import { CustomHeader } from '@/components/shared/CustomHeader';
import { User } from '@/lib/model/domain_definitions';
import { createClient } from '@/lib/supabase/client';
import { FolderOpenOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const links = [
  { key: 1, title: 'Inicio', href: '/dashboard', icon: HomeOutlined, isOnMenu: true },
  {
    key: 2,
    title: 'Propiedades',
    href: '/dashboard/properties',
    icon: UnorderedListOutlined,
    isOnMenu: true,
  },
  {
    key: 3,
    title: 'Nueva propiedad',
    href: '/dashboard/properties/new',
    isOnMenu: false,
    icon: React.Component,
  },
  {
    key: 4,
    title: 'Mis contratos',
    href: '/dashboard/proposals',
    icon: FolderOpenOutlined,
    isOnMenu: true,
  },
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
      setUser({ email: userData.user.email, roles: userRoleData[0]?.roles });
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
            items={[...links]
              .filter((link) => link.isOnMenu)
              .map((link) => ({
                key: link.key,
                icon: React.createElement(link.icon),
                label: <Link href={link.href}>{link.title}</Link>,
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
          <CustomBreadCrumb />
          {children}
        </Content>
        <Footer>Developed by Sergio Fernández ©2023-2024</Footer>
      </Layout>
    </Layout>
  );
}
