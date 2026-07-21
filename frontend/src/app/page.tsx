export const dynamic = "force-dynamic";

import { TodoList } from "@/components/todo-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="max-w-3xl m-auto min-h-screen p-6 bg-slate-50 overflow-x-hidden w-full">
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TodoList />
      </Suspense>
    </main>
  );
}
