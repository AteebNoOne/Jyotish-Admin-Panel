import axios, { AxiosResponse } from "axios";

export const BASE_URL: string = "https://api.jyotiish.com";
export const API_URL: string = "https://api.jyotiish.com/admin-pannel";
const token = null;

const generateHeaders = () => {
    const headers: { [key: string]: string } = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};



export const getAllAstrologers = async () => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/astrologer-profile/`, {
            headers: generateHeaders()
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching astrologers:", error);
        throw error; 
    }
};


export const getAstrologerById = async (id: number) => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/astrologer-profile/${id}/`, {
            headers: generateHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching astrologer by ID:", error);
        throw error; 
    }
};


export const createAstrologer = async (astrologerData: Record<string, any>) => {
    try {
        const formData = new FormData();

        for (const key in astrologerData) {
            if (astrologerData.hasOwnProperty(key)) {
                formData.append(key, astrologerData[key]);
            }
        }

        const response: AxiosResponse = await axios.post(`${API_URL}/astrologer-profile/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error creating astrologer:", error);
        throw error; 
    }
};



export const updateAstrologer = async (id: string, astrologerData: any) => {
    try {
        const response: AxiosResponse = await axios.put(`${API_URL}/astrologer-profile/${id}`, astrologerData, {
            headers: generateHeaders()
        });
        return response.data.data;
    } catch (error) {
        console.error("Error updating astrologer:", error);
        throw error; 
    }
};


export const deleteAstrologer = async (id: number) => {
    try {
        const response: AxiosResponse = await axios.delete(`${API_URL}/astrologer-profile/${id}/`, {
            headers: generateHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting astrologer:", error);
        throw error; 
    }
};
