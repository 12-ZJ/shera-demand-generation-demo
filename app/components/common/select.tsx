"use client";

import Select, { SingleValue } from "react-select";
import { Option } from "../../lib/types";
import { singleSelectStyle } from "./select-style";

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  value: string | number | null;
  options: Option[];
  selectAction: (selected: SingleValue<Option>) => void;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
  menuPortalTarget?: HTMLElement | null;
};

export const SelectField = ({
  id,
  name,
  placeholder = "- Select -",
  value,
  options,
  selectAction,
  error,
  disabled = false,
  searchable = true,
  clearable = true,
  className = "w-full",
  menuPortalTarget = document.body,
}: Props) => {
  const selected = options.find(option => option.value === String(value)) || null;

  return (
      <Select
        id={id}
        name={name}
        className={className}
        classNamePrefix="select"
        placeholder={placeholder}
        isSearchable={searchable}
        isClearable={clearable}
        isDisabled={disabled}
        options={options}
        value={selected}
        onChange={selectAction}
        styles={singleSelectStyle(!!error)}
        menuPortalTarget={menuPortalTarget}
      />
  );
};