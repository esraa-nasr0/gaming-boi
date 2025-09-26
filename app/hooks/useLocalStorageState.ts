"use client";
import { useState, useEffect } from "react";

export const useLocalStorageState = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const storedValue =window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        }
        catch (error) {
            console.error("Error reading localStorage key “" + key + "”:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        }
        catch (error) {
            console.error("Error setting localStorage key “" + key + "”:", error);
        }
    }, [key, state]);

    return [state, setState] as const;
}
