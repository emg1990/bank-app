import React from 'react';
import { Card } from 'antd';
import { IAccount } from '../../../../util/types';
import styles from './PersonalAccount.module.css';
import { roundDecimal } from '../../../../util/helpers';

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
        <span>Balance: {roundDecimal(account.balance || 0)} {account.currency}</span>
        </div>
      </Card>
    </div>
  );
};

export default PersonalAccount;
