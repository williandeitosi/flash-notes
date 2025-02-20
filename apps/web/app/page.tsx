"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ColumnNotes from "./components/notes/ColumnNotes";
import ShowNote from "./components/notes/ShowNote";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full flex flex-col overflow-hidden p-2 bg-zinc-900 text-white">
        <h1 className="text-3xl font-bold text-center py-6 ">Flash Notes</h1>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-12 h-full gap-4">
            <ColumnNotes />
            <div className="col-span-9 border-sky-700 border-l-2 overflow-hidden rounded-lg">
              <h2 className="text-center text-sky-700 text-3xl">View</h2>
              <ShowNote />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
