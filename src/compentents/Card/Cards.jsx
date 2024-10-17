import React, { useState } from 'react';
import { Card, Row, Col, List } from 'antd';
import Button from '../Button';

const Cards = ({ balance, showIncomeModal, showExpenseModal, resetBalance, expenses, onDeleteExpense }) => {
  // State to manage the visibility of the graph
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="Current Balance" 
            className="shadow-lg p-4 lg:p-6 xl:p-8">
            <p className="text-lg lg:text-xl xl:text-2xl font-semibold mb-4">
              {balance} {/* Display the balance */}
            </p>
            <Button text="Reset Balance" blue={true} onClick={resetBalance} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="Add Income" 
            className="shadow-lg p-4 lg:p-6 xl:p-8">
            <Button text="Add Income" blue={true} onClick={showIncomeModal} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="Add Expense" 
            className="shadow-lg p-4 lg:p-6 xl:p-8">
            <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
          </Card>
        </Col>
      </Row>
      
      {/* Div to display data */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Data Overview</h3>
        <p className="text-md">Your current balance is {balance}.</p>

        {/* Display the list of expenses */}
        <h4 className="text-lg font-semibold mt-4">Expenses</h4>
        <List
          dataSource={expenses}
          renderItem={item => (
            <List.Item
              actions={[
                <Button 
                  text="Delete" 
                  blue={false} 
                  onClick={() => onDeleteExpense(item.id)} 
                />
              ]}
            >
              <List.Item.Meta
                title={`${item.expenseName} - $${item.amount}`}
                description={`Date: ${new Date(item.date).toLocaleDateString()}`}
              />
            </List.Item>
          )}
        />

        {/* Button to toggle graph visibility */}
        <Button 
          text={showGraph ? "Hide Graph" : "Show Graph"} 
          blue={true} 
          onClick={() => setShowGraph(!showGraph)} 
        />
        
        {/* Graph display */}
        {showGraph && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Graph Data</h4>
            <div className="bg-white p-4 rounded shadow">
              {/* Replace this with your graph component */}
              <p>{JSON.stringify(expenses.map(e => e.amount))}</p>
              {/* You can integrate a chart library here (like Chart.js, Recharts, etc.) */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
