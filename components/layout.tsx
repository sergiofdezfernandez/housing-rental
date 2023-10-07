import Icon, { BgColorsOutlined, HomeOutlined, WalletFilled } from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { Menu, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Header, Content, Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { useWeb3Context, IWeb3Context } from "./web3/Web3Context";
import Title from "antd/es/typography/Title";

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
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated,accountBalance  },
  } = useWeb3Context() as IWeb3Context;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline">
          {!isAuthenticated ? (
            <Menu.ItemGroup>
              <Menu.Item key={1} onClick={connectWallet}>
                <WalletFilled></WalletFilled>
                <span>Conectar cartera</span>
              </Menu.Item>
            </Menu.ItemGroup>
          ) : (
            <Menu.ItemGroup>
              <Menu.Item key={2}>
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
              <Menu.Item key={4} onClick={disconnect} danger={true}>
                <LogOutIcon></LogOutIcon>
                <span>Desconectar cartera</span>
              </Menu.Item>
            </Menu.ItemGroup>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{display:'flex', backgroundColor:colorBgContainer}}>
        <div className="logo" />
        <div style={{ flex: 1 }}></div>
        <div style={{color:'white'}}>
          <Typography.Text strong={true}>Balance de la cuenta: <span>{parseFloat(accountBalance!).toFixed(3)}</span><sub>ETH</sub></Typography.Text>
        </div>
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
