"use client"

import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
    hideMaxPage?: boolean;
    totalRecords: number;
    maxRecords: number;
    page: number;
    maxChange?: (value: number) => void;
    pageChange: (value: number) => void;
}

const Pagination = ({ hideMaxPage = true, totalRecords, maxRecords, page, maxChange, pageChange }: PaginationProps) => {
    const [counter, setCounter] = useState(1);
    const [maxRows, setMaxRows] = useState(maxRecords);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1)
    const [index, setIndex] = useState(1);
    const maxPages = 5;

    useEffect(() => {
        setCurrentPage(page);
        setMaxRows(maxRecords);
        setIndex((page * maxRecords) - (maxRecords - 1));
        setLastPage(Math.ceil(totalRecords / maxRecords));

        const half = Math.floor(maxPages / 2);
        let startPage = page - half;

        if (startPage < 1) startPage = 1;
        if (startPage + maxPages - 1 > Math.ceil(totalRecords / maxRecords)) {
            startPage = Math.max(1, Math.ceil(totalRecords / maxRecords) - maxPages + 1);
        }

        setCounter(startPage);
    }, [totalRecords, maxRecords, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= lastPage) {
            pageChange(newPage);
        }
    }

    const handleMaxChange = (newMax: number) => {
        maxChange?.(newMax);
    }

    if (totalRecords <= 0 ) {
        return null
    }

    const disabledPrev = currentPage <= 1;
    const disabledNext = currentPage >= lastPage;

    return (
        <div className="w-full flex mb-4" key={"pagination_" + currentPage}>
            <div className="w-1/2 text-theme_label">
                { !hideMaxPage && <> Rows per page:
                <div className="relative inline-block">
                    <select
                        className="appearance-none rounded-md border mx-2 py-1.5 px-3 min-w-[60px]"
                        value={maxRows}
                        onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <div className="text-black pointer-events-none absolute inset-y-0 right-5 flex items-center">
                        <IoIosArrowDown size={13} />
                    </div>
                </div>
                </> }
                {index} to {currentPage === lastPage ? totalRecords : index+maxRows-1} of {totalRecords} records
            </div>

            <div className="w-1/2 flex justify-end items-center gap-1">
                <button type="button" disabled={disabledPrev} className={`px-2 flex gap-2 justify-center items-center 
                    ${ !disabledPrev ? "cursor-pointer text-theme_blue_grey" : "text-theme_brown_grey"}`}
                    onClick={() => handlePageChange(currentPage-1)}> 
                    <IoIosArrowBack size={14}/> Previous
                </button>

                {[...Array(maxPages)]
                    .map((_, i) => i)
                    .filter(i => (i + counter) <= lastPage)
                    .map(i => (
                        <button type="button" key={i} className={`rounded min-w-[35px] px-2 py-1 grid justify-center items-center cursor-pointer
                            ${currentPage == (i + counter) ? "bg-theme_blue_grey text-white" : "text-theme_blue_grey"}`}
                            onClick={() => handlePageChange(i + counter)}
                        >
                            {i + counter}
                        </button>
                    ))
                }
               
                <button type="button" disabled={disabledNext} className={`px-2 flex gap-2 justify-center items-center 
                    ${ !disabledNext ? "cursor-pointer text-theme_blue_grey" : "text-theme_brown_grey"}`}
                    onClick={() => handlePageChange(currentPage+1)}> 
                    Next <IoIosArrowForward size={14} />
                </button>
            </div>
        </div>
    )
}

export default Pagination;