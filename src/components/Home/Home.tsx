import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import AccountsList from './AccountsList/AccountsList';
import TransfersList from './TransfersList/TransfersList';

const { Title } = Typography;


const Home: React.FC = () => {

  return (
    <>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <Card title="Accounts" >
            <AccountsList />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Last 5 Transfers">
            <TransfersList />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
