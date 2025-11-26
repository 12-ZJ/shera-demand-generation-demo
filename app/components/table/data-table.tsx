"use client";

import { useEffect, useState } from "react";
import { Column, Table } from "./table";
import { LoadingTable } from "../loader/loading-table";
import Pagination from "../common/pagination";

interface DataTableProps<T> {
  className?: string;
  columns: Column<T>[];
  defaultSortCol?: string;
  trigger: number;
  fetcherAction: () => Promise<T[]>;
  sorter?: (data: T[], asc: boolean, col: string, ) => T[];
  rowKeyAction: (row: T) => string | number;
};

export const DataTable = <T,>({
  className,
  columns,
  defaultSortCol,
  trigger = 0,
  fetcherAction,
  sorter,
  rowKeyAction,
}: DataTableProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [tableSource, setTableSource] = useState<T[]>([]);
  const [index, setIndex] = useState(1);
  const [maxRecords] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortCol, setSortCol] = useState<string | undefined>(defaultSortCol);
  const [isAsc, setIsAsc] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetcherAction()
      .then((data) => {
        setIndex(1);

        let finalData = [...data];
        if (sortCol && sorter) {
          finalData = sorter(finalData, isAsc, sortCol);
        }

        setDataSource(finalData);
        setTotalRecords(finalData.length);
        setTableSource(finalData.slice(0, maxRecords));
      })
      .finally(() => setFetching(false));
  }, [fetcherAction, maxRecords, trigger]);

  const handlePageChange = (newIndex: number) => {
    setIndex(newIndex);
    setTableSource(dataSource.slice((newIndex - 1) * maxRecords, newIndex * maxRecords));
  };

  const handleSort = (col: string) => {
    const asc = sortCol === col ? !isAsc : true;
    setSortCol(col);
    setIsAsc(asc);

    let sorted = [...dataSource];
    if (sorter) {
      sorted = sorter(sorted, asc, col);
    }
    setDataSource(sorted);
    setTableSource(sorted.slice((index - 1) * maxRecords, index * maxRecords));
  };

  return (
    <div className="space-y-8">
      <div className="overflow-auto">
        <Table<T>
        className={className}
        columns={columns}
        dataSource={tableSource}
        sortCol={sortCol}
        isAsc={isAsc}
        onSort={handleSort}
        fetching={fetching}
        rowKey={rowKeyAction}
      />
      </div>

      {fetching && <LoadingTable />}
      {tableSource.length > 0 && (
        <Pagination
          totalRecords={totalRecords}
          maxRecords={maxRecords}
          page={index}
          pageChange={handlePageChange}
        />
      )}
    </div>
  );
}