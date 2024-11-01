'use client'

import AddExpense from "../components/AddExpense/AddExpense";
import { Expense } from "@/types/expense";
import { useState, useEffect } from "react";

export default function Home() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  const handleAddExpense = async (newExpense: Expense) => {
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    });
    fetchExpenses();
  };

  return (
    <>
      <h1>Despesas</h1>

      <button onClick={() => setShowAddExpense(true)}>Adicionar Despesa</button>

      {/* Component to add expenses */}
      {showAddExpense && (
        <AddExpense
          onAddExpense={handleAddExpense}
          onClose={() => setShowAddExpense(false)}
        />
      )}

      <div>
        <h2>Lista de Despesas</h2>
        {expenses.map(expense => (
          <div key={expense.id}>
            <p>{expense.category} - R$ {(expense.amount / 100).toFixed(2)} - {expense.date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
