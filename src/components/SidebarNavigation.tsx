import React from 'react';
import {Button, Layout, Menu} from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  CarryOutOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {FiClipboard} from 'react-icons/fi';

import {NavLink} from 'react-router-dom';

export interface ILayoutProps {}

const {SubMenu} = Menu;
const {Sider} = Layout;

export interface ISidebarNavigationProps {
  collapsed: boolean;
}

const SidebarNavigation: React.FC<ISidebarNavigationProps> = ({collapsed, ...props}) => {
  return (
    <Sider trigger={null} theme="dark" collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[window.location.pathname.toString()]}
        defaultOpenKeys={[]}
        style={{borderRight: 0}}>
        <Menu.Item
          key="1"
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'transparent',
          }}>
          <Button
            icon={
              <PlusCircleOutlined
                style={
                  collapsed
                    ? {
                        lineHeight: 'initial',
                        paddingTop: 4,
                      }
                    : {}
                }
              />
            }
            block
            type="primary">
            Add New Board
          </Button>
        </Menu.Item>
        <Menu.Item key={'/'} icon={<FiClipboard />}>
          <NavLink to="/">
            <span>Board 1</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarNavigation;
