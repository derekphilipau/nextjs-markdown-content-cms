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
        {total} items • Page {currentPage} of {totalPages}
      </div>
      <div className="flex justify-between gap-x-4 md:gap-x-8 w-full sm:w-auto text-xl">
        {currentPage > 1 && (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className="flex items-center space-x-1 whitespace-nowrap nav-link"
          >
            <ChevronLeft size={24} />
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className="flex items-center space-x-1 whitespace-nowrap nav-link"
          >
            <span>Next</span>
            <ChevronRight size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}
