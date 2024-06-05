import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { IAccount } from '../../types';

const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  useEffect(() => {
    const mockAccounts: IAccount[] = [
      {
        accountId: 1,
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

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={accounts}
        renderItem={account => (
          <List.Item>
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={`Account ID: ${account.accountId}`}
              description={`Owner ID: ${account.ownerId} Currency: ${account.currency} Balance: ${account.balance}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default AccountsList;