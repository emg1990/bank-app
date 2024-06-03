import React from 'react';
import { Button } from 'antd';
import styles from './NewTransfer.module.css';

interface NewTransferButtonProps {
  openNewTransferModal: () => void;
}

const NewTransferButton: React.FC<NewTransferButtonProps> = ({ openNewTransferModal }) => {
  return (
    <Button
      onClick={openNewTransferModal}
      className={styles.button}
      shape="round"
      type='primary'
      size="large"
    >
      New Transfer
    </Button>
  );
};

export default NewTransferButton;