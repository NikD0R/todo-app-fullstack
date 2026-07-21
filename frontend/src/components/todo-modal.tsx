"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo, TodoFormData } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";

type TodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  initialData?: Todo | null;
  title: string;
};

const defaultState: TodoFormData = {
  title: "",
  description: "",
  priority: 5,
  category: "",
  due_date: "",
  is_done: false,
};

export const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState<TodoFormData>(defaultState);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialData?.title || "",
        description: initialData?.description || "",
        priority: initialData?.priority ?? 5,
        category: initialData?.category || "",
        due_date: initialData?.due_date || "",
        is_done: initialData?.is_done || false,
      });
    } else {
      setFormData(defaultState);
    }
  }, [isOpen, initialData]);

  const handleChange = (
    field: keyof TodoFormData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) return;
    const dataToSubmit = {
      ...formData,
      priority: formData.priority === 0 ? 5 : formData.priority,
    };
    onSubmit(dataToSubmit);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-sm font-medium"
              >
                Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="What needs to be done?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add details..."
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="priority"
                  className="text-sm font-medium"
                >
                  Priority (1-10)
                </label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.priority === 0 ? "" : formData.priority}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      handleChange("priority", 0);
                      return;
                    }

                    const num = Number(val);

                    if (num > 10) {
                      handleChange("priority", 10);
                    } else if (num < 1) {
                      handleChange("priority", 1);
                    } else {
                      handleChange("priority", num);
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="category"
                  className="text-sm font-medium"
                >
                  Category
                </label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="e.g. Work"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="due_date"
                className="text-sm font-medium"
              >
                Due Date
              </label>
              <Input
                id="due_date"
                type="date"
                value={
                  formData.due_date
                    ? new Date(formData.due_date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleChange("due_date", e.target.value)}
              />
            </div>

            {initialData && (
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="is_done"
                  checked={formData.is_done}
                  onCheckedChange={(checked) =>
                    handleChange("is_done", checked as boolean)
                  }
                />
                <label
                  htmlFor="is_done"
                  className="text-sm font-medium cursor-pointer"
                >
                  Mark as completed
                </label>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title.trim()}
              className="cursor-pointer"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
