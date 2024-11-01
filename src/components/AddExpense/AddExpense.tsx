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

    const [value, setValue] = useState("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
        setForm({ ...form, category: sanitizedValue });
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, "");

        if (inputValue === "") {
            setValue("");
            return;
        }

        const parsedValue = (parseFloat(inputValue) / 100).toFixed(2);
        
        setValue(parsedValue);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newExpense: Expense = {
            ...form,
            amount: Math.round(parseFloat(value.replace(",", "."))),
        };
    
        onAddExpense(newExpense);

        setForm({ category: '', amount: 0, date: '' });
        setValue("");
        onClose();
    };
    
    return (
        <div className="add-expense">
            <div className='add-expense__top'>
                <h2>Adicionar Despesa</h2>

                <button onClick={onClose} className="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                </button>
            </div>

            <form className='add-expense__form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Categoria"
                    value={form.category}
                    onChange={handleCategoryChange}
                    required
                />
                <input
                    type="text"
                    placeholder="R$ 0,00"
                    value={value ? `R$ ${value.replace(".", ",")}` : ""}
                    onChange={handleAmountChange}
                    required
                />
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}