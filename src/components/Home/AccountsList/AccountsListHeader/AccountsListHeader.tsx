import React from 'react';
import styles from './AccountsListHeader.module.css';
import { Button } from 'antd';
interface AccountsListHeaderProps {
  onClick: () => void;
}

const AccountsListHeader: React.FC<AccountsListHeaderProps> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <span>Accounts</span>
      <Button shape="round" onClick={onClick}>Add</Button>
    </div>
  );
};

export default AccountsListHeader;