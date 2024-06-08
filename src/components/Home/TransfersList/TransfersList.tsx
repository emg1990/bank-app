import React, { useEffect, useState } from 'react';
import { ITransfer } from '../../../types/types';
import { Card, List } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import { getLastNTransfers } from '../../../api/transfersApi';
const { Item } = List;
const TransfersList = () => {
  const [transfers, setTransfers] = useState<ITransfer[]>([]);

  useEffect(() => {

    // Mock transfers
    const fetchTransfers = async () => {
      try {
        const fetchedTransfers = await getLastNTransfers();
        setTransfers(fetchedTransfers);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };
    fetchTransfers();

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