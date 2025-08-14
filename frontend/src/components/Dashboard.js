import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTransactions();
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: { 'x-auth-token': token }
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/transactions', 
        { type, amount, category, date }, 
        { headers: { 'x-auth-token': token } }
      );
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, { 
        headers: { 'x-auth-token': token } 
      });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="text-3xl font-bold text-center">Dashboard</h2>
      
      <div className="p-4 my-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Add Transaction</h3>
        <form onSubmit={handleAddTransaction} className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border rounded-md">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md">Add Transaction</button>
        </form>
      </div>

      <div className="p-4 my-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Recent Transactions</h3>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Type</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Category</th>
              <th className="text-left">Date</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.category}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(t.id)} className="px-2 py-1 text-white bg-red-600 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
