import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "@/types/todo";
import { TodoItem } from "../todo-item";

jest.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({
    checked,
    onCheckedChange,
  }: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onCheckedChange(!checked)}
      data-testid="mock-checkbox"
    />
  ),
}));

const mockTodo: Todo = {
  id: "1",
  title: "Buy milk",
  description: "2 liters of 3.2% milk",
  is_done: false,
  priority: 5,
  category: "Groceries",
  due_date: null,
  position: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("TodoItem Component", () => {
  const mockToggleDone = jest.fn();
  const mockDelete = jest.fn();
  const mockEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo title and description", () => {
    render(
      <TodoItem
        todo={mockTodo}
        handleToggleDone={mockToggleDone}
        handleDelete={mockDelete}
        onEdit={mockEdit}
      />,
    );

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("2 liters of 3.2% milk")).toBeInTheDocument();
  });

  it("calls handleToggleDone when the checkbox is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        handleToggleDone={mockToggleDone}
        handleDelete={mockDelete}
        onEdit={mockEdit}
      />,
    );

    const checkbox = screen.getByTestId("mock-checkbox");

    // Робимо звичайний клік
    fireEvent.click(checkbox);

    expect(mockToggleDone).toHaveBeenCalledWith(mockTodo);
    expect(mockToggleDone).toHaveBeenCalledTimes(1);
  });

  it("calls onEdit when the edit button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        handleToggleDone={mockToggleDone}
        handleDelete={mockDelete}
        onEdit={mockEdit}
      />,
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

  it("calls handleDelete when the delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        handleToggleDone={mockToggleDone}
        handleDelete={mockDelete}
        onEdit={mockEdit}
      />,
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);

    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
