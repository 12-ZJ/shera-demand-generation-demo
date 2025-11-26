"use client"

import { defaultInspiration } from "@/app/lib/constants/default";
import { useFormSubmit } from "@/app/lib/hooks/form";
import { getInspirationDetail, getProduct, getProductApplication, getProductGroup, saveInspiration } from "@/app/lib/services";
import { ExportDto, InspirationExtended, InspirationProductModel, Option, ProductModel, SaveInspirationDto, StaticDto } from "@/app/lib/types";
import { createChangeHandler, createChangeHandlerArray, getInputClass, handleApiErrorWithRedirect, mergeWithFallback, removeByIndex, toastWarning, validate, validateRequired } from "@/app/lib/utils";
import { downloadBase64File, downloadLocalFile, fileToBase64 } from "@/app/lib/utils/file";
import { useLoadingStore } from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Form from "../form/config-layout";
import { InputLayout } from "../form/input-layout";
import { ActionButton, Checkbox, IconButton, SelectField } from "../common";
import Upload from "../common/upload";
import { FileImage, Plus, Trash2 } from "lucide-react";
import TagModal from "./tag-modal";

const defaultError: Partial<Record<keyof InspirationExtended, string>> = {
    filename: "",
    detail: "",
};

export default function InspirationCatalogForm() {
    const [mounted, setMounted] = useState(false);
    const [dataSource, setDataSource] = useState<InspirationExtended>(defaultInspiration);
    const [groupMaster, setGroupMaster] = useState<StaticDto[]>([]);
    const [appMaster, setAppMaster] = useState<StaticDto[]>([]);
    const [productMaster, setProductMaster] = useState<ProductModel[]>([]);
    const [products, setProducts] = useState<InspirationProductModel[]>([]);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState(defaultError);
    const [productMsg, setProductMsg] = useState("");
    const [addTag, setAddTag] = useState(false);
    const { fetching, processing, setFetching, setProcessing } = useLoadingStore((state) => state);

    const router = useRouter();
    const searchParams = useParams();
    const id = Number(searchParams.id);

    const { handleSubmit } = useFormSubmit<InspirationExtended>();
    const { multi: handleMultiChange } = createChangeHandler(dataSource, setDataSource);
    const { multiAt: handleArrayMultiChange } = createChangeHandlerArray(products, setProducts);

    const fetchData = useCallback(async () => {
        try {
            const group = await getProductGroup({status: 1});
            const app = await getProductApplication({status: 1});
            const prod = await getProduct({status: 1});
            const source = await getInspirationDetail({id});
            const data = mergeWithFallback<InspirationExtended>(source, defaultInspiration);
            const items = source.inspirationProduct.length > 0 
                ? source.inspirationProduct : 
                [{
                    id: 0,
                    inspirationId: id,
                    productId: 0,
                    productGroupId: "",
                    productApplicationId: "",
                    posX: "",
                    posY: ""
                }];

            setGroupMaster(group);
            setAppMaster(app);
            setProductMaster(prod);
            setDataSource(data);
            setProducts(items);
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

    if (!mounted || fetching) return null;

    const groupOption = (currentId: string) => {
        const items: Option[] = groupMaster
            .map(i => ({
                value: String(i.id),
                label: i.name
            }));
        return items;
    }

    const appOption = (currentId: string) => {
        const items: Option[] = appMaster
            .map(i => ({
                value: String(i.id),
                label: i.name
            }));
        return items;
    }

    const productOption = (currentId: number) => {
        const items: Option[] = productMaster
            .filter(b => !products.some(item => item.productId === b.id && item.productId !== currentId))
            .map(i => ({
                value: String(i.id),
                label: i.name
            }));
        return items;
    }

    const handleAddProduct = () => {
        const updated = [
            ...products,
            {
                id: 0,
                inspirationId: id,
                productId: 0,
                productGroupId: "",
                productApplicationId: "",
                posX: "",
                posY: ""
            }
        ];

        setProducts(updated);
    };

    const handleUpload = async (value: FormData | undefined) => {
        if (!value) return;

        const files = value.getAll("file") as File[];
        if (files.length === 0) return;

        const file = files[0];
        handleMultiChange({filename: file.name, base64: await fileToBase64(file)});
        setUploadFiles([file]);
        
        const clearProducts = products.map(prev => ({
            ...prev,
            posX: "",
            posY: ""
        }));
        setProducts(clearProducts);
    };

    const handleRemove = (index: number) => {
        const updated = removeByIndex(products, index);
        setProducts(updated);
    }

    const handleDownload = async (base64: string, name: string) => {
        if (base64 !== "") {
            const file: ExportDto = {
                filename: name,
                base64: base64
            }
            downloadBase64File(file);
        } else {
            downloadLocalFile(uploadFiles.find(e => e.name === name) as File);
        }
    }

    const validateForm = () => {
        const fieldValidators = {
            filename: [validateRequired()],
            detail: [validateRequired()],
        };

        const newErrors = validate(dataSource, fieldValidators);
        setErrors(newErrors);

        const prodValid = products.some(item => {
            return !!item.productGroupId && !!item.productId && !!item.productApplicationId;
        });

        console.log(products)
        setProductMsg(
            products.length === 0 
            ? "Please fill in at least 1 information." 
            : !prodValid ?
            "Please fill in the information completely."
            : ""
        )
        const isValid = Object.values(true).every((v) => !v) && prodValid;
        return isValid;
    };

    const postData = async () => {
        const data: SaveInspirationDto = {
            inspiration: dataSource,
            inspirationProduct: products
        };
        await saveInspiration(data);
    };

    const handleSave = (e: React.FormEvent) => {
        handleSubmit({ e, validateForm, onSave: postData, processing, setProcessing, redirectPath: "/config-inspiration-catalog", });
    }

    const handleShowTag = () => {
        if (!addTag && dataSource.base64 === "") {
            toastWarning("Please attach a photo file first.")
            return;
        }
        setAddTag(!addTag);
    }

    const handleSetTag = (data: InspirationProductModel[]) => {
        console.log("update tags:", data);
        setProducts(data);
        setAddTag(!addTag);
    }

    return (
        <Form 
            title={"Inspiration Catalog"} 
            tag={dataSource.inspirationNo} 
            onSave={handleSave}
            action="Add Tag"
            onClickAction={handleShowTag}
        >
            <InputLayout label="Photo">
                <div className="w-1/2">
                    <Upload onUpload={handleUpload} accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }} />
                    { dataSource.filename &&
                    <button type="button" className="flex items-center gap-2 font-normal mt-1" onClick={() => handleDownload(dataSource.base64, dataSource.filename)}>
                        <FileImage size={16} className="cursor-pointer text-theme_topic" />
                        { dataSource.filename }
                    </button> }
                </div>
            </InputLayout>
            <InputLayout label={"Detail"} error={errors.detail}>
                <textarea className={getInputClass(!!errors.detail)}
                    rows={5}
                    maxLength={1000}
                    disabled={processing}
                    onChange={(e) => handleMultiChange({detail: e.target.value})}
                    value={dataSource.detail}
                />
            </InputLayout>
            <InputLayout label={"Products"} error={productMsg}>
                <div className="w-full flex justify-end mb-1">
                    <ActionButton className="text-theme_topic" label="Add" icon={<Plus />} iconSize={12} onClick={handleAddProduct} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="w-[30%]"> Product Group </th>
                            <th className="w-[35%]"> Product </th>
                            <th className="w-[30%]"> Product Application </th>
                            <th className="w-[5%]"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((row, index) => (
                        <tr key={"key_"+index}>
                            <td>
                                <SelectField
                                    id={`select_productGroupId_${index}`}
                                    name={`productGroupId_${index}`}
                                    disabled={processing}
                                    value={row.productGroupId}
                                    options={groupOption(row.productGroupId)} 
                                    selectAction={(e) => handleArrayMultiChange(index, {productGroupId: String(e?.value)})}           
                                />
                            </td>
                            <td>
                                <SelectField
                                    id={`select_productId_${index}`}
                                    name={`productId_${index}`}
                                    disabled={processing}
                                    value={row.productId}
                                    options={productOption(row.productId)} 
                                    selectAction={(e) => handleArrayMultiChange(index, {productId: Number(e?.value)})}           
                                />
                            </td>
                            <td>
                                <SelectField
                                    id={`select_productApplicationId_${index}`}
                                    name={`productApplicationId_${index}`}
                                    disabled={processing}
                                    value={row.productApplicationId}
                                    options={appOption(row.productApplicationId)} 
                                    selectAction={(e) => handleArrayMultiChange(index, {productApplicationId: String(e?.value)})}           
                                />
                            </td>
                            <td>
                                <div className="flex justify-center">
                                    <IconButton
                                        icon={<Trash2 />}
                                        className="bg-none text-theme_back"
                                        size={14}
                                        onClick={() => handleRemove(index)}
                                    />
                                </div>
                            </td>
                        </tr> 
                        ))}
                    </tbody>
                </table>
            </InputLayout>
            <InputLayout label={"Status"} isRequired={false}>
                <Checkbox checked={dataSource.isActive ?? false} disabled={processing} onChange={(e) => handleMultiChange({isActive: e.target.checked})} />
            </InputLayout>
            
            <TagModal 
                isOpen={addTag} 
                title={""} 
                productMaster={productMaster}
                dataSource={products}
                base64Photo={dataSource.base64}
                onClose={handleShowTag} 
                onSubmit={handleSetTag} 
            />
        </Form>
    )
}