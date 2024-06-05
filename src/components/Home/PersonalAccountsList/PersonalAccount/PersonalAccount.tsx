import React from 'react';
import { Card } from 'antd';
import { IAccount } from '../../../types';
import styles from './PersonalAccount.module.css';

interface PersonalAccountProps {
  account: IAccount;
}

const PersonalAccount: React.FC<PersonalAccountProps> = ({ account }) => {
  return (
    <div className={styles.container}>
      <Card className={styles.cardContainer}>
        <div className={styles.cardContent}>
        <span>Account ID: {account.accountId}</span>
        <span>{account.currency}</span>
        <span>Balance: ${account.balance}</span>
        <span>Owner ID: {account.ownerId}</span>
        </div>
      </Card>
    </div>
  );
};

export default PersonalAccount;
