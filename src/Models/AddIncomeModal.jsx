import React from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';

function AddIncomeModal({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={isIncomeModalVisible}
      title="Add Income"
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Income Source"
          name="incomeSource"
          rules={[{ required: true, message: 'Please enter the income source' }]}
        >
          <Input placeholder="Enter income source" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please enter the amount' }]}
        >
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
