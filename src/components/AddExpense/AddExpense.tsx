'use client'

import { useState } from 'react';
import { Expense } from '../../types/expense';

import './AddExpense.css';

interface AddExpenseProps {
    onAddExpense: (expense: Expense) => void;
    onClose: () => void;
}

export default function AddExpense({ onAddExpense, onClose }: AddExpenseProps) {
    const [form, setForm] = useState<Expense>({
        category: '',
        amount: 0,
        date: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newExpense: Expense = {
          ...form,
          amount: Math.round(form.amount * 100), 
        };
    
        onAddExpense(newExpense);

        setForm({ category: '', amount: 0, date: '' });

        onClose();
      };
    
    return (
        <div className="add-expense">
            <button onClick={onClose} className="close-button">X</button>
            
            <h2>Adicionar Despesa</h2>

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
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
                />
                <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <button type="submit">Adicionar Despesa</button>
            </form>
        </div>
    );
}