import React from "react";
import { Layout, Breadcrumb } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SidebarNavigation from "./SidebarNavigation";

export interface ILayoutProps {}

const { Header, Content } = Layout;

const LayoutPage: React.FC<ILayoutProps> = ({ children, ...props }) => {
      const [collapsed, setCollapsed] = React.useState<boolean>(false);

      const toggle = () => setCollapsed(!collapsed);

      return (
        <Layout>
          {/* Sidebar Navigation */}
          <SidebarNavigation collapsed={collapsed} />

          {/* Layout */}
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Header>
            <Content
              style={{
                margin: '15px 16px 15px',
                minHeight: 280,
                overflow: 'auto',
              }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      );
};

export default LayoutPage;
