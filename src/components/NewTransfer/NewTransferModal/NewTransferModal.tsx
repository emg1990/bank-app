import { Form, Input, Modal, StepProps, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './NewTransferModal.module.css';
import Step1SelectSource from './TransferSteps/Step1SelectSource';
import Step2SelectDestination from './TransferSteps/Step2SelectDestination';
import Step3SelectAmount from './TransferSteps/Step3SelectAmount';

interface NewTransferModalProps {
  open: boolean;
  onCancel: () => void;
}

const NewTransferModal: React.FC<NewTransferModalProps> = ({ open, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const makeTransfer = (values: any) => {
    // do something
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
        </Form>
      </div>
    </Modal>
  );
};

export default NewTransferModal;