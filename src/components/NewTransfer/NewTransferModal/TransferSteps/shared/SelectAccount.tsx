import { Card, Collapse, CollapseProps } from 'antd';
import React, { useState } from 'react';
import { IAccount } from '../../../../../util/types';
import StepsFooter from './StepsFooter';
import { roundDecimal } from '../../../../../util/helpers';

interface SeelectAccountProps {
  accounts?: IAccount[];
  defaultSelected?: IAccount;
  okText: string;
  cancelText: string;
  withBalance?: boolean;
  onOk(account: IAccount): void;
  onCancel(): void;
}
const SeelectAccount: React.FC<SeelectAccountProps> = ({
  accounts,
  okText,
  cancelText,
  withBalance,
  defaultSelected,
  onOk,
  onCancel
}) => {
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>(defaultSelected);

  if (!accounts) {
    return null;
  }

  const onSelect = (accountId: string | string[]) => {
    const selectedAccountId = Array.isArray(accountId) ? accountId[0] : accountId;
    setSelectedAccount(accounts.find(account => account.id === selectedAccountId));
  }

  const onNext = () => {
    if (selectedAccount) {
      onOk(selectedAccount);
    }
  }

  const items: CollapseProps['items'] = accounts.map(account => {
    const roundedBalance = roundDecimal(account.balance || 0);
    
    return (
    {
      key: account.id,
      label: `${account.name || account.id} - ${withBalance ? `${roundedBalance} ${account.currency}` : `${account.currency}`}` ,
      children: <>
        <Card>
          {!!account.name && <p>Name: {account.name}</p>}
          <p>IBAN: {account.id}</p>
          <p>Currency: {account.currency}</p>
          {withBalance && <p>Balance: {roundedBalance}</p>}
        </Card>
      </>,
    }
  )});

  console.log('defaultSelected', defaultSelected);

  return (
    <div>
      <Collapse items={items} defaultActiveKey={defaultSelected?.id} accordion onChange={onSelect}/>
      <StepsFooter
        okText={okText}
        cancelText={cancelText}
        disabled={!selectedAccount}
        onNext={onNext}
        onCancel={onCancel}
      />
    </div>
  );
};

export default SeelectAccount;