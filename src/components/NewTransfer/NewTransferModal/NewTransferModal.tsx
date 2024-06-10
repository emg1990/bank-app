import { Form, Input, Modal, StepProps, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './NewTransferModal.module.css';
import Step1SelectSource from './TransferSteps/Step1SelectSource';
import Step2SelectDestination from './TransferSteps/Step2SelectDestination';
import Step3SelectAmount from './TransferSteps/Step3SelectAmount';
import Step4Summary from './TransferSteps/Step4Summary';
import { createTransfer } from '../../../api/transfersApi';

interface NewTransferModalProps {
  open: boolean;
  onCancel: () => void;
}

const NewTransferModal: React.FC<NewTransferModalProps> = ({ open, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const makeTransfer = () => {
    // do something
    const fromAccount = form.getFieldValue('fromAccount').id;
    const toAccount = form.getFieldValue('toAccount').id;
    const amount = form.getFieldValue('amount');
    const currency = form.getFieldValue('fromAccount').currency;
    const date = new Date().getTime();
    console.log('Transfer money', { fromAccount, toAccount, amount, date, currency });
    createTransfer({ fromAccount, toAccount, amount, date, currency });
    onCancel();
    // TODO updateTransferList
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
          {currentStep === 3 && <Step4Summary form={form} onBack={onBack} onOk={makeTransfer}/>}
        </Form>
      </div>
    </Modal>
  );
};

export default NewTransferModal;