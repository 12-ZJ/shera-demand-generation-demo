import axios from 'axios';
import { authHeader } from './auth';
import { handleApiError } from './error-handler';
import { StaticFilterDto } from '../types';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProductGroupAPI = async (params: StaticFilterDto) => {
    try {
        const headers = await authHeader();
        const res = await axios.get(`${url}/product-group`, { params, headers });
        return res.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const getProductApplicationAPI = async (params: StaticFilterDto) => {
    try {
        const headers = await authHeader();
        const res = await axios.get(`${url}/product-application`, { params, headers });
        return res.data;
    } catch (error) {
        return handleApiError(error);
    }
}