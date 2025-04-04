import axios from "axios";

const API_URL = "http://localhost:8080";

export const getTableGroups = async () => {

    try {
        const response = await axios.get(`${API_URL}/table-groups`);
        return response.data;
    } catch (error) {
        console.error("Error fetching table groups:", error);
        return [];
    }
};
