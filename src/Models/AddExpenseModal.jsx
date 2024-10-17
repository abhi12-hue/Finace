import React from 'react';
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';

function AddExpenseModal({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={isExpenseModalVisible}
      title="Add Expense"
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Expense Name"
          name="expenseName"
          rules={[{ required: true, message: 'Please enter the expense name' }]}
        >
          <Input placeholder="Enter expense name" />
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

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="transportation">Transportation</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            {/* Add more categories as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
