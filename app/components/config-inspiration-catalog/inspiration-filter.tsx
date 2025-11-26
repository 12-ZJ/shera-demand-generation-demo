"use client";

import { useEffect, useState } from "react";
import { SelectField, SearchInput, ActionButton } from "../common";
import { InspirationFilterDto, Option  } from "@/app/lib/types";
import { createChangeHandler } from "@/app/lib/utils";
import { defaultInspirationFilter } from "@/app/lib/constants/default";
import { activeStatus } from "@/app/lib/constants/list";
import { PenLine, SquarePen } from "lucide-react";

interface Props {
    onSearch: (filter: InspirationFilterDto) => void;
    onCreate: () => void;
}

const InspirationCatalogConfigFilter = ({ onSearch, onCreate }: Props) => {
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState<InspirationFilterDto>(defaultInspirationFilter);
    const { multi: handleMultiChange } = createChangeHandler(filter, setFilter);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) { return null; }

    const handleReset = () => {
        setFilter(defaultInspirationFilter);
        onSearch(defaultInspirationFilter);
    };

    return (
        <div className="space-y-5">
            <div className="w-full flex items-center space-x-5">
                <div className="w-full flex space-x-5">
                    <div className="w-3/6 h-fit flex items-center space-x-5">
                        <div className="w-2/3">
                            <SearchInput
                                placeholder="Keyword"
                                onChange={(e) => handleMultiChange({keyword: e.target.value})}
                                value={filter?.keyword}
                            />
                        </div>

                        <SelectField
                            id="select_status"
                            name="status"
                            placeholder="Status"
                            className="w-1/3"
                            clearable={true}
                            options={activeStatus}
                            value={String(filter.status)}
                            selectAction={(option) => handleMultiChange({status: Number(option?.value)})}
                        />
                    </div>
                    <div className="w-2/6 flex gap-5">
                        <button type="button" className="primary-button" onClick={() => onSearch(filter)}> Search </button>
                        <button type="button" className="clear-button" onClick={handleReset}> Reset </button>
                    </div>
                    <div className="w-1/6 flex justify-end">
                        <ActionButton className="tertiary-button" label="Create" icon={<PenLine />} onClick={onCreate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspirationCatalogConfigFilter;