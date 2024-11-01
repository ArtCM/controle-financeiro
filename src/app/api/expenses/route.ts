import { NextResponse } from 'next/server';
import { ExpenseModel, Expense } from '../../../models/ExpenseModel';

export async function GET() {
  const expenses = await ExpenseModel.findAll();
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const { category, amount, date }: Expense = await request.json();
  const expense = await ExpenseModel.create({
    category,
    amount: parseInt(amount.toString()) * 100,
    date: new Date(date),
  });
  return NextResponse.json(expense, { status: 201 });
}
