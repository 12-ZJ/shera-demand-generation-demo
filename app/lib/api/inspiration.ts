import axios from 'axios';
import { authHeader } from './auth';
import { handleApiError } from './error-handler';
import { InspirationFilterDto, SaveInspirationDto } from '../types';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getInspirationAPI = async (req: InspirationFilterDto) => {
    try {
        const headers = await authHeader();
        const res = await axios.post(`${url}/inspiration/list`, req, { headers });
        return res.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const saveInspirationAPI = async (req: SaveInspirationDto) => {
    try {
        const headers = await authHeader();
        const res = await axios.post(`${url}/inspiration/save`, req, { headers });
        return res.data;
    } catch (error) {
        return handleApiError(error);
    }
}