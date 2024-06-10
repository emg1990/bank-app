import React, { useState } from 'react';
import { Card, Form, FormInstance, Input, Space, Typography } from 'antd';
import StepsFooter from './shared/StepsFooter';
import { getCurrencyByCode, getCurrencyConvertedAmount, roundDecimal } from '../../../../util/helpers';
import { useAppContext } from '../../../../contexts/AppContext';

const { Text } = Typography;

interface Step3SelectAmountProps {
  form: FormInstance;
  onOk(): void;
  onBack(): void;
}

const Step3SelectAmount: React.FC<Step3SelectAmountProps> = ({ form, onOk, onBack }) => {
  const balance = form.getFieldValue('fromAccount').balance;
  const initialAmount = form.getFieldValue('amount') || 0;
  const [amount, setAmount] = useState<number>(initialAmount);
  const [disabled, setDisabled] = useState<boolean>(!initialAmount);
  const [currentBalance, setCurrentBalance] = useState<number>(balance - Number.parseFloat(initialAmount));
  const { currencies } = useAppContext();
  const fromCurrency = getCurrencyByCode(form.getFieldValue('fromAccount').currency, currencies);
  const toCurrency = getCurrencyByCode(form.getFieldValue('toAccount').currency, currencies);

  const onValuesChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      await form.validateFields();
      setAmount(Number.parseFloat(e.target.value));
      setCurrentBalance(balance - Number.parseFloat(e.target.value));
      setDisabled(false);
    } catch {
      setCurrentBalance(balance);
      setDisabled(true);
    }
  }

  const destinationAmount = getCurrencyConvertedAmount(amount, fromCurrency, toCurrency);

  return (
    <Card title="Amount">
      <Form.Item name="amount" label="Amount" rules={[
        { required: true, message: 'Please enter the transfer amount.' },
        () => ({
          validator(_, value) {
            if (value && value <= 0) {
              return Promise.reject(new Error('The amount must be greater than 0.'));
            }
            if (value && value > balance) {
              return Promise.reject(new Error('The amount exceeds the current balance!'));
            }
            return Promise.resolve();
          },
        }),
      ]}>
        <Input size="large" prefix={fromCurrency.symbol} type="number" onChange={onValuesChange} />
      </Form.Item>
      <Space direction="vertical">
        <Text strong>Balance: <Text type='warning'>{roundDecimal(currentBalance)}{fromCurrency.symbol}</Text></Text>
        <Text type="secondary">The destination account will receive {roundDecimal(destinationAmount)}{toCurrency.symbol}</Text>
      </Space>
      <StepsFooter
        okText="Next"
        cancelText="Back"
        onNext={onOk}
        onCancel={onBack}
        disabled={disabled}
      />
    </Card>
  );
};

export default Step3SelectAmount;