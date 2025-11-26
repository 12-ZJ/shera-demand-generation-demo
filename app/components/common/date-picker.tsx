"use client"

import React, { useState, FC, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
    className?: string;
    placeholder: string;
    disable?: boolean;
    useRange?: boolean;
    min?: Date | null;
    max?: Date | null;
    start: Date | null;
    end: Date | null;
    invalid?: boolean;
    onChange: (value: { startDate: Date | null; endDate: Date | null }) => void;
}
const DatePicker: FC<Props> = ({ className = "w-full", placeholder, disable = false, useRange = false, min = null, max = null, start, end, invalid, onChange }) => {
    const [value, setValue] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: start,
        endDate: end
    });

    useEffect(() => {
        setValue({
            startDate: start,
            endDate: end
        });
    }, [start, end]);

    function handleValueChange(newValue: any) {
        const formattedValue = {
            startDate: newValue?.startDate ?? null,
            endDate: newValue?.endDate ?? null,
        };
        setValue(formattedValue); 
        onChange(formattedValue);
    } 

    return (
        <div className={`text-sm text-[#262626] ${className}`}>
            <Datepicker
                key={`${start?.toString() ?? 'null'}-${end?.toString() ?? 'null'}`}
                popoverDirection="down"
                containerClassName=""
                inputClassName={`${invalid && "error"} placeholder-[#878787] border-[theme_border] rounded-[6px] min-h-[38px] text-base relative dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded placeholder-[#262626] text-base disabled:cursor-auto`}
                toggleClassName={"absolute right-2 top-1/2 -translate-y-1/2 text-[#D9D9D9] hover:text-[#999999] opacity-100 cursor-pointer disabled:cursor-auto disabled:hidden"}
                popupClassName={"text-sm absolute z-50 w-fit hidden"}
                primaryColor={"blue"}
                separator={"-"}
                placeholder={placeholder}
                readOnly={true}
                disabled={disable}
                useRange={useRange}
                asSingle={!useRange}
                displayFormat={"DD/MM/YYYY"}
                minDate={min}
                maxDate={max}
                value={value}
                onChange={(e) => handleValueChange(e)}  
            />
        </div>
    );
}

export default DatePicker;