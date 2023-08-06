import { Dispatch, SetStateAction } from "react";

export interface ISales {
    salesUnit: string;
    contactPerson: string;
    contactPersonRole: string;
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
    milestones: IMilestones
}

export interface ILoad {
    name: string;
    length: number;
    width: number;
    height: number;
    L2: number;
    W2: number;
    W3: number;
    weightMin: number;
    weightMax: number;
    overhang: boolean;
    material: string;
    loadSide: string;
    secured: boolean;
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
    loads: ILoad[]
}

export interface ISystem {
    asrs: Iasrs;
    lrkprk: Iasrs;
    agv: Iasrs;
    autovna: Iasrs;
    [key: string]: Iasrs; // Add an index signature
}

export interface IFormData {
    version: string;
    sales: ISales;
    customer: ICustomer;
    project: IProject;
    system: ISystem;

}

export interface IMilestones {
    concept: Date;
    officialOffer: Date;
    order: Date;
    implementationStart: Date;
    launch: Date;
    [key: string]: Date; // Index signature
}

export interface IFormProps {
    formData: IFormData;
    setFormData: Dispatch<SetStateAction<IFormData>>;
}


export interface IHandleInputMethod {
    (path: string, value: any): void;
}
export interface IHandleLoadChange {
    (index: number, field: keyof ILoad, value: string | number | boolean): void;
}

export type LoadFieldValue = string | number | boolean | { min: number; max: number };

export interface IHandleAddLoad {
    (): void;
}