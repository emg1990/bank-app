import React, { useState } from 'react';
import { Card, Form, FormInstance, InputNumber, Space, Typography } from 'antd';
import StepsFooter from './shared/StepsFooter';
import { getCurrencyByCode, getCurrencyConvertedAmount, roundDecimal } from '../../../../util/helpers';
import { useAppContext } from '../../../../contexts/AppContext';
import { ALLOWED_DECIMALS } from '../../../../config';

const { Text } = Typography;

interface Step3SelectAmountProps {
  form: FormInstance;
  onOk(): void;
  onBack(): void;
}

const Step3SelectAmount: React.FC<Step3SelectAmountProps> = ({ form, onOk, onBack }) => {
  const balance = form.getFieldValue('fromAccount').balance;
  console.log(balance, form.getFieldValue('amount'), form.getFieldValue('fromAccount'));
  const initialAmount = form.getFieldValue('amount') || 0;
  const [amount, setAmount] = useState<number>(initialAmount);
  const [disabled, setDisabled] = useState<boolean>(!initialAmount);
  const [currentBalance, setCurrentBalance] = useState<number>(balance - Number.parseFloat(initialAmount));
  const { currencies } = useAppContext();
  const fromCurrency = getCurrencyByCode(form.getFieldValue('fromAccount').currency, currencies);
  const toCurrency = getCurrencyByCode(form.getFieldValue('toAccount').currency, currencies);

  const onValuesChange: ((value: number | null) => void) = async (value) => {
    try {
      await form.validateFields();
      setAmount(value || 0);
      setCurrentBalance(balance - (value || 0));
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
        { required: true, message: 'Please enter the transfer amount.' }, // This rule ensures that the amount is not empty
        () => ({
          validator(_, value) {
            if (value && value <= 0) { // This rule ensures that the amount is greater than 0
              return Promise.reject(new Error('The amount must be greater than 0.'));
            }
            const tolerance = 0.0001; // Define a tolerance value to avoid floating point errors
            if (value && value > tolerance + balance) { // This rule ensures that the amount is less than the balance
              return Promise.reject(new Error('The amount exceeds the current balance!'));
            }
            return Promise.resolve();
          },
        }),
      ]}>
        <InputNumber
          size="large"
          prefix={fromCurrency.symbol}
          type="number"
          precision={ALLOWED_DECIMALS}
          onChange={onValuesChange}
        />
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