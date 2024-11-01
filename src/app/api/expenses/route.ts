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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedData: Expense = await request.json();

  const numericId = parseInt(id, 10);

  const updatedExpense = await ExpenseModel.update(numericId, {
    category: updatedData.category,
    amount: parseInt(updatedData.amount.toString()) * 100,
    date: new Date(updatedData.date),
  });

  if (!updatedExpense) {
    return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
  }

  return NextResponse.json(updatedExpense);
}
