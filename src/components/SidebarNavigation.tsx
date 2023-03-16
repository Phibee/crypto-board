import React from 'react';
import {Button, Input, Layout, Menu, Modal} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {FiClipboard} from 'react-icons/fi';

import {NavLink} from 'react-router-dom';
import useAppStore from '../store';

export interface ILayoutProps {}

const {Sider} = Layout;

export interface ISidebarNavigationProps {
  collapsed: boolean;
}

const SidebarNavigation: React.FC<ISidebarNavigationProps> = ({collapsed, ...props}) => {
  const {addBoard, boards} = useAppStore();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [inputVal, setInputVal] = React.useState('');

  const handleAddBoard = () => {
    setIsModalVisible(true);
    setInputVal('');
  };

  const handleOnOk = React.useCallback(() => {
    addBoard(inputVal);
    setIsModalVisible(false);
  }, [inputVal, addBoard]);

  const handleOnCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
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
              onClick={handleAddBoard}
              style={{backgroundColor: '#48c50b', border: 'none', color: 'white'}}>
              Add New Board
            </Button>
          </Menu.Item>
          {boards.map(item => (
            <Menu.Item key={`/board/${item.id}`} icon={<FiClipboard />}>
              <NavLink to={`/board/${item.id}`}>
                <span>{item.title}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Modal for new board */}
      <Modal
        title="Create New Board"
        visible={isModalVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}>
        <Input
          placeholder="Enter Board's name"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default SidebarNavigation;
