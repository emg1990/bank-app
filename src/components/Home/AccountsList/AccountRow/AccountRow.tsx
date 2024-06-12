import React from 'react';
import { Button, List, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { IAccount } from '../../../../util/types';
import { deleteAccount, removeAccountFromList } from '../../../../api/accountsApi';
import { useAppContext } from '../../../../contexts/AppContext';
import styles from './AccountRow.module.css';

const { Item } = List;

interface AccountRowProps {
  account: IAccount;
  onEdit: (account: IAccount) => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ account, onEdit }) => {
  const { owner, updateOwnerSavedAccounts, setMyAccountsLastUpdate } = useAppContext();

  const onDelete = () => {
    try {
      if (account.ownerId == owner.id) {
        if (account.balance === 0) {
          deleteAccount(account);
          setMyAccountsLastUpdate(new Date().getTime());
        } else {
          message.warning("You can't delete your account if it has a balance. Please transfer the money first.");
          return;
        }
      } else {
        removeAccountFromList(account);
        updateOwnerSavedAccounts(owner.savedAccounts.filter(id => id !== account.id));
      }
      message.success('Account deleted successfully');
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  return (
    <Item>
      <Item.Meta
        avatar={<UserOutlined />}
        title={<div className={styles.titleContainer}>
          <span className={styles.title}>Account: {account.name || account.id}</span>
          <div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(account)}
            />
            <Popconfirm
              title="Delete the account"
              description={`Are you sure to delete account ${account.name || account.id}?`}
              okText="Yes"
              cancelText="No"
              onConfirm={onDelete}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        </div>}
        description={`IBAN: ${account.id} Currency: ${account.currency}`}
      />
    </Item>
  );
};

export default AccountRow;