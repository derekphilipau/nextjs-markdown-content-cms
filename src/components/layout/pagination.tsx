import React from "react";
import Link from "next/link";
import type { Pagination } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pagination: Pagination;
  basePath: string;
}

export function Pagination({ pagination, basePath }: PaginationProps) {
  const { total, totalPages, currentPage, pageSize } = pagination;
  return (
    <div className="flex flex-wrap gap-y-4 items-center justify-between mt-8">
      <div className="text-lg text-muted-foreground">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, total)} of {total} results
      </div>
      <div className="flex space-x-2 w-full sm:w-auto">
        {currentPage > 1 && (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className="w-full px-3 py-2 text-lg font-medium text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1 whitespace-nowrap"
          >
            <ChevronLeft size={24} />
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className="w-full px-3 py-2 text-lg font-medium text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}
