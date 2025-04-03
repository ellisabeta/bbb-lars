import React, { useEffect, useState } from "react";
import { getTableGroups } from "./services/api";


export interface Table {
    id: string;
    isAvailable: boolean;
}

export interface TableGroup {
    id: string;
    name: string;
    tables: Table[];
}

const TableGroups: React.FC = () => {
    const [tableGroups, setTableGroups] = useState<TableGroup[]>([]);

    useEffect(() => {
        getTableGroups().then((data) => {
            setTableGroups(data);
        });
    }, []);

    return (
        <div>
            <h2>Table Groups</h2>
            {tableGroups.map((group) => (
                <div key={group.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                    <h3>{group.name}</h3>
                    <ul>
                        {group.tables.map((table) => (
                            <li key={table.id}>
                                Table ID: {table.id} - Available: {table.isAvailable ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TableGroups;
