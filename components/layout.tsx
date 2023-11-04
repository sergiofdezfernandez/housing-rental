import Icon, {DisconnectOutlined, HomeOutlined, WalletFilled } from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { Button, Menu, Row,Col, Typography, theme, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Header, Content, Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { useWeb3Context, IWeb3Context } from "./web3/Web3Context";
import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

const LogOutSvg = () => (
  <svg
    fill="#ffffff"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M12.207 9H5V7h7.136L11.05 5.914 12.464 4.5 16 8.036l-3.536 3.535-1.414-1.414L12.207 9zM10 4H8V2H2v12h6v-2h2v4H0V0h10v4z"
        fillRule="evenodd"
      ></path>
    </g>
  </svg>
);

const LogOutIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogOutSvg} {...props} />
);

export default function AppLayout({ children }: LayoutProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [userDetails,setUserDetails] = useState({email:'',role:'',authenticated:false});
  const router = useRouter();
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated,accountBalance  },
  } = useWeb3Context() as IWeb3Context;


  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        try {
          const {data,error} = await supabase.from('user_roles').select('*').eq('id', user.id);

          if(error){
            console.log(error)
          }
          if(data){
            setUserDetails({
              role: data[0]?.role || 'TENANT',
              email: data[0]?.email || 'unknown',
              authenticated:true
            });
          }
        } catch (error) {
          // Handle any async/await errors
          setUserDetails({
            role:'',
            email:'',
            authenticated:false
          });
          console.error('Error fetching user details:', error);
        }}}
        fetchUserDetails();
      });
   const signOut = async () =>{
    const {error}  = await supabase.auth.signOut()
    if(error){
      console.log(error)
    }else{
      router.push('/')
    }
   }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline">
            {!userDetails.authenticated ? ( <Menu.ItemGroup>
              <Menu.Item key={0}>
                <Link href={'/signup'}></Link>  
                <span>Registrarse</span>
              </Menu.Item>
              <Menu.Item key={0}>
                <Link href={'/login'}></Link>  
                <span>Iniciar sesión</span>
              </Menu.Item></Menu.ItemGroup>
             ):(<Menu.ItemGroup><Menu.Item key={2}>
              <HomeOutlined></HomeOutlined>
              <span>Inicio</span>
              <Link href={"/"}></Link>
            </Menu.Item>
            <Menu.Item key={3}>
              <span>Registrar propiedad</span>
              <Link href={"/registerProperty"}></Link>
            </Menu.Item>
            <Menu.Item key={5}>
              <span>Propuestas de contrato</span>
              <Link href={"/rentProposals"}></Link>
            </Menu.Item>
            <Menu.Item onClick={signOut} danger={true}>
            <DisconnectOutlined />
              <span>Cerrar Sesión</span>
            </Menu.Item>
            </Menu.ItemGroup> )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{display:'flex', backgroundColor:colorBgContainer}}>
        <div className="logo" />
        <div style={{ flex: 1 }}></div>
        {isAuthenticated ? (        <Row>
          <Col span={16}>
          <Typography.Text strong={true}>Balance de la cuenta: <span>{parseFloat(accountBalance!).toFixed(3)}</span><sub>ETH</sub></Typography.Text>
          </Col>
          <Space/>
          <Col span={8}>
          <Button key={1} onClick={disconnect} danger={true}>
                        <WalletFilled></WalletFilled>
                        <span>Desconectar cartera</span>
                      </Button>
                      </Col>
        </Row>):(
          <Row>
            <Col span={24}>        
        <Button key={1} onClick={connectWallet}>
        <WalletFilled></WalletFilled>
        <span>Conectar cartera</span>
        </Button></Col>

          </Row>

        )}
        </Header>            
        <Content style={{ margin: "1em" }}>
          <main>{children}</main>
        </Content>
        <Footer>
          Housing Rental System Developed by Sergio Fernández Fernández ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}
