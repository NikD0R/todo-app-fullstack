import type { Request, Response } from "express";
import type { Todo } from "@prisma/client";
import { todosService } from "../services/todos.service.js";

const getAll = async (req: Request, res: Response) => {
  try {
    const todos: Todo[] = await todosService.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  const {
    title,
    description,
    priority = 5,
    due_date,
    category,
    position,
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTodo = await todosService.createTodo({
      title,
      description,
      priority,
      due_date,
      category,
      position,
    });

    res.status(201).json({ status: "success", data: { newTodo } });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await todosService.getTodo(id as string);

    if (!todo) {
      return res.status(404).json({ error: "Task is not found" });
    }

    const updatedTodo = await todosService.updateTodo(id as string, req.body);

    res.status(200).json({ status: "success", data: { updatedTodo } });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const todo = await todosService.getTodo(req.params.id as string);

  if (!todo) {
    return res.status(404).json({ error: "Task is not found" });
  }

  await todosService.deleteTodo(req.params.id as string);

  res.status(204).json({
    status: "success",
    message: "Task removed from tasklist",
  });
};

export const todosController = {
  getAll,
  createTodo,
  updateTodo,
  deleteTodo,
};
