import { ILoadsTypes } from "../features/interfaces";

export const loadsToAdd: ILoadsTypes = {
    'euro': {
        label: 'loadTable.loadsToAdd.euro',
        name: 'Europallet',
        length: 1200,
        width: 800,
        height: 0,
        L2: 1200,
        W2: 800,
        W3: 600,
        H2: 144,
        H3: 100,
        weightMin: 0,
        weightMax: 1500,
        overhang: false,
        material: -1,
        loadSide: false,
        secured: false,
    },
    empty: {
        label: 'loadTable.loadsToAdd.empty',
        name: "",
        length: 0,
        width: 0,
        height: 0,
        L2: 0,
        W2: 0,
        W3: 0,
        H2: 0,
        H3: 0,
        weightMin: 0,
        weightMax: 0,
        overhang: false,
        material: -1,
        loadSide: false,
        secured: false,
    },
}