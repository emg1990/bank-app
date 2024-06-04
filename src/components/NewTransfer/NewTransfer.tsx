import React, { useState } from 'react';
import NewTransferButton from './NewTransferButton';
import NewTransferModal from './NewTransferModal';

const NewTransfer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewTransferModal = () => {
    setIsModalOpen(true);
  };

  const closeNewTransferModal = () => {
    setIsModalOpen(false);
  };

  const makeTransfer = () => {
    // Make transfer
    // Clear form
    closeNewTransferModal();
  }

  return (
    <>
      <NewTransferButton openNewTransferModal={openNewTransferModal} />
      <NewTransferModal open={isModalOpen} onOk={makeTransfer} onCancel={closeNewTransferModal} />
    </>
  );
};

export default NewTransfer;