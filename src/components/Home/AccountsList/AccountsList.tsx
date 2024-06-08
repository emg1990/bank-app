import React, { useEffect, useState } from 'react';
import { Button, Card, List } from 'antd';
import { IAccount } from '../../../types/types';
import AccountModal from './AccountModal/AccountModal';
import AccountRow from './AccountRow/AccountRow';
import { getAccounts } from '../../../api/accountsApi';
import { useAppContext } from '../../../contexts/AppContext';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const { owner } = useAppContext();
  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      try {
        const fetchedAccounts = await getAccounts(owner.id, owner.savedAccounts);
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };
    fetchLinkedAccounts();
  }, [owner]);

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