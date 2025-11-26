import { HiSearch } from "react-icons/hi";

export const SearchInput = (props: Readonly<React.InputHTMLAttributes<HTMLInputElement>>) => {
  return (
    <div className="flex items-center border border-theme_border rounded-md px-3 w-full bg-white max-h-[38px]">
        <HiSearch size={14} className="text-theme_black mr-2"/>
        <input className="border-none outline-none p-0 w-full h-full bg-transparent text-base placeholder:text-theme_sub_label"
            {...props}
        />
    </div>
  );
}