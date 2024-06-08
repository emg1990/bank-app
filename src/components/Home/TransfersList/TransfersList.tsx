import React, { useEffect, useState } from 'react';
import { ITransfer } from '../../../types/types';
import { Card, List } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
const { Item } = List;
const TransfersList = () => {
  const [transfers, setTransfers] = useState<ITransfer[]>([]);

  useEffect(() => {

    // Mock transfers
    const mockTransfers: ITransfer[] = [
      {
        transferId: 1,
        fromAccount: 1,
        toAccount: 2,
        amount: 500,
        date: '2022-01-01',
      },
      {
        transferId: 2,
        fromAccount: 2,
        toAccount: 1,
        amount: 300,
        date: '2022-01-02',
      },
    ];
    setTransfers(mockTransfers);

  }, []);
  return (
    <Card title="Last 5 Transfers">
      <List
        itemLayout="horizontal"
        dataSource={transfers}
        renderItem={transfer => (
          <Item>
            <Item.Meta
              avatar={<TransactionOutlined />}
              title={`From Account ${transfer.fromAccount} to Account ${transfer.toAccount}`}
              description={`Amount: ${transfer.amount} Date: ${transfer.date}`}
            />
          </Item>
        )}
      />
    </Card>
  );
};

export default TransfersList;