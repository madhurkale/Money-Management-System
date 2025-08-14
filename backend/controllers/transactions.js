const Transaction = require('../models/transaction');

exports.getTransactions = (req, res) => {
  Transaction.findByUserId(req.user.id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching transactions' });
    }
    res.json(results);
  });
};

exports.addTransaction = (req, res) => {
  const { type, amount, category, date } = req.body;
  const newTransaction = {
    user_id: req.user.id,
    type,
    amount,
    category,
    date
  };

  Transaction.create(newTransaction, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding transaction' });
    }
    res.status(201).json({ message: 'Transaction added successfully', id: result.insertId });
  });
};

exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { type, amount, category, date } = req.body;
  const updatedTransaction = { type, amount, category, date };

  Transaction.update(id, updatedTransaction, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating transaction' });
    }
    res.json({ message: 'Transaction updated successfully' });
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  Transaction.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting transaction' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
};
