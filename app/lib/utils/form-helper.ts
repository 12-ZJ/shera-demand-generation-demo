import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MultiValue } from "react-select";
import { Option } from "../types";
import { Dispatch, SetStateAction } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCreateBy = ({ previousId, currentId }: { previousId: number, currentId: number }) => {
    let value = previousId;
    if (!previousId) {
        value = currentId
    }
    return value ?? 0;
}

export const getUpdateBy = ({ previousId, currentId }: { previousId: number, currentId: number }) => {
    let value = 0;
    if (previousId) {
        value = currentId
    }
    return value;
}

export const inputNumberValue = (value: number, isEnter: boolean = false): string | number => 
  (value === 0 && !isEnter ? "" : value);

type InputPatternType = "phone" | "number" | "decimal" | "alpha" | "alphanumeric";

export const allowInputPattern = (type: InputPatternType) => {
  let pattern: RegExp;
  switch (type) {
    case "phone":
      pattern = /^\+?\d*$/;
      break;
    case "number":
      pattern = /^\d*$/;
      break;
    case "decimal":
      pattern = /^\d*\.?\d*$/;
      break;
    case "alpha":
      pattern = /^[a-zA-Z]*$/;
      break;
    case "alphanumeric":
      pattern = /^[a-zA-Z0-9]*$/;
      break;
    default:
      pattern = /.*/;
  }

  return (e: React.FormEvent<HTMLInputElement>) => {
    const input = (e as unknown as InputEvent).data ?? "";
    const el = e.currentTarget;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const newValue = el.value.slice(0, start) + input + el.value.slice(end);

    if (!pattern.test(newValue)) e.preventDefault();
  };
};

export const createChangeHandler = <T extends Record<string, any>>(
  state: T,
  setState: (value: T) => void
) => {
  return {
    input: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setState({
        ...state,
        [name]: value,
      });
    },
    custom: (name: keyof T, value: any) => {
      setState({
        ...state,
        [name]: value,
      });
    },
    multi: (newValues: Partial<T>) => {
      setState({
        ...state,
        ...newValues,
      });
    }
  };
};

export const createChangeHandlerArray = <T extends Record<string, any>>(
  state: T[],
  setState: Dispatch<SetStateAction<T[]>>
) => ({
  inputAt: (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState(prev => {
      const newState = [...prev];
      newState[index] = { ...newState[index], [name]: value };
      return newState;
    });
  },
  customAt: (index: number, name: keyof T, value: any) => {
    setState(prev => {
      const newState = [...prev];
      newState[index] = { ...newState[index], [name]: value };
      return newState;
    });
  },
  multiAt: (index: number, newValues: Partial<T>) => {
    setState(prev => {
      const newState = [...prev];
      newState[index] = { ...newState[index], ...newValues };
      return newState;
    });
  },
});

export function handleMultiSelectChange<T extends Record<string, any>>(
  name: keyof T,
  option: MultiValue<Option> | null,
  setState: React.Dispatch<React.SetStateAction<T>>,
  field: string = "id"
) {
  const selectedValues = option ? option.map((opt) => opt.value) : [];
  setState((prev) => ({
    ...prev,
    [name]: selectedValues.map((val) => ({ [field]: val })),
  }));
}

export const validateRequired =
  (msg = "Please fill out this field.") =>
  (value: any) => {
    if (value === null || value === undefined) return msg;
    if (typeof value === "number" && value === 0) return msg;
    if (String(value).trim() === "") return msg;

    return "";
  };


export const validateGreaterThan = (min: number, msg?: string) =>
  (value: number) =>
    value <= min ? msg ?? `Please specify a value greater than ${min}.` : "";

export const validateEmailFormat = (msg = "Invalid email format") =>
  (value: string) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : msg;
  };

export function validate<T extends object>(
  data: T,
  rules: Partial<Record<keyof T, ((val: any, data: T) => string)[]>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  // loop ทุก field ของ data
  (Object.keys(data) as (keyof T)[]).forEach((key) => {
    const fieldRules = rules[key] ?? []; // ถ้าไม่มี rule → empty array
    const value = data[key];

    // เอา error แรกจาก rule ถ้ามี
    const fieldError = fieldRules
      .map((rule) => rule(value, data))
      .find((msg) => msg !== "") ?? ""; // ถ้าไม่มี error → ""

    errors[key] = fieldError;
  });

  return errors;
}

export function getInputClass(hasError: boolean, baseClass: string = "w-full") {
  return `${baseClass} ${hasError ? "error" : ""}`;
}

export function removeByIndex<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export function handleRangeDateChange<T>(
  value: DateRange,
  setState: React.Dispatch<React.SetStateAction<T>>,
  name?: keyof T
) {
  const startDate = value.startDate
        ? dayjs(value.startDate).tz("Asia/Bangkok").format("YYYY-MM-DD")
        : "";
  const endDate = value.endDate
        ? dayjs(value.endDate).tz("Asia/Bangkok").format("YYYY-MM-DD")
        : ""
  if (name) {
    setState((prev) => ({
      ...prev,
      [name]: {
        start: startDate,
        end: endDate,
      },
    }));
  } else {
    setState({
      start: startDate,
      end: endDate,
    } as T);
  }
}