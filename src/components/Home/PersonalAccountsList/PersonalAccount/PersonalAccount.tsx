import React from 'react';
import { Card } from 'antd';
import { IAccount } from '../../../../types/types';
import styles from './PersonalAccount.module.css';

interface PersonalAccountProps {
  account: IAccount;
}

const PersonalAccount: React.FC<PersonalAccountProps> = ({ account }) => {
  return (
    <div className={styles.container}>
      <Card className={styles.cardContainer}>
        <div className={styles.cardContent}>
        <span>{account.name}</span>
        <span>IBAN: {account.id}</span>
        <span>Balance: {account.balance} {account.currency}</span>
        </div>
      </Card>
    </div>
  );
};

export default PersonalAccount;
