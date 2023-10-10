import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData, ILoad, ILoadsTypes, IFlow, LoadFieldValue, ISystems } from '../../interfaces';
import { loadsToAdd } from '../../../data/typicalLoadSizes';
import { emptyFlow } from '../../../data/flowStations';
import generateRandomId from '../../variousMethods/generateRandomId';

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
                const startDate = new Date();
                const endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 1);
                return { start: startDate, end: endDate };
            })(),
            officialOffer: (() => {
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() + 1);
                const endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 3);
                return { start: startDate, end: endDate };
            })(),
            order: {
                start: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()),
                end: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate())
            },
            implementation: {
                start: new Date(new Date().getFullYear(), new Date().getMonth() + 12, new Date().getDate()),
                end: new Date(new Date().getFullYear(), new Date().getMonth() + 18, new Date().getDate())
            },
            launch: {
                start: new Date(new Date().getFullYear(), new Date().getMonth() + 18, new Date().getDate()),
                end: new Date(new Date().getFullYear(), new Date().getMonth() + 18, new Date().getDate())
            },
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
            loads: [],
            flow: [emptyFlow]
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
            loads: [],
            flow: [emptyFlow]

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
            loads: [],
            flow: [emptyFlow]

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
            loads: [],
            flow: [emptyFlow]

        }
    },
}

const formDataSlice = createSlice({
    name: 'formData',
    initialState: initialFormDataState,
    reducers: {
        setFormData: (state: any, action: { payload: IFormData; }) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => {
            return initialFormDataState;
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
            state: IFormData,
            action: PayloadAction<{ systemName: keyof ISystems; loadType: string }>
        ) => {
            const { systemName, loadType } = action.payload;

            let newLoad: ILoad = loadsToAdd[loadType];
            newLoad = { ...newLoad, id: generateRandomId() }

            const updatedSystemLoads = state.system[systemName].loads.concat(newLoad);

            return {
                ...state,
                system: {
                    ...state.system,
                    [systemName]: {
                        ...state.system[systemName],
                        loads: updatedSystemLoads,
                    },
                },
            };
        },

        handleAddFlow: (state: IFormData, action: PayloadAction<{ systemName: keyof ISystems; }>) => {
            const { systemName } = action.payload;

            const updatedSystemStations = state.system[systemName].flow.concat(emptyFlow);

            return {
                ...state,
                system: {
                    ...state.system,
                    [systemName]: {
                        ...state.system[systemName],
                        flow: updatedSystemStations,
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

        handleLoadChange: (state: IFormData, action: PayloadAction<{ newRow: any, selectedSystem: keyof ISystems; }>) => {

            const { newRow, selectedSystem } = action.payload;

            const loadIndex = state.system[selectedSystem].loads.findIndex((load) => load.id === newRow.id);
            if (loadIndex !== -1) {
                // If a matching load is found, replace it with the new row
                state.system[selectedSystem].loads[loadIndex] = newRow;
            }
        },

        handleDeleteLoad: (state: IFormData, action: PayloadAction<{ updatedLoads: ILoad[]; selectedSystem: keyof ISystems }>) => {
            const { updatedLoads, selectedSystem } = action.payload;

            state.system[selectedSystem].loads = updatedLoads;
        },

        handleFlowChange: (state: IFormData, action: PayloadAction<{ newRow: any, selectedSystem: keyof ISystems; }>) => {
            const { newRow, selectedSystem } = action.payload;

            // Replace the old load object with the new one at the specified index
            state.system[selectedSystem].flow[newRow.id - 1] = newRow;
        },

        handleDeleteFlow: (state: IFormData, action: PayloadAction<{ updatedFlows: IFlow[]; selectedSystem: keyof ISystems }>) => {
            const { updatedFlows, selectedSystem } = action.payload;
            state.system[selectedSystem].flow = updatedFlows;
        },

        handleIndustryChange: (state, action) => {
            const { industryName, value } = action.payload;
            state.customer.industryName = [...industryName, value];
        },

        // ... add other reducers here if needed
    },
});

export const { setFormData, handleInputMethod, handleAddLoad, handleSystemChange, handleLoadChange, handleIndustryChange, handleDeleteLoad, handleAddFlow, handleDeleteFlow, handleFlowChange, resetFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
export { initialFormDataState }