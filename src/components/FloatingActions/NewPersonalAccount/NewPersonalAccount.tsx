import React, { useState } from 'react';
import { Button } from 'antd';
import NewPersonalAccountModal from './NewPersonalAccountModal/NewPersonalAccountModal';
import { UserOutlined } from '@ant-design/icons';

const NewPersonalAccount: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewPersonalAccountModal = () => {
    setIsModalOpen(true);
  };

  const closeNewPersonalAccountModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={openNewPersonalAccountModal}
        shape="round"
        size="large"
      >
        <UserOutlined />
        New Account
      </Button>
      {isModalOpen && <NewPersonalAccountModal open={isModalOpen} onCancel={closeNewPersonalAccountModal} />}
    </>
  );
};

export default NewPersonalAccount;