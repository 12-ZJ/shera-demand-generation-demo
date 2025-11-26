import { InspirationModel, InspirationProductModel } from './model';
export type StaticFilterDto = {
    id?: string;
    status?: number;
}

export type StaticDto = {
    id: string;
    name: string;
    isActive: boolean;
}

export type InspirationFilterDto = {
    id?: number;
    keyword?: string;
    status?: number;
    productId?: number;
    productGroupId?: string;
    productApplicationId?: string;
}

export type InspirationExtended = InspirationModel & {
    base64: string;
}

export type InspirationProductExtended = InspirationProductModel & {
    productCode: string;
    productName: string;
    productSize: string;
    productWeight: string;
    productGroupName: string;
    productApplicationName: string;
}

export type InspirationDto = InspirationExtended & {
    inspirationProduct: InspirationProductExtended[]
}

export type SaveInspirationDto = {
    inspiration: InspirationExtended;
    inspirationProduct: InspirationProductModel[];
}