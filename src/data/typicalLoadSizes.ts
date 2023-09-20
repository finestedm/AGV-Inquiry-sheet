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
        material: 0,
        loadSide: 0,
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
        loadSide: 0,
        secured: false,
    },
    'klt_600x400': {
        label: 'loadTable.loadsToAdd.klt_600x400',
        name: 'KLT 600x400 Box',
        length: 600,
        width: 400,
        height: 0,
        L2: 600,
        W2: 400,
        W3: 0,
        H2: 0,
        H3: 0,
        weightMin: 0,
        weightMax: 0,
        overhang: false,
        material: 1,
        loadSide: 0,
        secured: false,
    },
    'us_standard': {
        label: 'loadTable.loadsToAdd.us_standard',
        name: 'US Standard Pallet',
        length: 1219.2,  // 48 inches converted to mm
        width: 1016,     // 40 inches converted to mm
        height: 0,
        L2: 1219.2,
        W2: 1016,
        W3: 0,
        H2: 0,
        H3: 0,
        weightMin: 0,
        weightMax: 1500,
        overhang: false,
        material: 0,
        loadSide: 0,
        secured: false,
    },
    'half_euro': {
        label: 'loadTable.loadsToAdd.half_euro',
        name: 'Half Euro Pallet',
        length: 800,
        width: 600,
        height: 0,
        L2: 800,
        W2: 600,
        W3: 400,
        H2: 120,
        H3: 100,
        weightMin: 0,
        weightMax: 1000,
        overhang: false,
        material: 1,
        loadSide: 0,
        secured: false,
    },
    'industrial_1200x1000': {
        label: 'loadTable.loadsToAdd.industrial_1200x1000',
        name: 'Industrial Pallet 1200x1000',
        length: 1200,
        width: 1000,
        height: 0,
        L2: 1200,
        W2: 1000,
        W3: 800,
        H2: 150,
        H3: 120,
        weightMin: 0,
        weightMax: 2000,
        overhang: false,
        material: 0,
        loadSide: 0,
        secured: false,
    },
    'industrial_1200x1200': {
        label: 'loadTable.loadsToAdd.industrial_1200x1200',
        name: 'Industrial Pallet 1200x1200',
        length: 1200,
        width: 1200,
        height: 0,
        L2: 1200,
        W2: 1200,
        W3: 1000,
        H2: 150,
        H3: 150,
        weightMin: 0,
        weightMax: 2500,
        overhang: false,
        material: 0,
        loadSide: 0,
        secured: false,
    },
    'gitterbox_1235x835': {
        label: 'loadTable.loadsToAdd.gitterbox_1235x835',
        name: 'Gitterbox 1235x835',
        length: 1235,
        width: 835,
        height: 0,
        L2: 1235,
        W2: 835,
        W3: 0,
        H2: 0,
        H3: 0,
        weightMin: 0,
        weightMax: 1000,
        overhang: false,
        material: 2,
        loadSide: 0,
        secured: false,
    },


}