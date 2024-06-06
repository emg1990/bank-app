import React from 'react';
import { Row, Col, Typography } from 'antd';
import AccountsList from './AccountsList/AccountsList';
import TransfersList from './TransfersList/TransfersList';
import PersonalAccountsList from './PersonalAccountsList/PersonalAccountsList';
import styles from './Home.module.css'

const { Title } = Typography;


const Home: React.FC = () => {

  return (
    <>
      <Title level={2}>Dashboard</Title>
      <div className={styles.personalAccountsContainer}>
        <PersonalAccountsList />
      </div>
      <Row gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <AccountsList />
        </Col>
        <Col xs={24} md={12}>
          <TransfersList />
        </Col>
      </Row>
    </>
  );
};

export default Home;
