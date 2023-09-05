export interface ISales {
    salesUnit: string;
    contactPerson: string;
    contactPersonRole: string;
}

export interface IIt {
    processesDescription: string;
    existingSystem: {
        present: boolean;
        name: number;
        existingOther: string;
    };
    wmsNeeded: boolean;
    additionalInformation: string;
}

export interface ICustomer {
    name: string;
    sapNumber: number | null;
    industryName: string[];
    address: string;
    contactPerson: string;
    contactPersonRole: string;
    contactPersonPhone: string;
    contactPersonMail: string;
    relations: string;
    salesHistoryValue: number | undefined;
    ownedForklifts: number | undefined;
    ownedRacks: number | undefined;
    ownedOther: string;
    creditManagement: number | undefined;
}

export interface IProject {
    goals: string;
    supplyChainParts: string[];
    tender: boolean;
    investmentLocation: string;
    investmentType: string;
    consultingCompany: boolean;
    competitor: boolean;
    milestones: IMilestones;
    it: IIt;
}

export interface ILoad {
    label: string;
    name: string;
    length: number;
    width: number;
    height: number;
    L2: number;
    W2: number;
    W3: number;
    H2: number;
    H3: number;
    weightMin: number;
    weightMax: number;
    overhang: boolean;
    material: number;
    loadSide: boolean;
    secured: boolean;
}

export interface IStation {
    stationType: string;
    stationSource: string;
    stationTarger: string;
    flowAverage: number;
    flowPeak: number;
    loadType: number;
    workTime: number;
}

export interface ILoadsTypes {
    [key: string]: ILoad;
}

export interface Iasrs {
    selected: boolean;
    workTime: {
        workDays: number;
        shiftsPerDay: number;
        hoursPerShift: number;
    }
    workConditions: {
        temperature: number[];
        humidity: number[];
        freezer: boolean;
        EX: boolean;
        dangerousMaterials: boolean;
        other: string;
    },
    building: {
        new: boolean;
        silo: boolean;
        existingBuilding: {
            height: number;
            width: number;
            length: number;
        }
    },
    loads: ILoad[];
    flow: IStation[]
}

export interface ISystems {
    asrs: Iasrs;
    lrkprk: Iasrs;
    agv: Iasrs;
    autovna: Iasrs;
    [key: string]: Iasrs; 
}

export interface IFormData {
    version: string;
    sales: ISales;
    customer: ICustomer;
    project: IProject;
    system: ISystems;
    [key: string]: string | object
}

export interface IMilestones {
    concept: Date;
    officialOffer: Date;
    order: Date;
    implementationStart: Date;
    launch: Date;
    [key: string]: Date; // Index signature
}


export interface ISystem {
    [key: string]: string;
    url: string;
    alt: string;
    label: string;
    labelShort: string;
    description: string;
}

export interface IHandleInputMethod {
    (path: string, value: any): void;
}
export interface IHandleLoadChange {
    (index: number, field: keyof ILoad, value: string | number | boolean): void;
}

export type LoadFieldValue = string | number | boolean ;

export interface IHandleAddLoad {
    (): void;
}

export interface ICustomFieldProps {
    fieldName: string;
    required?: boolean;
    multiline?: boolean
    rows?: number;
    fullWidth?: boolean;
    disabled?: boolean;
  }
  