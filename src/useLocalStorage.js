import { useState, useEffect } from 'react';

export const readLocalStorageData = (key) => {
    const value = localStorage.getItem(key);
    console.log("useLocalStorage: readData() value = " + value);
    var savedData = value != null ? JSON.parse(value) : null;
    return savedData;
};

export const writeLocalStorageData = (key, data) => {
    if (data) {
        const value = JSON.stringify(data);
        console.log("useLocalStorage: writeData() value = " + value);
        localStorage.setItem(key, value);
    }
};

// Custom hook to store data locally.
export default function useLocalStorage(key) {
    const [data, setData] = useState(readLocalStorageData(key));
    useEffect(() => { writeLocalStorageData(key, data); }, [key, data]);

    return ([data, setData]);
};
