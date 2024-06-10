import { Form, Modal, StepProps, Steps, message } from 'antd';
import React, { useState } from 'react';
import styles from './NewTransferModal.module.css';
import Step1SelectSource from './TransferSteps/Step1SelectSource';
import Step2SelectDestination from './TransferSteps/Step2SelectDestination';
import Step3SelectAmount from './TransferSteps/Step3SelectAmount';
import Step4Summary from './TransferSteps/Step4Summary';
import { createTransfer } from '../../../api/transfersApi';
import { useAppContext } from '../../../contexts/AppContext';

interface NewTransferModalProps {
  open: boolean;
  onCancel: () => void;
}

const NewTransferModal: React.FC<NewTransferModalProps> = ({ open, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { setMyAccountsLastUpdate, setTransfersLastUpdate } = useAppContext();

  const makeTransfer = async () => {
    const fromAccount = form.getFieldValue('fromAccount').id;
    const toAccount = form.getFieldValue('toAccount').id;
    const amount = form.getFieldValue('amount');
    const currency = form.getFieldValue('fromAccount').currency;
    const date = new Date().getTime();
    try {
      await createTransfer({ fromAccount, toAccount, amount, date, currency });
      // Update the last update timestamp to trigger a refetch of the accounts
      setMyAccountsLastUpdate(date);
      // Update the last update timestamp to trigger a refetch of the transfers
      setTransfersLastUpdate(date);
      message.success('Transfer was successful');
      onCancel();
    } catch (error) {
      message.error((error as Error).message);
    }
  }

  const onNext = () => {
    setCurrentStep((prev) => prev + 1);
  }

  const onBack = () => {
    setCurrentStep((prev) => prev - 1);
  }

  const items: StepProps[] = [
    {
      title: 'From',
    },
    {
      title: 'To',
    },
    {
      title: 'Amount',
    },
    {
      title: 'Review',
    }
  ];

  return (
    <Modal
      title="Transfer money"
      onCancel={onCancel}
      open={open}
      footer={null}

    >
      <div className={styles.stepsContainer}>
        <Steps current={currentStep} items={items} />
        <Form
          name="fund_transfer_form"
          onFinish={makeTransfer}
          form={form}
          layout="horizontal"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 22 }}
        >
          {currentStep === 0 && <Step1SelectSource form={form} onCancel={onCancel} onNext={onNext} />}
          {currentStep === 1 && <Step2SelectDestination form={form} onBack={onBack} onNext={onNext} />}
          {currentStep === 2 && <Step3SelectAmount form={form} onBack={onBack} onOk={onNext} />}
          {currentStep === 3 && <Step4Summary form={form} onBack={onBack} onOk={makeTransfer} />}
        </Form>
      </div>
    </Modal>
  );
};

export default NewTransferModal;