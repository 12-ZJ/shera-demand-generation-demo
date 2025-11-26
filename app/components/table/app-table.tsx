"use client";

import PrimaryHeader from "../header/primary-header";
import { DataTable } from "./data-table";

type AppTableProps<T> = {
  title: string;
  FilterComponent?: React.ReactNode;
  divStyleClass?: string;
  tableStyleClass?: string;
  columns: any[];
  trigger: number;
  defaultSortCol?: string;
  fetcherAction: () => Promise<T[]>;
  sorter?: (data: T[], asc: boolean, col: string, ) => T[];
  rowKeyAction: (row: T) => string | number;
};

export const AppTable = <T,>({
  title,
  FilterComponent,
  divStyleClass = "px-6 py-8",
  tableStyleClass,
  columns,
  trigger = 0,
  defaultSortCol,
  fetcherAction,
  sorter,
  rowKeyAction,
}: AppTableProps<T>) => {
  return (
    <div className={divStyleClass}>
      <PrimaryHeader title={title} />
      <div className="content-card shadow space-y-8 mt-5">
        {FilterComponent && <div>{FilterComponent}</div>}
        <DataTable<T>
          className={tableStyleClass}
          columns={columns}
          fetcherAction={fetcherAction}
          sorter={sorter}
          rowKeyAction={rowKeyAction}
          defaultSortCol={defaultSortCol}
          trigger={trigger}
        />
      </div>
    </div>
  );
}