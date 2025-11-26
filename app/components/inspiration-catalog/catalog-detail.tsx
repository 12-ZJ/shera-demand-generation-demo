"use client"

import { InspirationDto, InspirationExtended } from "@/app/lib/types";
import { handleApiErrorWithRedirect } from "@/app/lib/utils";
import { useLoadingStore } from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SecondaryHeader from "../header/secondary-header";
import TagPhoto from "./tag-photo";
import { getInspirationDetail } from "@/app/lib/services";

export default function InspirationCatalogDetail() {
    const [mounted, setMounted] = useState(false);
    const [dataSource, setDataSource] = useState<InspirationDto>();
    const { setFetching } = useLoadingStore((state) => state);

    const router = useRouter();
    const searchParams = useParams();
    const id = Number(searchParams.id);

    const fetchData = useCallback(async () => {
        try {
            const data = await getInspirationDetail({id});
            setDataSource(data);
        } catch (error) {
            handleApiErrorWithRedirect(error, router);
        } finally {
            setFetching(false);
        }
    }, [id, router]);

    useEffect(() => {
        setMounted(true);
        setFetching(true);
        fetchData();
    }, [fetchData]);

    if (!mounted) return null;

    return (
        <div className="px-6 py-8 space-y-5">
            <SecondaryHeader title={"Inspiration Catalog"} tag={dataSource?.inspirationNo ?? ""} />
            <TagPhoto dataSource={dataSource?.inspirationProduct ?? []} base64Photo={dataSource?.base64 ?? ""} />

            <div className="flex gap-5">
                <div className="w-1/12 font-medium">
                    Detail
                </div>
                <div className="w-11/12">
                    {dataSource?.detail ?? ""}
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className="w-1/5"> Code </th>
                        <th className="w-2/5"> Name</th>
                        <th className="w-1/5"> Size </th>
                        <th className="w-1/5"> Weight </th>
                    </tr>
                </thead>
                <tbody>
                    { dataSource?.inspirationProduct.map((row, index) => (
                    <tr key={"key_"+index}>
                        <td> {row.productCode} </td>
                        <td> {row.productName} </td>
                        <td> {row.productSize} </td>
                        <td> {row.productWeight} </td>
                    </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    )
}