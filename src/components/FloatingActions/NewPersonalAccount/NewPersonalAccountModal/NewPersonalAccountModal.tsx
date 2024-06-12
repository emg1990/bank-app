import { Button, Form, Input, Modal, Select, Typography, message } from 'antd';
import React from 'react';
import { useAppContext } from '../../../../contexts/AppContext';
import { IBAN_REGEX, getParsedCurrencyByCode } from '../../../../util/helpers';
import { IAccount } from '../../../../util/types';
import { createAccount } from '../../../../api/accountsApi';

const { Text } = Typography;

interface NewPersonalAccountModalProps {
  open: boolean;
  onCancel: () => void;
}

const NewPersonalAccountModal: React.FC<NewPersonalAccountModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { currencies, owner, setMyAccountsLastUpdate } = useAppContext();

  const onCreateAccount = async () => {
    const account: IAccount = {
      ...form.getFieldsValue() as Pick<IAccount, 'id' | 'name' | 'currency'>,
      ownerId: owner.id,
      ownerDisplayName: owner.displayName,
      balance: 0,
    };
    try {
      await createAccount(account);
      setMyAccountsLastUpdate(new Date().getTime());
      onCancel();
      message.success('Account created successfully');
    } catch (error) {
      message.error((error as Error).message)
    }
  };

  return (
    <Modal
      title="Transfer money"
      onCancel={onCancel}
      open={open}
      footer={null}

    >
      <Form
        name="fund_transfer_form"
        onFinish={onCreateAccount}
        form={form}
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Account Id"
          name="id"
          rules={[
            { required: true, message: 'Please enter account number' },
            { pattern: IBAN_REGEX, message: 'Invalid account IBAN format' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Account Name"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Please select the account's currency" }]}
        >
          <Select>
            {currencies.map(currency => (
              <Select.Option key={currency.code} value={currency.code}>
                {getParsedCurrencyByCode(currency.code, currencies)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Owner"
        >
          <Text type="secondary">{owner.displayName}</Text>
        </Form.Item>
        <Button type="primary" htmlType="submit">Create Account</Button>
      </Form>
    </Modal>
  );
};

export default NewPersonalAccountModal;