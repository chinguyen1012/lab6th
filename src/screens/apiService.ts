import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Thay đổi URL này thành URL của API của bạn

export const createService = async (serviceData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/spa/create`, serviceData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteService = async (id: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/spa/delete/${id}`);
    } catch (error) {
        throw error;
    }
};

export const updateService = async (id: string, serviceData: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/spa/update/${id}`, serviceData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

