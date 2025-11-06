import axios from 'axios';
import type { AdminLoginDto, CreateNewsDto, UpdateNewsDto, NewsDto, NewsListItemDto, PagedResultDto } from '../types';

const API_BASE_URL = 'https://localhost:7173';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const adminApi = {
    login: async (credentials: AdminLoginDto): Promise<{ token: string }> => {
        const response = await api.post('/admin', credentials);
        return response.data;
    },
};

export const newsApi = {
    create: async (news: CreateNewsDto): Promise<NewsDto> => {
        const response = await api.post('/news', news);
        return response.data;
    },

    update: async (id: number, news: UpdateNewsDto): Promise<NewsDto> => {
        const response = await api.put(`/news/${id}`, news);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/news/${id}`);
    },

    getById: async (id: number): Promise<NewsDto> => {
        const response = await api.get(`/news/${id}`);
        return response.data;
    },

    getLatest: async (count: number = 5): Promise<NewsListItemDto[]> => {
        const response = await api.get(`/news/latest?count=${count}`);
        return response.data;
    },

    getAll: async (page: number = 1, pageSize: number = 10): Promise<PagedResultDto<NewsListItemDto>> => {
        const response = await api.get(`/news?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },
};