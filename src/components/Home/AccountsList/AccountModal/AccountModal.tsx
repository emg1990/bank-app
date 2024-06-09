import React, { useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { IAccount } from '../../../../util/types';
import { useAppContext } from '../../../../contexts/AppContext';
import { getParsedCurrencyByCode } from '../../../../util/helpers';
import { getAccountById, createAccount, updateAccount } from '../../../../api/accountsApi';

interface AccountModalProps {
  open: boolean;
  account?: IAccount;
  onCancel: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onCancel, account }) => {
  const [form] = Form.useForm<IAccount | undefined>();
  const [validatedAccount, setValidatedAccount] = useState<IAccount | undefined>(account);
  const [accountId, setAccountId] = useState<string | undefined>(account?.id);
  const [loading, setLoading] = useState(false);
  const { currencies, owner, updateOwnerSavedAccounts } = useAppContext();

  const handleValidate = async () => {
    // Add logic to validate the account information
    try {
      setLoading(true);
      const account = await getAccountById(form.getFieldValue("id"));
      setValidatedAccount(account);
    } catch (error) {
      setValidatedAccount(undefined);
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onAccountChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAccountId(e.target.value);
    if (validatedAccount) {
      setValidatedAccount(undefined);
    }
  };

  const handleSave = async () => {
    // Add logic to save the updated account information
    const updatedAccount = {
      ...validatedAccount,
      name: form.getFieldValue("name"),
    } as IAccount;
    try {
      setLoading(true);
      if (account) {
        await updateAccount(updatedAccount);
        updateOwnerSavedAccounts(owner.savedAccounts);
      } else {
        await createAccount(updatedAccount);
        const uniqueAccounts = [...new Set([...owner.savedAccounts, updatedAccount.id])];
        updateOwnerSavedAccounts(uniqueAccounts);
      }
      onCancel();
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Create an account"}
      onCancel={onCancel}
      open={open}
      onOk={validatedAccount ? handleSave : handleValidate}
      okText={validatedAccount ? "Create" : "Validate"}
      okButtonProps={{ disabled: !accountId }}
      confirmLoading={loading}
    >
      <Form
        name="account_form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={account}
      >
        {!account ?
          <Form.Item name="id" label="Account" rules={[{ required: true, message: 'Please input the account ID.' }]}>
            <Input onChange={onAccountChange} />
          </Form.Item> :
          <Form.Item label="Account">
            <span>{account.id}</span>
          </Form.Item>
        }
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        {validatedAccount && <>
          <Form.Item label="Owner">
            <span>{validatedAccount.ownerDisplayName}</span>
          </Form.Item>
          <Form.Item label="Currency">
            <span>{getParsedCurrencyByCode(validatedAccount.currency, currencies)}</span>
          </Form.Item>
        </>}
      </Form>
    </Modal>
  );
};


export default AccountModal;
