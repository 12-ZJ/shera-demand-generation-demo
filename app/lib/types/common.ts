import { UserModel } from "./model";

export type ID = {
    id: number
}

export type Option = {
    label: string;
    value: string;
}

export type ApiError = {
    err_code: number;
    err_msg: string;
}

export type RoleFlag = {
    isAdmin: boolean;
}

export type ExportDto = {
    filename: string;
    fileType?: string;
    base64: string;
}

export type UserInfo = Omit<UserModel, "password" | "isActive" | "createdOn" | "createdBy" | "updatedOn" | "updatedBy"> & RoleFlag & {
    exp: number;
    iat: number;
};