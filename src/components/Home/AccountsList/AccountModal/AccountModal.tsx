import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { type IAccount } from '../../../types';

interface AccountModalProps {
  open: boolean;
  onCancel: () => void;
  account: IAccount | undefined;
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onCancel, account }) => {
  const [form] = Form.useForm<IAccount | undefined>();
  const isEdit = !!account;

  useEffect(() => {
    form.setFieldsValue(account || {});

    return () => form.resetFields();
  }, [account]);

  const handleSave = () => {
    // Add logic to save the updated account information
    onCancel();
  };

  return (
    <Modal
      title="Make a transfer"
      onCancel={onCancel}
      open={open}
      onOk={handleSave}
      okText={isEdit ? "Update" : "Create"}
    >
      <Form
        name="account_form"
        form={form}
        initialValues={account}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="ownerId" label="Owner ID" rules={[{ required: true, message: 'Please input the owner ID!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="currency" label="Currency" rules={[{ required: true, message: 'Please select the currency!' }]}>
          <Select>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Balance">
          <span>{account?.balance || 0}</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};


export default AccountModal;
