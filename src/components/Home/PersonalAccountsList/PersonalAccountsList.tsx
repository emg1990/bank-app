import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'antd';
import { IAccount } from '../../../util/types';
import PersonalAccount from './PersonalAccount/PersonalAccount';
import useDimensions from '../../../hooks/useDimensions';
import styles from './PersonalAccountsList.module.css'
import { getMyAccounts } from '../../../api/accountsApi';

const PersonalAccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const { width } = useDimensions();

  useEffect(() => {
    const fetchMyAccounts = async () => {
      try {
        const fetchedAccounts = await getMyAccounts();
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };
    fetchMyAccounts();
  }, []);

  const totalBalance = useMemo(() => {
    const balanceByCurrency: Record<string, number> = {};
    accounts.forEach(account => {
      if (balanceByCurrency[account.currency]) {
        balanceByCurrency[account.currency] += (account.balance || 0);
      } else {
        balanceByCurrency[account.currency] = (account.balance || 0);
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
      <Carousel
        arrows
        autoplay={accounts.length > cardsToShow}
        slidesToShow={cardsToShow}
      >
        {accounts.map(account => (
          <PersonalAccount account={account} key={account.id}/>
        ))}
      </Carousel>
    </div>
  );
};

export default PersonalAccountsList;