"use client"

import { getProductAPI } from "../api";
import { ProductModel, StaticFilterDto } from "../types";
import { errorValidation } from "../utils";

export const getProduct = async (filter: StaticFilterDto): Promise<ProductModel[]> => {
    const res = await getProductAPI(filter);
    errorValidation(res);

    const data: ProductModel[] = res;
    return data;
}