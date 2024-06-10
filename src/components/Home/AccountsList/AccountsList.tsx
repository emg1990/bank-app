import React, { useEffect, useState } from 'react';
import { Button, Card, List, message } from 'antd';
import { IAccount } from '../../../util/types';
import AccountRow from './AccountRow/AccountRow';
import { getAccounts, getMyAccounts } from '../../../api/accountsApi';
import { useAppContext } from '../../../contexts/AppContext';
import AddAccountModal from './AccountModal/AccountModal';
import styles from './AccountsList.module.css';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const { owner } = useAppContext();

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      try {
        const fetchedAccounts = await Promise.all([getMyAccounts(), getAccounts(owner.savedAccounts)]);
        setAccounts(fetchedAccounts.flat());
      } catch (error) {
        console.warn("Error fetching accounts");
        message.error((error as Error).message);
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
    <Card
      title="Accounts"
      extra={<Button shape="round" onClick={onAddAccount}>Add</Button>}
      className={styles.container}
    >
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