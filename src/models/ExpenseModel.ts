import prisma from '../lib/prisma';

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: Date;
}

export const ExpenseModel = {
  async findAll(): Promise<Expense[]> {
    return await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
  },

  async create(data: Expense): Promise<Expense> {
    return await prisma.expense.create({ data });
  },

  async update(id: number, data: Expense): Promise<Expense> {
    return await prisma.expense.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.expense.delete({
      where: { id },
    });
  }
};
