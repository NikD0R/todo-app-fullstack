export interface Todo {
  id: string;
  title: string;
  description: string | null;
  is_done: boolean;
  priority: number;
  due_date: string | null;
  category: string | null;
  position: number | null;
  created_at: string;
  updated_at: string;
}

export type CreateTodo = Omit<
  Todo,
  "id" | "created_at" | "updated_at" | "is_done"
>;

export type TodoFormData = {
  title: string;
  description: string;
  priority: number;
  category: string;
  due_date: string;
  is_done: boolean;
};
