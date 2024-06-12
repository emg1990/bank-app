import React from 'react';
import NewTransfer from './NewTransfer/NewTransfer';
import styles from './FloatingActions.module.css';
import NewPersonalAccount from './NewPersonalAccount/NewPersonalAccount';

const FloatingActions: React.FC = () => {
  return (
    <div className={styles.container}>
      <NewTransfer />
      <NewPersonalAccount />
    </div>
  );
};

export default FloatingActions;