import { LuArrowDownUp, LuArrowDown, LuArrowUp } from "react-icons/lu";

type Props = {
    columnKey: string;
    label: string;
    sortCol: string;
    isAsc: boolean;
    onSort: (col: string) => void;
};

export const SortColumn: React.FC<Props> = ({
    columnKey,
    label,
    sortCol,
    isAsc,
    onSort,
}) => {
    let sortIcon;
    if (sortCol !== columnKey) {
        sortIcon = <LuArrowDownUp size={14} />;
    } else if (isAsc) {
        sortIcon = <LuArrowDown size={14} className="text-theme_orange" />;
    } else {
        sortIcon = <LuArrowUp size={14} className="text-theme_orange"/>;
    }

  return (
        <button
            type="button"
            onClick={() => onSort(columnKey)}
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left w-full"
            aria-label={`Sort by ${label}`}
        >
            <span>{label}</span>
            <span>{sortIcon}</span>
        </button>
    );
};
