export function calculateDewPoint(temperatureCelsius: number, humidity: number): number {
    const a = 17.625;
    const b = 243.04;

    const gamma = (a * temperatureCelsius) / (b + temperatureCelsius) + Math.log(humidity / 100);
    const dewPointCelsius = (b * gamma) / (a - gamma);

    return dewPointCelsius;
}
