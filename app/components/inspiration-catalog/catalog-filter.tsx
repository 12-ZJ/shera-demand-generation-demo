"use client";

import { useCallback, useEffect, useState } from "react";
import { SelectField } from "../common";
import { InspirationFilterDto, Option  } from "@/app/lib/types";
import { createChangeHandler, handleApiErrorWithRedirect } from "@/app/lib/utils";
import { defaultInspirationFilter } from "@/app/lib/constants/default";
import { useRouter } from "next/navigation";
import { getProduct, getProductApplication, getProductGroup } from "@/app/lib/services";

interface Props {
    onSearch: (filter: InspirationFilterDto) => void;
}

const InspirationCatalogFilter = ({ onSearch }: Props) => {
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState<InspirationFilterDto>(defaultInspirationFilter);
    const [groupOption, setGroupOption] = useState<Option[]>([]);
    const [appOption, setAppOption] = useState<Option[]>([]);
    const [productOption, setProductOption] = useState<Option[]>([]);
    const { multi: handleMultiChange } = createChangeHandler(filter, setFilter);
    
    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            const group = await getProductGroup({status: 1});
            const app = await getProductApplication({status: 1});
            const prod = await getProduct({status: 1});

            setGroupOption(group.map(item => ({
                value: item.id,
                label: item.name
            })));
            setAppOption(app.map(item => ({
                value: item.id,
                label: item.name
            })));
            setProductOption(prod.map(item => ({
                value: String(item.id),
                label: item.name
            })));
        } catch (error) {
            handleApiErrorWithRedirect(error, router);
        }
    }, [router]);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, [fetchData]);

    if (!mounted) { return null; }

    const handleReset = () => {
        setFilter(defaultInspirationFilter);
        onSearch(defaultInspirationFilter);
    };

    return (
        <div className="space-y-5 mt-5">
            <div className="w-full flex items-center">
                <div className="w-full flex space-x-3">
                    <div className="w-3/6 h-fit flex items-center space-x-2">
                        <SelectField
                            id="select_productId"
                            name="productId"
                            placeholder="Product"
                            className="w-1/3"
                            clearable={true}
                            options={productOption}
                            value={String(filter.productId)}
                            selectAction={(option) => handleMultiChange({productId: Number(option?.value)})}
                        />
                        <SelectField
                            id="select_productGroupId"
                            name="productGroupId"
                            placeholder="Product Group"
                            className="w-1/3"
                            clearable={true}
                            options={groupOption}
                            value={String(filter.productGroupId)}
                            selectAction={(option) => handleMultiChange({productGroupId: option?.value})}
                        />
                        <SelectField
                            id="select_productApplicationId"
                            name="productApplicationId"
                            placeholder="Product Application"
                            className="w-1/3"
                            clearable={true}
                            options={appOption}
                            value={String(filter.productApplicationId)}
                            selectAction={(option) => handleMultiChange({productApplicationId: option?.value})}
                        />
                    </div>
                    <div className="w-2/6 flex gap-4">
                        <button type="button" className="primary-button" onClick={() => onSearch(filter)}> Search </button>
                        <button type="button" className="clear-button" onClick={handleReset}> Reset </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspirationCatalogFilter;