import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="max-w-3xl m-auto min-h-screen p-6 bg-slate-50 overflow-x-hidden w-full">
      <TodoList />
    </main>
  );
}
