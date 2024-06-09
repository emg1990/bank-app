import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { type IAccount } from '../../../../../util/types';
import { useAppContext } from '../../../../../contexts/AppContext';

interface AccountModalProps {
  open: boolean;
  onCancel: () => void;
  account: IAccount | undefined;
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onCancel, account }) => {
  const [form] = Form.useForm<IAccount | undefined>();
  const { owner } = useAppContext();
  const isEdit = !!account;
  const editableAccount = account || {
    ownerId: owner.id,
    ownerDisplayName: owner.displayName,
    currency: owner.preferedCurrency,
    balance: undefined,
  }
  const { currencies } = useAppContext();

  useEffect(() => {
    form.setFieldsValue(editableAccount || {});

    return () => form.resetFields();
  }, [editableAccount]);

  const handleSave = () => {
    // Add logic to save the updated account information
    console.log(form.getFieldsValue());
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
        initialValues={editableAccount}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        {isEdit ?
          <>
            <Form.Item label="Owner" rules={[{ required: true, message: 'Please input the owner ID!' }]}>
              <span>{editableAccount.ownerDisplayName}</span>
            </Form.Item>
            <Form.Item label="Currency" rules={[{ required: true, message: 'Please select the currency!' }]}>
              <span>{editableAccount.currency}</span>
            </Form.Item>
            <Form.Item label="Balance">
              <span>{editableAccount.balance} {editableAccount.currency}</span>
            </Form.Item>
          </>
          :
          <>
            <Form.Item name="ownerId" label="Owner" rules={[{ required: true, message: 'Please input the owner ID!' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="currency" label="Currency" rules={[{ required: true, message: 'Please select the currency!' }]}>
              <Select>
                {currencies.map(currency => (
                  <Select.Option key={currency.code} value={currency.code}>{`${currency.name} - ${currency.symbol} - ${currency.code}`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  );
};


export default AccountModal;
