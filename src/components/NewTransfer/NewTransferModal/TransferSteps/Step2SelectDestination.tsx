import { FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../../../../api/accountsApi';
import { IAccount } from '../../../../util/types';
import SeelectAccount from './shared/SelectAccount';
import { useAppContext } from '../../../../contexts/AppContext';

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
        const fetchedAccounts = await getAccounts(owner.savedAccounts);
        setAccounts(fetchedAccounts);
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