import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { getTodos } from "@/dal/todo.dal";
import { Todo } from "@/types/todo";
import { TodoList } from "../todo-list";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("@/dal/todo.dal", () => ({
  getTodos: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

const mockTasks: Todo[] = [
  {
    id: "1",
    title: "Task 1",
    description: null,
    is_done: false,
    priority: 5,
    category: null,
    due_date: null,
    position: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Task 2 Completed",
    description: null,
    is_done: true,
    priority: 2,
    category: null,
    due_date: null,
    position: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe("TodoList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays a loading message initially", () => {
    (getTodos as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a list of tasks after loading", async () => {
    (getTodos as jest.Mock).mockResolvedValue(mockTasks);

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2 Completed")).toBeInTheDocument();
  });

  it("displays an empty state message if there are no tasks", async () => {
    (getTodos as jest.Mock).mockResolvedValue([]);

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText("You don't have any tasks")).toBeInTheDocument();
    });
  });

  it("shows an error message if fetching fails", async () => {
    (getTodos as jest.Mock).mockRejectedValue(
      new Error("Error: Failed to load tasksr"),
    );

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load tasks")).toBeInTheDocument();
    });
  });

  it("opens the modal when 'Add a task' button is clicked", async () => {
    (getTodos as jest.Mock).mockResolvedValue([]);
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const addButton = screen.getByText("Add a task");
    fireEvent.click(addButton);

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
  });
});
