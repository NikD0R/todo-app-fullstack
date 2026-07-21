import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";

type TodoItemProps = {
  todo: Todo;
  handleToggleDone: (todo: Todo) => void;
  handleDelete: (id: string) => void;
  onEdit: () => void;
  isDragEnabled?: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleToggleDone,
  handleDelete,
  onEdit,
}) => {
  return (
    <Card
      key={todo.id}
      className="transition-all hover:shadow-md border-slate-200"
    >
      <CardContent className="p-4 flex items-start gap-4">
        <Checkbox
          checked={todo.is_done}
          onCheckedChange={() => handleToggleDone(todo)}
          className="w-5 h-5 mt-1"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-lg truncate ${todo.is_done ? "text-slate-400 line-through" : "text-slate-900"}`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="text-sm text-slate-500 line-clamp-2 mt-1">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              Priority: {todo.priority}
            </span>

            {todo.category && (
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                {todo.category}
              </span>
            )}

            {todo.due_date && (
              <span className="text-xs font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md">
                Due:{" "}
                {new Date(todo.due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit()}
            className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
            title="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(todo.id)}
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
