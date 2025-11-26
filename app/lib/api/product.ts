import axios from 'axios';
import { authHeader } from './auth';
import { handleApiError } from './error-handler';
import { StaticFilterDto } from '../types';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProductAPI = async (params: StaticFilterDto) => {
    try {
        const headers = await authHeader();
        const res = await axios.get(`${url}/product`, { params, headers });
        return res.data;
    } catch (error) {
        return handleApiError(error);
    }
}