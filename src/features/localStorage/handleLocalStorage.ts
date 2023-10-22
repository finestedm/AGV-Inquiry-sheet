// handleLocalStorage.ts

import { IFormData } from "../interfaces";

// Function to load data from localStorage
export function loadFormDataFromLocalStorage(currentAppVersion: string): IFormData | null {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData) as IFormData;
            if (currentAppVersion === parsedData.version) {
                return parsedData;
            } else {
                console.log('data from localStorage cannot be loaded as it was made with different app version')
            }
        } catch (error) {
            console.error('Error parsing saved data from localStorage:', error);
        }
    }
    return null;
}

// Function to save data to localStorage
export function saveFormDataToLocalStorage(formData: IFormData) {
    try {
        const dataToSave = JSON.stringify(formData);
        localStorage.setItem('formData', dataToSave);
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}
