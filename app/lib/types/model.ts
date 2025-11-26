export type UserModel = {
    id: number;
    code: string;
    fullname: string;
    email: string;
    password?: string;
    isActive?: boolean;
    createdOn?: string;
    createdBy?: number;
    updatedOn?: string;
    updatedBy?: number
}

export type InspirationModel = {
    id: number;
    inspirationNo: string;
    filename: string;
    detail: string;
    isActive: boolean;
}

export type ProductModel = {
    id: number;
    code: string;
    name: string;
    size: string;
    weight: number;
}

export type InspirationProductModel = {
    id: number;
    inspirationId: number;
    productId: number;
    productGroupId: string;
    productApplicationId: string;
    posX: string;
    posY: string;
}