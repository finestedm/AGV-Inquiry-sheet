import { Task } from "gantt-task-react";

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
    id: number | undefined;
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
    loadSide: 0 | 1;
    secured: boolean;
    capacity?: number;
}

export interface IFlow {
    stationType: number;
    stationSource: number | undefined;
    stationTarget: number | undefined;
    flowAverage: number;
    flowPeak: number;
    loadType: number;
    distance: number;
    bidirectional: boolean;
}

export interface ILoadsTypes {
    [key: string]: ILoad;
}

export interface IEquipment {
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
}

export interface IEquipments {
    gates: IEquipment[];
    walls: IEquipment[];
    docks: IEquipment[];
}

export interface ISystemData {
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
            equipments: IEquipments;
        }
    },
    loads: ILoad[];
    flow: IFlow[];
    additionalRemarks: string;
    // [key: string]: any;
}

export interface ISystems {
    asrs: ISystemData;
    lrkprk: ISystemData;
    agv: ISystemData;
    autovna: ISystemData;
}

export interface IFormData {
    version: string;
    sales: ISales;
    customer: ICustomer;
    project: IProject;
    system: ISystems;
    // [key: string]: string | object
}

export interface IMIlestoneDate {
    start: Date;
    end: Date;
}

export interface IMilestones {
    concept: IMIlestoneDate;
    officialOffer: IMIlestoneDate;
    order: IMIlestoneDate;
    implementation: IMIlestoneDate;
    launch: IMIlestoneDate;
}


export interface ISystem {
    // [key: string]: string;
    url: string;
    alt: keyof ISystems;
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

export type LoadFieldValue = string | number | boolean;

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

export interface CopySystemDataPayload {
    selectedSystem: keyof ISystems;
    selectedParts: { [key in keyof ISystems]: (keyof ISystemData)[] };
}

export interface ExtendedTask extends Task {
    id: keyof IMilestones;
    name: keyof IMilestones
}