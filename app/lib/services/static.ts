"use client"

import { getProductApplicationAPI, getProductGroupAPI } from "../api";
import { StaticDto, StaticFilterDto } from "../types";
import { errorValidation } from "../utils";

export const getProductGroup = async (filter: StaticFilterDto): Promise<StaticDto[]> => {
    const res = await getProductGroupAPI(filter);
    errorValidation(res);

    const data: StaticDto[] = res;
    return data;
}

export const getProductApplication = async (filter: StaticFilterDto): Promise<StaticDto[]> => {
    const res = await getProductApplicationAPI(filter);
    errorValidation(res);

    const data: StaticDto[] = res;
    return data;
}