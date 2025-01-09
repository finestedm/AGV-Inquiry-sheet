import { allPossibleSteps } from "../redux/reducers/stepsSlice";

export function findDifferences(past: any, current: any): any {
    const differences: any = {};

    Object.keys({ ...past, ...current }).forEach((key) => {
        if (typeof past[key] === 'object' && typeof current[key] === 'object' && past[key] && current[key]) {
            const nestedDiff = findDifferences(past[key], current[key]);
            if (Object.keys(nestedDiff).length > 0) {
                differences[key] = nestedDiff;
            }
        } else if (past[key] !== current[key]) {
            differences[key] = true; // Simplify to mark as changed
        }
    });

    return differences;
}

export function getChangedKeys(differences: any, parentKey = ''): string[] {
    return Object.entries(differences).flatMap(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (value === true) {
            // Base case: A changed key
            return fullKey;
        } else if (typeof value === 'object') {
            // Recursive case: Dive deeper
            return getChangedKeys(value, fullKey);
        }

        return [];
    });
}

export function mapPathToStep(changedPath: string) {
    for (const step of allPossibleSteps) {
        if (changedPath.startsWith(step) || changedPath.startsWith(`system.${step}`)) {
            // Handle special cases for 'system.asrs', 'system.agv', etc.
            return ['agv', 'asrs', 'lrkprk', 'autovna'].includes(changedPath.split('.')[1]) ? changedPath.split('.')[1] : step;
        }
    }
    return null; // Return null if no matching step is found
}