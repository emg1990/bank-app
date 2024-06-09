import React, { useState } from 'react';
import { Button } from 'antd';
import NewTransferModal from './NewTransferModal/NewTransferModal';
import styles from './NewTransfer.module.css';

const NewTransfer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewTransferModal = () => {
    setIsModalOpen(true);
  };

  const closeNewTransferModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={openNewTransferModal}
        className={styles.button}
        shape="round"
        type='primary'
        size="large"
      >
        New Transfer
      </Button>
      {isModalOpen && <NewTransferModal open={isModalOpen} onCancel={closeNewTransferModal} />}
    </>
  );
};

export default NewTransfer;