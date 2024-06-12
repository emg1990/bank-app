import { Card, Typography, FormInstance, Space } from 'antd';
import React from 'react';
import StepsFooter from './shared/StepsFooter';

const { Text } = Typography;

interface Step4SummaryProps {
  form: FormInstance;
  onBack(): void;
  onOk(): void;
}

const Step4Summary: React.FC<Step4SummaryProps> = ({ form, onOk, onBack }) => {
  const fromText = `${form.getFieldValue('fromAccount').name || form.getFieldValue('fromAccount').id} (${form.getFieldValue('fromAccount').currency})`;
  const toText = `${form.getFieldValue('toAccount').name || form.getFieldValue('toAccount').id} (${form.getFieldValue('toAccount').currency})`;
  const amountText = `${form.getFieldValue('amount')}${form.getFieldValue('fromAccount').currency}`;

  return (
    <>
      <Card title="Transfer Summary">
        <Space direction="vertical">
          <Text strong>From Account:</Text>
          <Text type="secondary">{fromText}</Text>
          <Text strong>To Account:</Text>
          <Text type="secondary">{toText}</Text>
          <Text strong>Amount:</Text>
          <Text type="secondary">{amountText}</Text>
        </Space>
      </Card>
      <StepsFooter
        okText="Transfer"
        cancelText="Back"
        disabled={false}
        onCancel={onBack}
        onNext={onOk}
      />
    </>
  );
};

export default Step4Summary;