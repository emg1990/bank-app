import React, { useEffect, useState } from 'react';
import { Card, Row, Col, List, Avatar, Typography } from 'antd';
import { UserOutlined, TransactionOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Account {
  id: number;
  ownerId: number;
  currency: string;
  balance: number;
}

interface Transfer {
  id: number;
  fromAccount: number;
  toAccount: number;
  amount: number;
  date: string;
}

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    // Mock accounts
    const mockAccounts: Account[] = [
      {
        id: 1,
        ownerId: 1,
        currency: 'USD',
        balance: 1000,
      },
      {
        id: 2,
        ownerId: 2,
        currency: 'EUR',
        balance: 2000,
      },
    ];
    setAccounts(mockAccounts);

    // Mock transfers
    const mockTransfers: Transfer[] = [
      {
        id: 1,
        fromAccount: 1,
        toAccount: 2,
        amount: 500,
        date: '2022-01-01',
      },
      {
        id: 2,
        fromAccount: 2,
        toAccount: 1,
        amount: 300,
        date: '2022-01-02',
      },
    ];
    setTransfers(mockTransfers);

  }, []);

  return (
    <>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <Card title="Accounts" >
            <List
              itemLayout="horizontal"
              dataSource={accounts}
              renderItem={account => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={`Account ID: ${account.id}`}
                    description={`Owner ID: ${account.ownerId} Currency: ${account.currency} Balance: ${account.balance}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Last 5 Transfers">
            <List
              itemLayout="horizontal"
              dataSource={transfers}
              renderItem={transfer => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<TransactionOutlined />}
                    title={`From Account ${transfer.fromAccount} to Account ${transfer.toAccount}`}
                    description={`Amount: ${transfer.amount} Date: ${transfer.date}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
