import React from "react";
import Link from "next/link";
import type { Pagination } from "@/types";

interface PaginationProps {
  pagination: Pagination;
  basePath: string;
}

export function Pagination({ pagination, basePath }: PaginationProps) {
  const { total, totalPages, currentPage, pageSize } = pagination;
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-700">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, total)} of {total} results
      </div>
      <div className="flex space-x-2">
        {currentPage > 1 && (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </Link>
        )}
        <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
