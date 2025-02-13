import { TAvailableLanguages } from "../features/interfaces"

const salesUnits = ['S1-PL', 'S1-DE', 'S3-ES']

type TSaleUnitLanguage = Record<typeof salesUnits[number], TAvailableLanguages>

export const salesUnitLanguage: TSaleUnitLanguage  = {
    'S1-PL': 'pl', 
    'S1-DE': 'de',
    'S3-ES': 'es'
}

export default salesUnits
