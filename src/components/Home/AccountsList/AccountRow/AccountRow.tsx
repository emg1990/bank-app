import React from 'react';
import { IAccount } from '../../../../types/types';
import { Button, List, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import styles from './AccountRow.module.css';

const { Item } = List;

interface AccountRowProps {
  account: IAccount;
  onEdit: (account: IAccount) => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ account, onEdit }) => {
  const onDelete = () => {
    // Delete account
  };
  return (
    <Item>
      <Item.Meta
        avatar={<UserOutlined />}
        title={<div className={styles.titleContainer}>
          <span>Account: {account.name || account.id}</span>
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