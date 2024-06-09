import { FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getMyAccounts } from '../../../../api/accountsApi';
import { IAccount } from '../../../../util/types';
import SeelectAccount from './shared/SelectAccount';

interface Step1SelectSourceProps {
  form: FormInstance;
  onNext(): void;
  onCancel(): void;
}
const Step1SelectSource: React.FC<Step1SelectSourceProps> = ({ form, onNext, onCancel }) => {
  const [myAccounts, setMyAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const fecthMyAccounts = async () => {
      try {
        const fetchedAccounts = await getMyAccounts();
        setMyAccounts(fetchedAccounts);
      } catch (error) {
        message.error((error as Error).message);
      }
    };
    fecthMyAccounts();
  }, []);

  const next = (fromAccount: IAccount) => {
    form.setFieldsValue({ fromAccount });
    onNext();
  }

  return (
    <SeelectAccount
      accounts={myAccounts}
      defaultSelected={form.getFieldValue('fromAccount')}
      okText="Next"
      cancelText="Cancel"
      onOk={next}
      onCancel={onCancel}
      withBalance
    />
  );
};

export default Step1SelectSource;