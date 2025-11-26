"use client"

import { getInspirationAPI, saveInspirationAPI } from "../api";
import { InspirationDto, InspirationFilterDto, SaveInspirationDto } from "../types";
import { errorValidation } from "../utils";

export const getInspiration = async (filter: InspirationFilterDto): Promise<InspirationDto[]> => {
    const res = await getInspirationAPI(filter);
    errorValidation(res);

    const data: InspirationDto[] = res;
    return data;
}

export const getInspirationDetail = async (filter: InspirationFilterDto): Promise<InspirationDto> => {
    const res = await getInspirationAPI(filter);
    errorValidation(res);

    const data: InspirationDto = res;
    return data;
}


export const saveInspiration = async (req: SaveInspirationDto) => {
    const res = await saveInspirationAPI(req);
    errorValidation(res);

    const data = res;
    return data;
}