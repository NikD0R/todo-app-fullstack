"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(
  () => import("@/components/todo-list").then((mod) => mod.TodoList),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading tasks...</div>,
  },
);

export default function Home() {
  return (
    <main className="max-w-3xl m-auto min-h-screen p-6 bg-slate-50 overflow-x-hidden w-full">
      <TodoList />
    </main>
  );
}
