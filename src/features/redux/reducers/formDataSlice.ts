import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoad, LoadFieldValue } from '../../interfaces';

const initialLoad: ILoad = {
    name: "",
    length: 0,
    width: 0,
    height: 0,
    L2: 0,
    W2: 0,
    W3: 0,
    weightMin: 0,
    weightMax: 0,
    overhang: false,
    material: "",
    loadSide: "",
    secured: false,
};

const initialFormDataState = {

    version: '230719beta',
    sales: {
        salesUnit: 'S1-PL',
        contactPerson: '',
        contactPersonRole: '',
    },
    customer: {
        name: '',
        sapNumber: null,
        industryName: [],
        address: '',
        contactPerson: '',
        contactPersonRole: '',
        contactPersonPhone: '',
        contactPersonMail: '',
        relations: '',
        salesHistoryValue: undefined,
        ownedForklifts: undefined,
        ownedRacks: undefined,
        ownedOther: '',
        creditManagement: undefined,
    },
    project: {
        goals: '',
        supplyChainParts: [],
        tender: false,
        investmentLocation: '',
        investmentType: '',
        consultingCompany: false,
        competitor: false,
        milestones: {
            concept: (() => {
                const currentDate = new Date();
                const threeMonthsLater = new Date(currentDate);
                threeMonthsLater.setMonth(currentDate.getMonth() + 1);
                return threeMonthsLater;
            })(),
            officialOffer: (() => {
                const currentDate = new Date();
                const threeMonthsLater = new Date(currentDate);
                threeMonthsLater.setMonth(currentDate.getMonth() + 3);
                return threeMonthsLater;
            })(),
            order: new Date(),
            implementationStart: new Date(),
            launch: new Date(),
        }
    },
    system: {
        asrs: {
            selected: true,
            workTime: {
                workDays: 0,
                shiftsPerDay: 0,
                hoursPerShift: 0,
            },
            workConditions: {
                temperature: [20, 30],
                humidity: [0, 5],
                freezer: false,
                EX: false,
                dangerousMaterials: false,
                other: '',
            },
            building: {
                new: false,
                silo: false,
                existingBuilding: {
                    height: 0,
                    width: 0,
                    length: 0,
                }
            },
            loads: [initialLoad]
        },
        lrkprk: {
            selected: false,
            workTime: {
                workDays: 0,
                shiftsPerDay: 0,
                hoursPerShift: 0,
            },
            workConditions: {
                temperature: [20, 30],
                humidity: [0, 5],
                freezer: false,
                EX: false,
                dangerousMaterials: false,
                other: '',
            },
            building: {
                new: false,
                silo: false,
                existingBuilding: {
                    height: 0,
                    width: 0,
                    length: 0,
                }
            },
            loads: [initialLoad]
        },
        agv: {
            selected: false,
            workTime: {
                workDays: 0,
                shiftsPerDay: 0,
                hoursPerShift: 0,
            },
            workConditions: {
                temperature: [20, 30],
                humidity: [0, 5],
                freezer: false,
                EX: false,
                dangerousMaterials: false,
                other: '',
            },
            building: {
                new: false,
                silo: false,
                existingBuilding: {
                    height: 0,
                    width: 0,
                    length: 0,
                }
            },
            loads: [initialLoad]
        },
        autovna: {
            selected: false,
            workTime: {
                workDays: 0,
                shiftsPerDay: 0,
                hoursPerShift: 0,
            },
            workConditions: {
                temperature: [20, 30],
                humidity: [0, 5],
                freezer: false,
                EX: false,
                dangerousMaterials: false,
                other: '',
            },
            building: {
                new: false,
                silo: false,
                existingBuilding: {
                    height: 0,
                    width: 0,
                    length: 0,
                }
            },
            loads: [initialLoad]
        }
    },
}



const formDataSlice = createSlice({
    name: 'formData',
    initialState: initialFormDataState,
    reducers: {
        setFormData: (state: any, action: { payload: any; }) => {
            return { ...state, ...action.payload };
        },
        handleInputMethod: (state: any, action: PayloadAction<{ path: string; value: any }>) => {
            const { path, value } = action.payload;
            const keys = path.split('.');
            let currentObject: any = state;

            for (let i = 0; i < keys.length - 1; i++) {
                if (currentObject[keys[i]] === undefined) {
                    currentObject[keys[i]] = {};
                }
                currentObject = currentObject[keys[i]];
            }

            currentObject[keys[keys.length - 1]] = value;
        },

        // Reducer for handling adding a new load
        handleAddLoad: (state: { system: { asrs: { loads: any[]; }; }; }) => {
            const newLoad: ILoad = {
                name: "",
                length: 0,
                width: 0,
                height: 0,
                L2: 0,
                W2: 0,
                W3: 0,
                weightMin: 0,
                weightMax: 0,
                overhang: false,
                material: "",
                loadSide: "",
                secured: false,
            };

            const newLoads = [...state.system.asrs.loads, newLoad];
            state.system.asrs.loads = newLoads;
        },

        handleSystemChange: (state: { system: { [x: string]: any; }; }, action: PayloadAction<string>) => {
            const alt = action.payload.toLowerCase();
            const system = state.system[alt];
            if (system) {
                state.system[alt] = {
                    ...system,
                    selected: !system.selected,
                };
            }
        },

        handleLoadChange: (
            state: typeof initialFormDataState, // Specify the type of your state
            action: PayloadAction<{ index: number; field: keyof ILoad; value: LoadFieldValue }>
        ) => {
            const { index, field, value } = action.payload;
            const newFormData = { ...state };
            newFormData.system.asrs.loads[index][field] = value as never;
            return newFormData;
        },

        // ... add other reducers here if needed
    },
});

export const { setFormData, handleInputMethod, handleAddLoad, handleSystemChange, handleLoadChange} = formDataSlice.actions;
export default formDataSlice.reducer;