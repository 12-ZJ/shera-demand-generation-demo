import { LuArrowDownUp, LuArrowDown, LuArrowUp } from "react-icons/lu";
import { TbArrowsSort, TbSortAscending, TbSortDescending } from "react-icons/tb";

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
        sortIcon = <TbArrowsSort size={16} className="text-theme_topic" />;
    } else if (isAsc) {
        sortIcon = <TbSortAscending size={16} className="text-theme_topic" />;
    } else {
        sortIcon = <TbSortDescending size={16} className="text-theme_topic"/>;
    }

  return (
        <button
            type="button"
            onClick={() => onSort(columnKey)}
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 w-full justify-center"
            aria-label={`Sort by ${label}`}
        >
            <span>{label}</span>
            <span>{sortIcon}</span>
        </button>
    );
};
