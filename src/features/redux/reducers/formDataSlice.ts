import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData, ILoad, LoadFieldValue } from '../../interfaces';

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
    loadSide: false,
    secured: false,
};

const initialFormDataState: IFormData = {

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
        },
        it: {
            processesDescription: '',
            existingSystem: {
                present: false,
                name: 0,
                existingOther: ''
            },
            wmsNeeded: false,
            additionalInformation: ''
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
        handleAddLoad: (
            state: IFormData, // Use the correct type for state
            action: PayloadAction<string> // PayloadAction with the system name
        ) => {
            const { payload: systemName } = action; // Get the system name from the payload

            // Create a new load
            const newLoad: ILoad = {
                name: '',
                length: 0,
                width: 0,
                height: 0,
                L2: 0,
                W2: 0,
                W3: 0,
                weightMin: 0,
                weightMax: 0,
                overhang: false,
                material: '',
                loadSide: false,
                secured: false,
            };

            // Determine the appropriate system to update
            const updatedSystemKey = systemName.toLowerCase();
            const updatedSystemLoads = state.system[updatedSystemKey].loads.concat(newLoad);

            // Update the state with the new loads
            return {
                ...state,
                system: {
                    ...state.system,
                    [updatedSystemKey]: {
                        ...state.system[updatedSystemKey],
                        loads: updatedSystemLoads,
                    },
                },
            };
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
            state: IFormData, // Use the correct type for state
            action: PayloadAction<{ index: number; field: keyof ILoad; value: number | string | boolean }>
        ) => {
            const { index, field, value } = action.payload;

            // Create a deep copy of the state using Immer and update the necessary value
            return {
                ...state,
                system: {
                    ...state.system,
                    asrs: {
                        ...state.system.asrs,
                        loads: state.system.asrs.loads.map((load, i) =>
                            i === index ? { ...load, [field]: value } : load
                        ),
                    },
                },
            };
        },


        handleIndustryChange: (state, action) => {
            const { industryName, value } = action.payload;
            state.customer.industryName = [...industryName, value];
        },

        // ... add other reducers here if needed
    },
});

export const { setFormData, handleInputMethod, handleAddLoad, handleSystemChange, handleLoadChange, handleIndustryChange } = formDataSlice.actions;
export default formDataSlice.reducer;