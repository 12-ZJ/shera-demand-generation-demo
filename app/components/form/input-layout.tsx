import { ReactNode } from "react";
import ErrorContent from "../common/error-content";

interface Props {
    label: string;
    isRequired?: boolean;
    error?: string;
    className?: string;
    readonly children: ReactNode;
}

export const InputLayout = ({ label, isRequired = true, error, className = "w-full", children }: Props) => {
    return (
        <div className={`flex space-y-2 ${className}`}>
            <div className={`w-[20%] ${isRequired ? "required" : ""}`}>{label}</div>
            <div className="w-[80%] font-semibold items-center gap-10">
                { children }
                <ErrorContent errorMsg={error} />
            </div>
        </div>
    )
}