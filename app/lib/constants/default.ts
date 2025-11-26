import { InspirationDto, InspirationExtended, InspirationFilterDto } from "../types";

export const defaultInspirationFilter: InspirationFilterDto = {
    keyword: "",
    status: 1
}

export const defaultInspiration: InspirationExtended = {
    id: 0,
    inspirationNo: "",
    filename: "",
    base64: "",
    detail: "",
    isActive: true,
}