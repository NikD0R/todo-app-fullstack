import { apiClient } from "@/lib/apiClient";
import { CreateTodo, Todo } from "@/types/todo";

export const getTodos = async () => {
  const response = await apiClient.get<Todo[]>("/todos");

  return response.data;
};

export const createTodo = async (todo: CreateTodo) => {
  const response = await apiClient.post<{ data: { newTodo: Todo } }>(
    "/todos",
    todo,
  );

  return response.data.data.newTodo;
};

export const updateTodo = async (id: string, updates: Partial<Todo>) => {
  const response = await apiClient.put<{ data: { updatedTodo: Todo } }>(
    `/todos/${id}`,
    updates,
  );

  return response.data.data.updatedTodo;
};

export const deleteTodo = async (id: string) => {
  await apiClient.delete(`/todos/${id}`);
};
