import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { type IAccount } from '../../../types';
import useCurrencies from '../../../../hooks/useCurrencies';

interface AccountModalProps {
  open: boolean;
  onCancel: () => void;
  account: IAccount | undefined;
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onCancel, account }) => {
  const [form] = Form.useForm<IAccount | undefined>();
  const isEdit = !!account;
  const currencies = useCurrencies();

  useEffect(() => {
    form.setFieldsValue(account || {});

    return () => form.resetFields();
  }, [account]);

  const handleSave = () => {
    // Add logic to save the updated account information
    onCancel();
  };

  const action = isEdit ? "Update" : "Create";

  return (
    <Modal
      title={`${action} an account`}
      onCancel={onCancel}
      open={open}
      onOk={handleSave}
      okText={action}
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
            {currencies.map(currency => (
              <Select.Option key={currency.code} value={currency.code}>{`${currency.name} - ${currency.symbol}`}</Select.Option>
            ))}
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
