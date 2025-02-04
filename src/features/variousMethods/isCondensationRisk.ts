import { criticalElectronicsTemperature } from "../../data/criticalElectronicsTemperature";
import { calculateDewPoint } from "./dewPointCalculation";

export function isCondensationRisk(temperatureRange: number[], humidityRange: number[]) {
    const [minTemperature, maxTemperature] = temperatureRange;
    const [minHumidity, maxHumidity] = humidityRange;

    // Check dew point at the highest humidity level and lowest temperature
    const dewPoint = calculateDewPoint(minTemperature, maxHumidity);

    return maxHumidity > 15 && dewPoint <= criticalElectronicsTemperature;
}