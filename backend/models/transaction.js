const db = require('../config/db');

const Transaction = {
  create: (transaction, callback) => {
    const query = 'INSERT INTO transactions (user_id, type, amount, category, date) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [transaction.user_id, transaction.type, transaction.amount, transaction.category, transaction.date], callback);
  },
  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC';
    db.query(query, [userId], callback);
  },
  update: (id, transaction, callback) => {
    const query = 'UPDATE transactions SET type = ?, amount = ?, category = ?, date = ? WHERE id = ?';
    db.query(query, [transaction.type, transaction.amount, transaction.category, transaction.date, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Transaction;
