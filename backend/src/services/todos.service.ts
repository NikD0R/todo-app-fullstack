import { prisma } from "../config/db.js";
import type { Todo, Prisma } from "@prisma/client";

const getAllTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: { created_at: "desc" },
  });
};

const getTodo = async (todoId: string) => {
  return await prisma.todo.findUnique({
    where: { id: todoId },
  });
};

const createTodo = async (data: Prisma.TodoCreateInput) => {
  return await prisma.todo.create({ data });
};

const updateTodo = async (todoId: string, data: Prisma.TodoUpdateInput) => {
  const updatedTodo: Todo = await prisma.todo.update({
    where: { id: todoId },
    data,
  });

  return updatedTodo;
};

const deleteTodo = async (todoId: string) => {
  await prisma.todo.delete({
    where: { id: todoId },
  });
};

export const todosService = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
