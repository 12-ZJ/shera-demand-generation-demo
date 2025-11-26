"use client";

import { useEffect, useState } from "react";
import { Column, Table } from "./table";
import Pagination from "../common/pagination";

interface SubTableProps<T> {
  className?: string;
  columns: Column<T>[];
  defaultSortCol?: string;
  trigger: number;
  data: T[];
  sorter?: (data: T[], asc: boolean, col: string, ) => T[];
  rowKeyAction: (row: T) => string | number;
};

export const SubTable = <T,>({
  className,
  columns,
  defaultSortCol,
  trigger = 0,
  data,
  sorter,
  rowKeyAction,
}: SubTableProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [tableSource, setTableSource] = useState<T[]>([]);
  const [index, setIndex] = useState(1);
  const [maxRecords] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortCol, setSortCol] = useState<string | undefined>(defaultSortCol);
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    setIndex(1);

    let finalData = [...data];
    if (sortCol && sorter) {
      finalData = sorter(finalData, isAsc, sortCol);
    }

    setDataSource(finalData);
    setTotalRecords(finalData.length);
    setTableSource(finalData.slice(0, maxRecords));
  }, [data, maxRecords, trigger]);

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
    <div className="space-y-8 overflow-auto">
      <Table<T>
        className={className}
        columns={columns}
        dataSource={tableSource}
        sortCol={sortCol}
        isAsc={isAsc}
        onSort={handleSort}
        fetching={false}
        rowKey={rowKeyAction}
      />

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