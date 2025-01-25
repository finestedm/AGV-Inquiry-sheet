import { SvgIconTypeMap, TextFieldProps } from "@mui/material";
import { Task } from "gantt-task-react";
import availableEquipment from "../data/availableEquipment";
import salesEngineersSorted from "../data/salesEngineers";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { TGuidanceType } from "../data/guidanceType";
import { TForklift } from "../data/forklifts";
import floorTypes from "../data/floorTypes";
import rackAccessories, { TRackAccessory } from "../data/rackAccessories";

export interface ISales {
    salesUnit: string;
    contactPerson: string;
    contactPersonRole: string;
    OPNumber: string;
    salesEngineer: typeof salesEngineersSorted | null
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
    zHeight: number;
    rotation: number;
    type: TEquipmentType | string;
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

export type TRackConfig = 
    {
        id: number;
        quantity: number;
        depth: number;
        load: number;
        bays: (TBay['id'])[];
    }

export type TBay = {
    id: number;
    quantity: number;
    width: number;
    config: TLevelsConfig['id'];
}

export type TLevelsConfig = { id: number; levels: TLevelsDetails[] };

export type TLevelsDetails = {id: number, height: number, accessory: string}

export interface IRacksData {
    selected: boolean;
    workConditions: {
        temperature: number[];
        freezer: boolean;
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
            columnX: number;
            columnY: number;
            columnGridX: number;
            columnGridY: number;
        },
        incline: number;
        layout: boolean;
    },
    loads: ILoad[];
    flow: IFlow[];
    rackConfigs: TRackConfig[];
    levelConfigs: TLevelsConfig[];
    accessories: {[key in keyof typeof rackAccessories]: (TRackAccessory['shortName'] | undefined)};
    guidance: TGuidanceType['shortName'] | undefined;
    forklift: TForklift['shortName'],
    floor: typeof floorTypes[number] | '',
    additionalRemarks: string;
    // [key: string]: any;
}

export interface ISystems {
    asrs: ISystemData;
    lrkprk: ISystemData;
    agv: ISystemData;
    autovna: ISystemData;
    mpb: IRacksData;
    mobile: IRacksData
}

export interface IMedia {
    images: { base64: string; name: string }[];
}

export interface IFormData {
    version: string;
    sales: ISales;
    customer: ICustomer;
    project: IProject;
    system: ISystems;
    media: IMedia;
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
    label?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
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