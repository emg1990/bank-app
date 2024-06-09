import React from 'react';
import styles from './StepsFooter.module.css';
import { Button } from 'antd';

interface StepsFooterProps {
  okText: string;
  cancelText: string;
  onNext(): void;
  onCancel(): void;
  disabled: boolean;
}
const StepsFooter: React.FC<StepsFooterProps> = ({ okText, cancelText, disabled, onNext, onCancel }) => {
  return (
    <div className={styles.footer}>
      <Button type="default" onClick={onCancel} >
        {cancelText}
      </Button>
      <Button type="primary" onClick={onNext} disabled={disabled} >
        {okText}
      </Button>
    </div>
  );
};

export default StepsFooter;