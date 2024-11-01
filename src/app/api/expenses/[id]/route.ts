import { NextResponse } from 'next/server';
import { ExpenseModel } from '../../../../models/ExpenseModel';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { category, amount, date }: { category: string; amount: number; date: string } = await request.json();
  const updatedExpense = await ExpenseModel.update(parseInt(id), {
    category,
    amount: parseInt(amount.toString()) * 100,
    date: new Date(date),
  });
  return NextResponse.json(updatedExpense);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await ExpenseModel.delete(parseInt(id));
  return NextResponse.json(null, { status: 204 });
}