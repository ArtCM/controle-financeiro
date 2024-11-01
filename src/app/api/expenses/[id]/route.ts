import { NextResponse } from 'next/server';
import { ExpenseModel } from '../../../../models/ExpenseModel';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { category, amount, date } = await request.json();

  const updatedExpense = await ExpenseModel.update(parseInt(id), { 
    category,
    amount: amount * 100, 
    date: new Date(date),
  });

  return NextResponse.json(updatedExpense);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await ExpenseModel.delete(parseInt(id));
  return NextResponse.json(null, { status: 204 });
}
