import React from 'react';
import { Avatar, Button, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>logo</div>
      <Menu mode='vertical' className={styles.menu}>
        <Menu.SubMenu
          title={
            <div className={styles.userMenu}>
              <Avatar icon={<UserOutlined />} />
              <span>John Doe</span>
            </div>
          }
        >
          <Menu.Item key="account">
            <UserOutlined /> Account
          </Menu.Item>
          <Menu.Item key="logout">
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Header;
