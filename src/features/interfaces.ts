import { TextFieldProps } from "@mui/material";
import { Task } from "gantt-task-react";
import availableEquipment from "../data/availableEquipment";

export interface ISales {
    salesUnit: string;
    contactPerson: string;
    contactPersonRole: string;
    OPNumber: string;
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

export type TIndustry = 'production' | 'trade' | 'logistics' | 'pharmaceutical' | 'beverage' | 'clothing' | 'chemical' | 'food' | 'automotive' | 'other'

export interface ICustomer {
    name: string;
    sapNumber: number | null;
    industryName: TIndustry[];
    industryNameOther: string;
    address: string;
    contactPerson: string;
    contactPersonRole: string;
    contactPersonPhone: string;
    contactPersonMail: string;
    relations: number;
    salesHistoryValue: number | undefined;
    ownedForklifts: number | undefined;
    ownedRacks: number | undefined;
    ownedOther: string;
    creditManagement: number | undefined;
    currency: TCurrencies | undefined
}

export interface IProject {
    goals: string;
    supplyChainParts: number[];
    tender: boolean;
    investmentType: number;
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
    id: number | undefined;
    stationType: number;
    stationSource: number | undefined;
    stationTarget: number | undefined;
    flowAverage: number;
    flowPeak: number;
    loadType: number[];
    distance: number;
    bidirectional: boolean;
}

export interface ILoadsTypes {
    [key: string]: ILoad;
}

export type TEquipmentType = typeof availableEquipment[number];

export interface IEquipment {
    id: number;
    x: number;
    width: number;
    y: number;
    height: number;
    rotation: number;
    type: TEquipmentType;
    color: string;
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
            equipment: IEquipment[];
        },
        incline: number;
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
}

export interface IMilestoneDate {
    start: Date;
    end: Date;
}

export interface IMilestones {
    concept: IMilestoneDate;
    officialOffer: IMilestoneDate;
    order: IMilestoneDate;
    implementation: IMilestoneDate;
    launch: IMilestoneDate;
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
    type?: 'text' | 'number'
    fieldName: string;
    required?: boolean;
    multiline?: boolean
    rows?: number;
    fullWidth?: boolean;
    disabled?: boolean;
    size?: TextFieldProps['size']
}

export interface CopySystemDataPayload {
    selectedSystem: keyof ISystems;
    selectedParts: { [key in keyof ISystems]: (keyof ISystemData)[] };
}

export interface ExtendedTask extends Task {
    id: keyof IMilestones;
    name: keyof IMilestones
}

export type TPart = keyof ISystemData | keyof ICustomer | keyof ISales | keyof IProject;

export type StepToDataType<TStep extends keyof IFormData> = TStep extends 'sales'
    ? ISales
    : TStep extends 'customer'
    ? ICustomer
    : TStep extends 'project'
    ? IProject
    : TStep extends 'system'
    ? ISystems
    : never;

export type TCurrencies = { currency: string, countries: string[] }[]

export type TViewMode = 'Week' | 'Month' | 'Year'