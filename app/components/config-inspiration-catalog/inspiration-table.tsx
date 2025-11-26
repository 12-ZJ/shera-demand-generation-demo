"use client";

import { useCallback, useState } from "react";
import { Column } from "../table/table";
import { AppTable } from "../table/app-table";
import { useRouter } from "next/navigation";
import { InspirationDto, InspirationFilterDto } from "@/app/lib/types";
import { sortBy } from "@/app/lib/utils";
import Link from "next/link";
import { getInspiration } from "@/app/lib/services";
import InspirationCatalogConfigFilter from "./inspiration-filter";
import { defaultInspirationFilter } from "@/app/lib/constants/default";

const columns: Column<InspirationDto>[] = [
  {
    key: "inspirationNo",
    label: "Inspiration No.",
    class: "w-[15%]",
    sortable: true,
    render: (row) => (
      <Link href={`/config-inspiration-catalog/${row.id}/detail`} className="font-medium text-theme_link"> {row.inspirationNo} </Link>
    )
  },
  {
    key: "detail",
    label: "Detail",
    class: "w-[70%]",
    sortable: false,
    render: (row) => (
      <div className="text-left"> {row.detail} </div>
    )
  },
  {
    key: "isActive",
    label: "Status",
    class: "w-[15%] w-full text-center",
    sortable: true,
    render: (row) => (
      <div className="w-full text-center"> {row.isActive ? "Active" : "In Active"} </div>
    )
  },
];

export const userSorter = (data: InspirationDto[], asc: boolean, col: string) => {
  switch (col) {
    case "inspirationNo":
    case "detail":
      return sortBy(data, col as keyof InspirationDto, "string", asc);
    case "isActive":
      return sortBy(data, "isActive", "boolean", asc);
    default:
      return data;
  }
};

export default function InspirationCatalogConfigTable() {
  const [filter, setfilter] = useState<InspirationFilterDto>(defaultInspirationFilter);
  const [trigger, setTrigger] = useState(0);
  const router = useRouter();

  const fetcherAction = useCallback(
      () => getInspiration({...filter}),
    [filter]
  );

  const handleSearch = (newFilter: InspirationFilterDto) => {
    setfilter(newFilter);
    setTrigger((t) => t + 1);
  };

  return (
    <AppTable<InspirationDto>
      title="Inspiration Catalog Management"
      FilterComponent={
        <InspirationCatalogConfigFilter
          onSearch={(filter) => handleSearch(filter)}
          onCreate={() => router.push("/config-inspiration-catalog/0/detail")}
        />
      }
      tableStyleClass="w-full"
      columns={columns}
      trigger={trigger}
      fetcherAction={fetcherAction}
      sorter={userSorter}
      rowKeyAction={(row) => row.id}
    />
  );
}