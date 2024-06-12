import { FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccounts, getMyAccounts } from '../../../../../api/accountsApi';
import { IAccount } from '../../../../../util/types';
import SeelectAccount from './shared/SelectAccount';
import { useAppContext } from '../../../../../contexts/AppContext';

interface Step2SelectDestinationProps {
  form: FormInstance;
  onNext(): void;
  onBack(): void;
}
const Step2SelectDestination: React.FC<Step2SelectDestinationProps> = ({ form, onNext, onBack }) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const { owner } = useAppContext();

  useEffect(() => {
    const fecthAccounts = async () => {
      try {
        const fetchedAccounts = await Promise.all([getAccounts(owner.savedAccounts), getMyAccounts()]);
        // Do not allow to transfer to the same account
        setAccounts(fetchedAccounts.flat().filter(account => account.id !== form.getFieldValue('fromAccount').id));
      } catch (error) {
        message.error((error as Error).message);
      }
    };
    fecthAccounts();
  }, []);

  const next = (toAccount: IAccount) => {
    form.setFieldsValue({ toAccount });
    onNext();
  }

  return (
    <SeelectAccount
      accounts={accounts}
      defaultSelected={form.getFieldValue('toAccount')}
      okText="Next"
      cancelText="Back"
      onOk={next}
      onCancel={onBack}
    />
  );
};

export default Step2SelectDestination;