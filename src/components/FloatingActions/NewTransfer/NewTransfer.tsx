import React, { useState } from 'react';
import { Button } from 'antd';
import NewTransferModal from './NewTransferModal/NewTransferModal';
import { TransactionOutlined } from '@ant-design/icons';

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
        shape="round"
        type='primary'
        size="large"
      >
        <TransactionOutlined />
        New Transfer
      </Button>
      {isModalOpen && <NewTransferModal open={isModalOpen} onCancel={closeNewTransferModal} />}
    </>
  );
};

export default NewTransfer;