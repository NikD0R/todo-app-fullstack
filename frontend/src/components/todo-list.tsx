"use client";

import { createTodo, deleteTodo, getTodos, updateTodo } from "@/dal/todo.dal";
import { CreateTodo, Todo, TodoFormData } from "@/types/todo";
import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TodoItem } from "./todo-item";
import { TodoModal } from "./todo-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Sort, VisibilityOptions } from "@/types/params";

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const rawStatus = searchParams.get("status");
  const urlStatus: Filter =
    rawStatus === "completed" || rawStatus === "active" ? rawStatus : null;
  const urlSort = (searchParams.get("sort") as Sort) || "default";
  const [localSearch, setLocalSearch] = useState(urlSearch);

  const updateQueryString = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      value !== null &&
      value !== "all" &&
      value !== "default" &&
      value !== ""
    ) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== urlSearch) {
        updateQueryString("search", localSearch);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error: Failed to load tasks", error);
      setIsError("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error: Failed to load tasks", error);
        setIsError("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleCreateTodo = async (formData: TodoFormData) => {
    try {
      const newTodoData: CreateTodo = {
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        category: formData.category || null,
        due_date: formData.due_date
          ? new Date(formData.due_date).toISOString()
          : null,
        position: null,
      };

      const newTodo = await createTodo(newTodoData);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      setIsError("Failed to create task");
      console.error("Error: Failed to create task", error);
      fetchTodos();
    }
  };

  const handleUpdateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      const existingTodo = todos.find((task) => task.id === id);
      if (!existingTodo) return;

      const fullUpdatedTodo = { ...existingTodo, ...data };

      if (fullUpdatedTodo.due_date && !fullUpdatedTodo.due_date.includes("T")) {
        fullUpdatedTodo.due_date = new Date(
          fullUpdatedTodo.due_date,
        ).toISOString();
      }

      if (fullUpdatedTodo.category === "") fullUpdatedTodo.category = null;
      if (fullUpdatedTodo.description === "")
        fullUpdatedTodo.description = null;

      setTodos((prev) =>
        prev.map((task) => (task.id === id ? fullUpdatedTodo : task)),
      );

      await updateTodo(id, fullUpdatedTodo);
    } catch (error) {
      setIsError("Failed to update task");
      console.error("Error: Failed to update task", error);
      fetchTodos();
    }
  };

  const handleModalSubmit = (data: TodoFormData) => {
    if (selectedTodo) {
      handleUpdateTodo(selectedTodo.id, data);
    } else {
      handleCreateTodo(data);
    }
  };

  const openCreateModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleToggleDone = (todo: Todo) => {
    handleUpdateTodo(todo.id, { is_done: !todo.is_done });
  };

  const handleDelete = async (id: string) => {
    try {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      await deleteTodo(id);
    } catch (error) {
      setIsError("Failed to delete task");
      console.error("Error: Failed to delete task", error);
      fetchTodos();
    }
  };

  const visibleTodos = (
    todos: Todo[],
    { filterField, sortField, searchQuery }: VisibilityOptions,
  ) => {
    let preparedTodos = todos;

    if (searchQuery) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const searchRegex = new RegExp(`\\b${normalizedQuery}`, "i");
      preparedTodos = preparedTodos.filter(
        (todo) =>
          searchRegex.test(todo.title) ||
          (todo.description && searchRegex.test(todo.description)),
      );
    }

    if (filterField !== undefined && filterField !== null) {
      if (filterField === "completed") {
        preparedTodos = preparedTodos.filter((todo) => todo.is_done === true);
      } else if (filterField === "active") {
        preparedTodos = preparedTodos.filter((todo) => todo.is_done === false);
      }
    }

    if (sortField) {
      preparedTodos = preparedTodos.toSorted((todo1, todo2) => {
        switch (sortField) {
          case "priority-desc":
            return todo2.priority - todo1.priority;
          case "priority-asc":
            return todo1.priority - todo2.priority;
          default:
            return 0;
        }
      });
    }
    return preparedTodos;
  };

  const processedTodos = useMemo(() => {
    return visibleTodos(todos, {
      filterField: urlStatus,
      sortField: urlSort,
      searchQuery: urlSearch,
    });
  }, [todos, urlStatus, urlSort, urlSearch]);

  return (
    <>
      <h1 className="text-5xl text-center font-bold text-slate-900 mb-8">
        My Tasks
      </h1>
      <Button
        onClick={openCreateModal}
        className="cursor-pointer mb-6"
      >
        Add a task
      </Button>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
        <Input
          placeholder="Search by title or description..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="flex-1 border-2 border-slate-200"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            value={urlStatus === null ? "all" : urlStatus.toString()}
            onValueChange={(value) => updateQueryString("status", value)}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-white border-2 border-slate-200 cursor-pointer">
              <SelectValue>
                {urlStatus === "completed" && "Completed"}
                {urlStatus === "active" && "Active"}
                {urlStatus === null && "All statuses"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="cursor-pointer"
              >
                All statuses
              </SelectItem>
              <SelectItem
                value="active"
                className="cursor-pointer"
              >
                Active
              </SelectItem>
              <SelectItem
                value="completed"
                className="cursor-pointer"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={urlSort}
            onValueChange={(value) => updateQueryString("sort", value)}
          >
            <SelectTrigger className="w-full sm:w-[200px] bg-white border-2 border-slate-200 cursor-pointer">
              <SelectValue>
                {urlSort === "priority-desc" && "Priority High"}
                {urlSort === "priority-asc" && "Priority Low"}
                {urlSort === "default" && "Sort by default"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="default"
                className="cursor-pointer"
              >
                Sort: Default
              </SelectItem>
              <SelectItem
                value="priority-desc"
                className="cursor-pointer"
              >
                Priority: High to Low
              </SelectItem>
              <SelectItem
                value="priority-asc"
                className="cursor-pointer"
              >
                Priority: Low to High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTodo(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={selectedTodo}
        title={selectedTodo ? "Edit Task" : "Create New Task"}
      />

      {isLoading && (
        <div className="text-center text-slate-500 py-10">Loading...</div>
      )}

      {!isLoading && isError && (
        <div className="text-left text-red-500 py-10">{isError}</div>
      )}

      {!isLoading && !isError && todos.length === 0 && (
        <div className="text-center text-slate-500 py-10">
          You don&apos;t have any tasks
        </div>
      )}

      {!isLoading && !isError && todos.length > 0 && (
        <div className="space-y-4">
          {processedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggleDone={handleToggleDone}
              handleDelete={handleDelete}
              onEdit={() => openEditModal(todo)}
            />
          ))}
        </div>
      )}
    </>
  );
};
