import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

class ApiService {
    private api: AxiosInstance;
    constructor(){
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        this.api.interceptors.request.use(request => {
        console.log('Starting Request:', request.method, request.url);
        return request;
    });
    

    this.api.interceptors.response.use(
        response => {
            console.log('Response:', response.status, response.config.url);
            return response;
        },
        error => {
            console.error('Response Error:', error.config?.url, error.message);
            return Promise.reject(error);
        }
    );


    }
    

    async get <T>(endpoint: string, params = {}): Promise<T>{
        try {
            const response = await this.api.get<T>(endpoint, {params});
            return response.data
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }
    
    async post<T, D>(endpoint: string, data: D): Promise<T>{
        try{
            const response = await this.api.post<T>(endpoint, data);
            return response.data
        }catch (error){
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async patch<T, D = unknown>(endpoint: string, data: D): Promise<T>{
        try{
            const response = await this.api.patch<T, AxiosResponse<T>, D>(endpoint, data);
            return response.data
        }catch (error){
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async delete<T, D = unknown>(endpoint: string, config?: { data?: D; params?: D }): Promise<T>{
        try{
            const response = await this.api.delete<T>(endpoint, config);
            return response.data
        }catch (error){
            this.handleError(error as AxiosError);
            throw error;
        }
    }
    
    handleError(error: AxiosError){
        console.error('Erro na API', error.response?.data || error.message);
        throw error;
    }
}

export const apiService = new ApiService();