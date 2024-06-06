import React from 'react';
import { Avatar, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const items: ItemType<MenuItemType>[] = [
    {
      key: 'user',
      label: (
        <div className={styles.userMenu}>
          <Avatar icon={<UserOutlined />} />
          <span>John Doe</span>
        </div>
      ),
      children: [
        {
          key: 'account',
          icon: <UserOutlined />,
          label: 'Account',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
        },
      ],
    },
  ];
  return (
    <div className={styles.header} >
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + '/bank_logo.jpg'} alt="Bank Logo" style={{ height: '60px' }}/>
      </div>
      <Menu mode='vertical' className={styles.menu} items={items}/>
    </div>
  );
};

export default Header;
