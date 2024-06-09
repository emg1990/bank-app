import React, { useEffect, useState } from 'react';
import { Button, Card, List } from 'antd';
import { IAccount } from '../../../util/types';
import AccountRow from './AccountRow/AccountRow';
import { getAccounts } from '../../../api/accountsApi';
import { useAppContext } from '../../../contexts/AppContext';
import AddAccountModal from './AccountModal/AccountModal';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const { owner } = useAppContext();

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      try {
        // TODO store list of accounts in appContext
        const fetchedAccounts = await getAccounts(owner.savedAccounts);
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };
    fetchLinkedAccounts();
  }, [owner]);

  const onAddAccount = () => {
    setOpenModal(true);
  };

  const onEditAccount = (account: IAccount) => {
    setSelectedAccount(account);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedAccount(undefined);
  };

  return (
    <Card title="Accounts" extra={<Button shape="round" onClick={onAddAccount}>Add</Button>}>
      <List
        itemLayout="horizontal"
        dataSource={accounts}
        renderItem={account => <AccountRow onEdit={() => onEditAccount(account)} account={account} />}
      />
      {openModal && <AddAccountModal open={openModal} onCancel={onCloseModal} account={selectedAccount} />}
    </Card>
  );
};

export default AccountsList;