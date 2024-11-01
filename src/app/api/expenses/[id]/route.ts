import { NextResponse } from 'next/server';
import { ExpenseModel } from '../../../../models/ExpenseModel';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const { category, amount, date }: { category: string; amount: number; date: string } = await request.json();

  const updatedExpense = await ExpenseModel.update(parseInt(id), {
    category,
    amount: amount * 100,
    date: new Date(date),
  });

  if (!updatedExpense) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  return NextResponse.json(updatedExpense);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await ExpenseModel.delete(parseInt(id));
  return NextResponse.json(null, { status: 204 });
}
