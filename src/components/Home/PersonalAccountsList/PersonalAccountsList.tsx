import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'antd';
import { IAccount } from '../../types';
import PersonalAccount from './PersonalAccount/PersonalAccount';
import useDimensions from '../../../hooks/useDimensions';
import styles from './PersonalAccountsList.module.css'

const PersonalAccounts = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const { width } = useDimensions();
  useEffect(() => {
    const mockAccounts: IAccount[] = [
      {
        accountId: 1,
        ownerId: 1,
        name: 'Account 1',
        balance: 1000,
        currency: 'USD'
      },
      {
        accountId: 2,
        ownerId: 1,
        name: 'Account 2',
        balance: 2000,
        currency: 'EUR'
      },
      {
        accountId: 3,
        ownerId: 1,
        name: 'Account 3',
        balance: 3000,
        currency: 'USD'
      }
    ];

    setAccounts(mockAccounts);
  }, [])
  const totalBalance = useMemo(() => {
    const balanceByCurrency: Record<string, number> = {};
    accounts.forEach(account => {
      if (balanceByCurrency[account.currency]) {
        balanceByCurrency[account.currency] += account.balance;
      } else {
        balanceByCurrency[account.currency] = account.balance;
      }
    });
    return balanceByCurrency;
  }, [accounts]);
  /**
   * The number of cards to show based on the width of the container.
   * It is calculated by dividing the width by the sum of the card width, gap and padding.
   * Defaulting to 1 to avoid Carousel deviding by 0
   */
  const cardsToShow = Math.min(Math.floor(width / (300 + 30 + 50)), accounts.length) || 1;
  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        {Object.keys(totalBalance).map(currency => (
          <span key={currency}>{totalBalance[currency]} <strong>{currency}</strong></span>
        ))}
      </div>
      <Carousel autoplay={accounts.length > cardsToShow} slidesToShow={cardsToShow}>
        {accounts.map(account => (
          <PersonalAccount account={account} key={account.accountId}/>
        ))}
      </Carousel>
    </div>
  );
};

export default PersonalAccounts;