import React, { useState } from 'react';
import { Form, FormInstance, Input } from 'antd';
import StepsFooter from './shared/StepsFooter';
import { getCurrencyByCode, getCurrencyConvertedAmount } from '../../../../util/helpers';
import { useAppContext } from '../../../../contexts/AppContext';

interface Step3SelectAmountProps {
  form: FormInstance;
  onOk(): void;
  onBack(): void;
}

const Step3SelectAmount: React.FC<Step3SelectAmountProps> = ({ form, onOk, onBack }) => {
  const balance = form.getFieldValue('fromAccount').balance;
  const [amount, setAmount] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);
  const [currentBalance, setCurrentBalance] = useState<number>(balance);
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
    <>
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
      <Input type="number" onChange={onValuesChange}/>
    </Form.Item>
      <span>The destination account will receive {destinationAmount}{toCurrency.symbol}</span>
    <Form.Item label="New Balance">
      <span>{currentBalance}{fromCurrency.symbol}</span>
    </Form.Item>
    <StepsFooter
      okText="Next"
      cancelText="Back"
      onNext={onOk}
      onCancel={onBack}
      disabled={disabled}
    />
    </>
  );
};

export default Step3SelectAmount;