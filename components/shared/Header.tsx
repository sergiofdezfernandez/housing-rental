import { User } from '@/lib/model/domain_definitions';
import { createClient } from '@/lib/supabase/client';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Tooltip from 'antd/es/tooltip';
import { handleAuthError } from './error_handler';
import { useRouter } from 'next/navigation';

export function CustomHeader(props: { user?: User }) {
  const supabase = createClient();
  const router = useRouter();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      handleAuthError(error);
      return;
    }
    router.push('/login');
  };

  return (
    <Header
      style={{
        color: '#fffbe6',
        backgroundColor: '#141414',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <section style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
        <UserOutlined />
        <Tooltip title={props.user?.role}>
          <p>{props.user?.email}</p>
        </Tooltip>

        <Tooltip title="Cerrar sesión">
          <Button icon={<LogoutOutlined />} onClick={logOut} danger></Button>
        </Tooltip>
      </section>
    </Header>
  );
}
