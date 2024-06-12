import React, { useEffect, useState } from 'react';
import { Button, Card, List, Tooltip, message } from 'antd';
import { IAccount } from '../../../util/types';
import AccountRow from './AccountRow/AccountRow';
import { getAccounts, getMyAccounts } from '../../../api/accountsApi';
import { useAppContext } from '../../../contexts/AppContext';
import AddAccountModal from './AccountModal/AccountModal';
import Search from '../../Search/Search';
import styles from './AccountsList.module.css';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [displayedAccounts, setDisplayedAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const { owner, myAccountsLastUpdate } = useAppContext();

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      try {
        const fetchedAccounts = await Promise.all([getMyAccounts(), getAccounts(owner.savedAccounts)]);
        setAccounts(fetchedAccounts.flat());
        setDisplayedAccounts(fetchedAccounts.flat());
      } catch (error) {
        message.error((error as Error).message);
      }
    };
    fetchLinkedAccounts();
  }, [owner, myAccountsLastUpdate]);

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

  const onSearch = (value: string) => {
    const filteredAccounts = accounts.filter(account => {
      return (account.name || '').toLowerCase().includes(value.toLowerCase())
        || account.currency.toLowerCase().includes(value.toLowerCase())
        || account.id.toLowerCase().includes(value.toLowerCase())
        || account.ownerId == parseInt(value)
        || account.ownerDisplayName.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayedAccounts(filteredAccounts);
  };

  return (
    <Card
      title="Linked Accounts"
      extra={<>
        <Search onSearch={onSearch} />
        {' '}
        <Tooltip title="Add an account to your list using an existing account id.">
          <Button shape="round" onClick={onAddAccount}>Add</Button>
        </Tooltip>
      </>}
      className={styles.container}
    >
      <List
        itemLayout="horizontal"
        dataSource={displayedAccounts}
        renderItem={account => <AccountRow onEdit={() => onEditAccount(account)} account={account} />}
      />
      {openModal && <AddAccountModal open={openModal} onCancel={onCloseModal} account={selectedAccount} />}
    </Card>
  );
};

export default AccountsList;