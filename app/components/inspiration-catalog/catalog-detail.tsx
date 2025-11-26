"use client"

import { defaultInspiration, tempInspirationList } from "@/app/lib/constants/default";
import { useFormSubmit } from "@/app/lib/hooks/form";
import { getInspirationDetail, getProduct, getProductApplication, getProductGroup, saveInspiration } from "@/app/lib/services";
import { ExportDto, InspirationDto, InspirationExtended, InspirationProductModel, Option, ProductModel, SaveInspirationDto, StaticDto } from "@/app/lib/types";
import { createChangeHandler, createChangeHandlerArray, getInputClass, handleApiErrorWithRedirect, mergeWithFallback, removeByIndex, toastWarning, validate, validateRequired } from "@/app/lib/utils";
import { downloadBase64File, downloadLocalFile, fileToBase64 } from "@/app/lib/utils/file";
import { useLoadingStore, useUserStore } from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Form from "../form/config-layout";
import { InputLayout } from "../form/input-layout";
import { ActionButton, Checkbox, SelectField } from "../common";
import Upload from "../common/upload";
import { FileImage, Plus } from "lucide-react";
import TagModal from "../config-inspiration-catalog/tag-modal";
import SecondaryHeader from "../header/secondary-header";
import TagPhoto from "./tag-photo";

const defaultError: Partial<Record<keyof InspirationExtended, string>> = {
    filename: "",
    detail: "",
};

export default function InspirationCatalogDetail() {
    const [mounted, setMounted] = useState(false);
    const [dataSource, setDataSource] = useState<InspirationDto>();
    const { setFetching } = useLoadingStore((state) => state);

    const router = useRouter();
    const searchParams = useParams();
    const id = Number(searchParams.id);

    const fetchData = useCallback(async () => {
        try {
            const data = tempInspirationList[0] //await getInspirationDetail({id});
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