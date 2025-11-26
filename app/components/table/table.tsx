import { SortColumn } from "../common/sort-column";

export type Column<T> = {
  key: string;
  label: string;
  class?: string;
  sortable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
};

interface TableProps<T> {
  className?: string;
  columns: Column<T>[];
  dataSource: T[];
  sortCol?: string;
  isAsc?: boolean;
  onSort?: (key: string) => void;
  fetching?: boolean;
  rowKey: (row: T) => string | number;
};

export const Table = <T,>({
  className = "w-full",
  columns,
  dataSource,
  sortCol,
  isAsc,
  onSort,
  fetching,
  rowKey,
}: TableProps<T>) => {
  return (
    <> { !fetching &&
    <table className={`border-collapse ${className}`}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className={col.class ?? ""}>
              {col.sortable && onSort ? (
                <SortColumn
                  columnKey={col.key}
                  label={col.label}
                  sortCol={sortCol ?? ""}
                  isAsc={isAsc ?? false}
                  onSort={onSort}
                />
              ) : (
                col.label
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataSource.length === 0 ? (
            <tr key={"no_items"} className="border-b">
              <td colSpan={columns.length} className="text-center py-4">
                - No items -
              </td>
            </tr>
          ) : (
            dataSource.map((row, index) => (
              <tr key={rowKey(row)}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row, index) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
      </tbody>
    </table> } </>
  );
}
