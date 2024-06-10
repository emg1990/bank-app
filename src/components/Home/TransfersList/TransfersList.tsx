import React, { useEffect, useState } from 'react';
import { ITransfer } from '../../../util/types';
import { Card, List, message } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import { getTransfers } from '../../../api/transfersApi';
import { useAppContext } from '../../../contexts/AppContext';
import { displayDateTime, getCurrencyByCode } from '../../../util/helpers';
import styles from './TransfersList.module.css';

const { Item } = List;

const TransfersList = () => {
  const [transfers, setTransfers] = useState<ITransfer[]>([]);
  const { transfersLastUpdate, currencies } = useAppContext();

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const fetchedTransfers = await getTransfers();
        setTransfers(fetchedTransfers);
      } catch (error) {
        message.error((error as Error).message);
      }
    };
    fetchTransfers();

  }, [transfersLastUpdate]);

  return (
    <Card title="Transfers" className={styles.container}>
      <List
        itemLayout="horizontal"
        dataSource={transfers}
        renderItem={transfer => (
          <Item>
            <Item.Meta
              avatar={<TransactionOutlined />}
              title={`A transfer of ${transfer.amount}${getCurrencyByCode(transfer.currency, currencies).symbol} was made on ${displayDateTime(transfer.date)}`}
              description={`From ${transfer.fromAccount} to ${transfer.toAccount}`}
            />
          </Item>
        )}
      />
    </Card>
  );
};

export default TransfersList;