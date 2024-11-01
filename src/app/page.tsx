'use client'

import { useState, useEffect } from 'react';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: Date;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState<{ category: string; amount: string; date: string }>({
    category: '',
    amount: '',
    date: '',
  });

  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        amount: parseInt(form.amount) * 100,
      }),
    });
    setForm({ category: '', amount: '', date: '' });
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  return (
    <div>
      <h1>Despesas</h1>

      {/* Add Expenses */}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Valor"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} - R$ {(expense.amount / 100).toFixed(2)} -{' '}
            {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
