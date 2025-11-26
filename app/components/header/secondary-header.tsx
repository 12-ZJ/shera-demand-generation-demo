"use client"

import { Tags } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

interface Props {
    title: string;
    tag: string;
    action?: string;
    onClickAction?: () => void;
}

const SecondaryHeader = ({ title, tag, action = "", onClickAction }: Props) => {
    const router = useRouter();

    const handleBack = () => {
      router.back();
    };

    return (
        <div>
            <button type="button" className="flex items-center gap-1 text-theme_back hover:text-theme_label cursor-pointer text-xs"
                onClick={handleBack}>
                <IoIosArrowBack size={10} /> Back
            </button>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="text-xl font-semibold text-theme_topic">
                        {title}
                    </div>
                    { !!tag &&
                    <div className="text-xs h-fit px-4 py-1 font-semibold text-white bg-theme_primary rounded-2xl">
                        {tag}
                    </div> }
                </div>
                { !!action &&
                <button type="button" 
                    className="flex gap-2 items-center bg-theme_tertiary text-white rounded-2xl w-fit px-4 py-1"
                    onClick={onClickAction}>
                    <Tags size={14} />
                    {action}
                </button> }
            </div>
        </div>
    )
}

export default SecondaryHeader;