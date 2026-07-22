"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(
  () => import("@/components/todo-list").then((mod) => mod.TodoList),
  {
    ssr: false,
    loading: () => (
      <div className="text-center text-slate-500 py-10">Loading page...</div>
    ),
  },
);

export default function Home() {
  return (
    <main className="max-w-3xl m-auto min-h-screen p-6 bg-slate-50 overflow-x-hidden w-full">
      <TodoList />
    </main>
  );
}
