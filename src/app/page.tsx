'use client'

import AddExpense from "../components/AddExpense/AddExpense";
import { Expense } from "@/types/expense";
import { useState, useEffect } from "react";
import Trash from "../../public/assets/images/trash.svg"

import './style.css';
import Image from "next/image";

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

  // Delete expense
  const handleDeleteExpense = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta despesa?");
    if (confirmed) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        });
        fetchExpenses();
    }
  };

  return (
    <>
      <main>
        <h1>Despesas</h1>

        <button className="add-button" onClick={() => setShowAddExpense(true)}>Adicionar Despesa</button>

        {/* Component to add expenses */}
        {showAddExpense && (
          <AddExpense
            onAddExpense={handleAddExpense}
            onClose={() => setShowAddExpense(false)}
          />
        )}

        <div className="expenses-list container">
          <h2>Lista de Despesas</h2>
          <table className="expenses-list__container">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Nenhuma despesa adicionada ainda.
                </td>
              </tr>
            ) : (
              expenses.map(expense => (
                <tr key={expense.id} className="expenses-list__container--item">
                  <td>{expense.category}</td>
                  <td>R$ {(expense.amount / 100).toFixed(2)}</td>
                  <td>{new Date(expense.date).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button onClick={() => handleDeleteExpense(expense.id)}>
                      <Image src={Trash} alt="Trash" />
                    </button>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
