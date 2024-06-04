import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

interface NewTransferModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const NewTransferModal: React.FC<NewTransferModalProps> = ({ open, onOk, onCancel }) => {

  // Mock accounts data
  const accounts = [
    {
      id: '987654321',
      currency: 'EUR',
      balance: 2000
    },
    {
      id: '654321987',
      currency: 'GBP',
      balance: 1500
    }
  ];

  return (
    <Modal
      title="Make a transfer"
      onCancel={onCancel}
      open={open}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Transfer
        </Button>,
      ]}
    >
      <Form
        name="fund_transfer_form"
        onFinish={onOk}
        layout="vertical"
      >
        <Form.Item name="fromAccountId" label="From Account" rules={[{ required: true, message: 'Please select the source account!' }]}>
          <Select>
            {accounts.map(account => (
              <Select.Option key={account.id} value={account.id}>
                {account.id} - {account.currency} - {account.balance}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="toAccountId" label="To Account" rules={[{ required: true, message: 'Please select the destination account!' }]}>
          <Select>
            {accounts.map(account => (
              <Select.Option key={account.id} value={account.id}>
                {account.id} - {account.currency} - {account.balance}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the transfer amount!' }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTransferModal;