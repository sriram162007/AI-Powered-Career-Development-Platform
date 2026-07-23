"use client";

import { type ReactNode, type TableHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export default function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

Table.Header = function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn("border-b bg-gray-50/50", className)}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

Table.Body = function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("divide-y", className)}>{children}</tbody>;
};

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

Table.Row = function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-gray-50 dark:hover:bg-navy-700/50",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

Table.Head = function TableHead({ children, className }: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle text-sm font-semibold text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </th>
  );
};

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

Table.Cell = function TableCell({ children, className }: TableCellProps) {
  return (
    <td
      className={cn(
        "p-4 align-middle text-sm",
        className
      )}
    >
      {children}
    </td>
  );
};
