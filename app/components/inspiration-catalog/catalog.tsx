"use client"

import { useCallback, useEffect, useState } from "react";
import InspirationCatalogFilter from "./catalog-filter";
import { useLoadingStore } from "@/app/store";
import { InspirationDto, InspirationFilterDto } from "@/app/lib/types";
import { handleApiErrorWithRedirect } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { tempInspirationList } from "@/app/lib/constants/default";
import { truncateText } from "@/app/lib/utils/format";
import Link from "next/link";

export default function InspirationCatalog() {
    const [mounted, setMounted] = useState(false);
    const [dataSource, setDataSource] = useState<InspirationDto[]>([]);
    const { setFetching, setProcessing } = useLoadingStore((state) => state);

    const router = useRouter();

    const fetchData = useCallback(async (filter: InspirationFilterDto) => {
        try {
            setFetching(true);
            const data = tempInspirationList; //await getInspiration(filter);
            setDataSource(data);
        } catch (error) {
            handleApiErrorWithRedirect(error, router);
        } finally {
            setFetching(false);
            setProcessing(false);
        }
    }, [router]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSearch = (newFilter: InspirationFilterDto) => {
        fetchData(newFilter);
        setProcessing(true);
    }

    return (
        <div className="px-6 py-8">
            <div className="text-xl font-semibold text-theme_topic">Inspiration Catalog</div>
            <InspirationCatalogFilter onSearch={handleSearch} />
            <div className="grid grid-cols-5 gap-2 mt-6">
            {dataSource.map((item, index) => (
                <Link href={`/inspiration-catalog/${item.id}/detail`} 
                    key={index} 
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                >
                <img
                    src={`data:image/png;base64,${item.base64}`}
                    alt="tag-photo"
                    className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 w-full text-white text-sm px-2 py-1 bg-gradient-to-t from-black/50 to-black/0">
                    <span>{truncateText(item.detail)}</span>
                </div>
                </Link>
            ))}
            </div>
        </div>
    )
}