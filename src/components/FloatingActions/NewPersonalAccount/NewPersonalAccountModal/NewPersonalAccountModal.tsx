import { Form, Input, Modal, Select, Typography } from 'antd';
import React from 'react';
import { useAppContext } from '../../../../contexts/AppContext';
import { IBAN_REGEX, getParsedCurrencyByCode } from '../../../../util/helpers';

const { Text } = Typography;

interface NewPersonalAccountModalProps {
  open: boolean;
  onCancel: () => void;
}

const NewPersonalAccountModal: React.FC<NewPersonalAccountModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { currencies, owner } = useAppContext();

  const createAccount = async () => {
    // create personal account
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
        onFinish={createAccount}
        form={form}
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Account Id"
          name="accountId"
          rules={[
            { required: true, message: 'Please enter account number' },
            { pattern: IBAN_REGEX, message: 'Invalid account number format' }
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
      </Form>
    </Modal>
  );
};

export default NewPersonalAccountModal;