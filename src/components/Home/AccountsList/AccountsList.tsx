import React, { useEffect, useState } from 'react';
import { Button, Card, List } from 'antd';
import { IAccount } from '../../types';
import AccountModal from './AccountModal/AccountModal';
import AccountRow from './AccountRow/AccountRow';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const mockAccounts: IAccount[] = [
      {
        accountId: 1,
        name: "Account 01",
        ownerId: 1,
        currency: 'USD',
        balance: 1000,
      },
      {
        accountId: 2,
        ownerId: 2,
        currency: 'EUR',
        balance: 2000,
      },
    ];
    setAccounts(mockAccounts);
  }, []);

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedAccount(undefined);
  };

  const onCreateOrEditAccount = (account?: IAccount) => {
    setSelectedAccount(account);
    setOpenModal(true);
  }

  return (
    <Card title="Accounts" extra={<Button shape="round" onClick={() => onCreateOrEditAccount()}>Add</Button>}>
      <List
        itemLayout="horizontal"
        dataSource={accounts}
        renderItem={account => <AccountRow onEdit={() => onCreateOrEditAccount(account)} account={account} />}
      />
      {openModal && <AccountModal open={openModal} onCancel={onCloseModal} account={selectedAccount}/>}
    </Card>
  );
};

export default AccountsList;