import React, { useState, useEffect } from 'react';
import Header from '../compentents/header/Header';
import Cards from '../compentents/Card/Cards';
import AddExpenseModal from '../Models/AddExpenseModal';
import AddIncomeModal from '../Models/AddIncomeModal';
import Chart from '../compentents/Chart';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebaseConfig'; // Firebase Firestore instance





const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [balance, setBalance] = useState(0); // Track the current balance
  const [chartData, setChartData] = useState([]); // Store chart data
  const [expenses, setExpenses] = useState([]); // Track expenses

  useEffect(() => {
    fetchFinancialData(); // Fetch financial data on component mount
  }, []);

  const fetchFinancialData = async () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const data = []; // To hold chart data
    const expensesList = []; // To hold expenses for display

    // Fetch all income entries from Firestore
    const incomesSnapshot = await getDocs(collection(db, 'incomes'));
    incomesSnapshot.forEach(doc => {
      const incomeData = doc.data();
      totalIncome += parseFloat(incomeData.amount);

      // Populate chart data
      const date = new Date(incomeData.date);
      const month = date.toLocaleString('default', { month: 'short' });
      data.push({ name: month, income: parseFloat(incomeData.amount), expense: 0 });
    });

    // Fetch all expense entries from Firestore
    const expensesSnapshot = await getDocs(collection(db, 'expenses'));
    expensesSnapshot.forEach(doc => {
      const expenseData = doc.data();
      totalExpenses += parseFloat(expenseData.amount);
      expensesList.push({ id: doc.id, ...expenseData }); // Save the id for deletion

      // Populate chart data
      const date = new Date(expenseData.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const existingData = data.find(d => d.name === month);
      if (existingData) {
        existingData.expense += parseFloat(expenseData.amount);
      } else {
        data.push({ name: month, income: 0, expense: parseFloat(expenseData.amount) });
      }
    });

    // Calculate the balance
    setBalance(totalIncome - totalExpenses);
    setChartData(data); // Set the chart data
    setExpenses(expensesList); // Set the expenses
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleAddExpense = async (values) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        expenseName: values.expenseName,
        amount: values.amount,
        date: values.date.toISOString(),
        category: values.category,
      });
      console.log('Expense added:', values);
      fetchFinancialData(); // Update balance after adding expense
    } catch (error) {
      console.error('Error adding expense: ', error);
    }
    setIsExpenseModalVisible(false);
  };

  const handleAddIncome = async (values) => {
    try {
      await addDoc(collection(db, 'incomes'), {
        incomeSource: values.incomeSource,
        amount: values.amount,
        date: values.date.toISOString(),
      });
      console.log('Income added:', values);
      fetchFinancialData(); // Update balance after adding income
    } catch (error) {
      console.error('Error adding income: ', error);
    }
    setIsIncomeModalVisible(false);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
      console.log('Expense deleted:', expenseId);
      fetchFinancialData(); // Update balance after deleting expense
    } catch (error) {
      console.error('Error deleting expense: ', error);
    }
  };

  const resetBalance = async () => {
    try {
      const incomesSnapshot = await getDocs(collection(db, 'incomes'));
      incomesSnapshot.forEach(async docItem => {
        await deleteDoc(doc(db, 'incomes', docItem.id));
      });

      const expensesSnapshot = await getDocs(collection(db, 'expenses'));
      expensesSnapshot.forEach(async docItem => {
        await deleteDoc(doc(db, 'expenses', docItem.id));
      });

      setBalance(0); // Reset balance in UI
      setExpenses([]); // Clear expenses
      console.log('Balance reset successfully');
    } catch (error) {
      console.error('Error resetting balance: ', error);
    }
  };

  return (
    <div>
      <Header />
      <Cards 
        balance={balance} 
        showIncomeModal={showIncomeModal} 
        showExpenseModal={showExpenseModal} 
        resetBalance={resetBalance}
        expenses={expenses} // Pass expenses to Cards component
        onDeleteExpense={handleDeleteExpense} // Pass delete function to Cards
      />

      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={handleAddExpense}
      />

      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={handleAddIncome}
      />

      <div className="mt-8">
        <Chart data={chartData} /> {/* Pass dynamic chart data */}
      </div>
    </div>
  );
};

export default Dashboard;
