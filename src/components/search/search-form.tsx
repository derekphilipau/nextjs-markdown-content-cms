"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 py-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
        className="px-4 py-2 mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      >
        Search
      </button>
    </form>
  );
}
