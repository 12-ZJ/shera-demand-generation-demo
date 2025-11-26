import React from "react";

interface Props {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  spanLabel?: string;
  divClass?: string;
  checkClass?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<Props> = ({ checked, divClass = "justify-start", disabled = false, label, spanLabel = "Select", checkClass = "primary-checkbox", onChange}) => {
  return (
    <div className={`flex items-center font-normal gap-4 ${divClass}`}>
      <label className={checkClass}>
        <span className="sr-only">{spanLabel}</span>
        <input type="checkbox" disabled={disabled} checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
      </label>
      { label && <div> {label} </div> }
    </div>
  );
};