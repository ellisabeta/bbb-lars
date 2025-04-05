import axios from "axios";
const API_URL = "http://localhost:8080";

interface Table {
    id: string;
    name: string;
    capacity: number;
}

interface TableGroup {
    id?: string;
    name: string;
    tables: Table[];
}

interface Room {
    id?: string; 
    name: string;
    tableGroups: string[]; 
}


export const getTableGroups = async () => {
    try {
        const response = await axios.get(`${API_URL}/table-groups`);
        return response.data;
    } catch (error) {
        console.error("Error fetching table groups:", error);
        return [];
    }
};


export const createTableGroup = async (group: TableGroup) => {
    try {
        const response = await axios.post(`${API_URL}/table-groups`, group);
        return response.data;
    } catch (error) {
        console.error("Error creating table group:", error);
        throw new Error('Failed to create table group');
    }
};

export const deleteTableGroup = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/table-groups/${id}`);
        return response.data; // Gibt die Antwort nach erfolgreichem Löschen zurück
    } catch (error) {
        console.error("Error deleting table group:", error);
        throw new Error('Failed to delete table group');
    }
};

export const updateTableGroup = async (id: string, updatedGroup: TableGroup) => {
    try {
        const response = await axios.put(`${API_URL}/table-groups/${id}`, updatedGroup);
        return response.data; // Gibt die Antwort nach erfolgreichem Update zurück
    } catch (error) {
        console.error("Error updating table group:", error);
        throw new Error('Failed to update table group');
    }
};

export const createTable = async (newTable: Table) => {
    try {
        const response = await axios.post(`${API_URL}/tables`, newTable);
        return response.data; // Gibt die Antwort nach erfolgreichem Erstellen zurück
    } catch (error) {
        console.error("Error creating table:", error);
        throw new Error('Failed to create table');
    }
};

export const getAllTables = async () => {
    try {
        const response = await axios.get(`${API_URL}/tables`);
        return response.data; // Gibt alle Tabellen zurück
    } catch (error) {
        console.error("Error fetching tables:", error);
        return [];
    }
};

export const updateTable = async (id: string, updatedTable: Table) => {
    try {
        const response = await axios.put(`${API_URL}/tables/${id}`, updatedTable);
        return response.data; // Gibt die Antwort nach erfolgreichem Update zurück
    } catch (error) {
        console.error("Error updating table:", error);
        throw new Error('Failed to update table');
    }
};

export const deleteTable = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/tables/${id}`);
        return response.data; // Gibt die Antwort nach erfolgreichem Löschen zurück
    } catch (error) {
        console.error("Error deleting table:", error);
        throw new Error('Failed to delete table');
    }
};



export const createRoom = async (newRoom: Room) => {
    try {
        const response = await axios.post(`${API_URL}/rooms`, newRoom);
        return response.data; // Gibt die Antwort nach erfolgreichem Erstellen zurück
    } catch (error) {
        console.error("Error creating room:", error);
        throw new Error('Failed to create room');
    }
};

export const getAllRooms = async () => {
    try {
        const response = await axios.get(`${API_URL}/rooms`);
        return response.data; // Gibt alle Räume zurück
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return [];
    }
};

export const updateRoom = async (id: string, updatedRoom: Room) => {
    try {
        const response = await axios.put(`${API_URL}/rooms/${id}`, updatedRoom);
        return response.data; // Gibt die Antwort nach erfolgreichem Update zurück
    } catch (error) {
        console.error("Error updating room:", error);
        throw new Error('Failed to update room');
    }
};


export const deleteRoom = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/rooms/${id}`);
        return response.data; // Gibt die Antwort nach erfolgreichem Löschen zurück
    } catch (error) {
        console.error("Error deleting room:", error);
        throw new Error('Failed to delete room');
    }
};
