import React from 'react';
import { Button, List, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { IAccount } from '../../../../util/types';
import { removeAccountFromList } from '../../../../api/accountsApi';
import { useAppContext } from '../../../../contexts/AppContext';
import styles from './AccountRow.module.css';

const { Item } = List;

interface AccountRowProps {
  account: IAccount;
  onEdit: (account: IAccount) => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ account, onEdit }) => {
  const { owner, updateOwnerSavedAccounts } = useAppContext();

  const onDelete = () => {
    removeAccountFromList(account);
    updateOwnerSavedAccounts(owner.savedAccounts.filter(id => id !== account.id));
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