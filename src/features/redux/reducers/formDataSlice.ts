import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData, ILoadsTypes, IFlow, LoadFieldValue, ISystems, IMilestones, ISystemData, CopySystemDataPayload, IEquipment } from '../../interfaces';
import { Load, loadsToAdd } from '../../../data/typicalLoadSizes';
import { emptyFlow } from '../../../data/flowStations';
import generateRandomId from '../../variousMethods/generateRandomId';
import { format, addMonths, differenceInMonths, isBefore } from 'date-fns';
import dayjs from 'dayjs';

const initialFormDataState: IFormData = {

    version: '231022beta',
    sales: {
        salesUnit: 'S1-PL',
        contactPerson: '',
        contactPersonRole: '',
    },
    customer: {
        name: '',
        sapNumber: null,
        industryName: [],
        industryNameOther: '',
        address: '',
        contactPerson: '',
        contactPersonRole: '',
        contactPersonPhone: '',
        contactPersonMail: '',
        relations: -1,
        salesHistoryValue: undefined,
        ownedForklifts: undefined,
        ownedRacks: undefined,
        ownedOther: '',
        creditManagement: undefined,
        currency: undefined
    },
    project: {
        goals: '',
        supplyChainParts: [],
        tender: false,
        investmentLocation: '',
        investmentType: -1,
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
                name: -1,
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
                    equipment: []
                },
                incline: 0
            },
            loads: [],
            flow: [emptyFlow],
            additionalRemarks: '',
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
                    equipment: []
                },
                incline: 0
            },
            loads: [],
            flow: [emptyFlow],
            additionalRemarks: '',
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
                    equipment: []
                },
                incline: 0
            },
            loads: [],
            flow: [emptyFlow],
            additionalRemarks: '',
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
                    equipment: []
                },
                incline: 0
            },
            loads: [],
            flow: [emptyFlow],
            additionalRemarks: '',
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

        // In your reducer file

        handleDateChanges: (state, action: PayloadAction<IMilestones>) => {
            return {
                ...state,
                project: {
                    ...state.project,
                    milestones: action.payload,
                },
            };
            // ... other cases ...
        },


        // Reducer for handling adding a new load
        handleAddLoad: (
            state: IFormData,
            action: PayloadAction<{ systemName: keyof ISystems; loadType: keyof ILoadsTypes }>
        ) => {
            const { systemName, loadType } = action.payload;
        
            const loadToAdd = loadsToAdd[loadType];
            
            const newLoadInstance = new Load(
                generateRandomId(),
                loadToAdd.label,
                loadToAdd.name,
                loadToAdd.length,
                loadToAdd.width,
                loadToAdd.height,
                loadToAdd.L2,
                loadToAdd.W2,
                loadToAdd.W3,
                loadToAdd.H2,
                loadToAdd.H3,
                loadToAdd.weightMin,
                loadToAdd.weightMax,
                loadToAdd.overhang,
                loadToAdd.material,
                loadToAdd.loadSide,
                loadToAdd.secured,
                loadToAdd.capacity
            );
        
            const updatedSystemLoads = [...state.system[systemName].loads, newLoadInstance];
        
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

        handleDeleteLoad: (state: IFormData, action: PayloadAction<{ updatedLoads: Load[]; selectedSystem: keyof ISystems }>) => {
            const { updatedLoads, selectedSystem } = action.payload;

            state.system[selectedSystem].loads = updatedLoads;
        },

        handleFlowChange: (state: IFormData, action: PayloadAction<{ newRow: IFlow, selectedSystem: keyof ISystems; }>) => {
            const { newRow, selectedSystem } = action.payload;



            // Replace the old load object with the new one at the specified index
            if (typeof (newRow.id) === 'number') {
                state.system[selectedSystem].flow[newRow.id - 1] = newRow;
            }
        },

        handleDeleteFlow: (state: IFormData, action: PayloadAction<{ updatedFlows: IFlow[]; selectedSystem: keyof ISystems }>) => {
            const { updatedFlows, selectedSystem } = action.payload;
            state.system[selectedSystem].flow = updatedFlows;
        },

        handleIndustryChange: (state, action) => {
            const { industryName, value } = action.payload;
            state.customer.industryName = [...industryName, value];
        },

        handleCopySystemData: (state, action: PayloadAction<CopySystemDataPayload>) => {


            const { selectedSystem, selectedParts } = action.payload;
            // Iterate over selected parts for the selected system
            Object.keys(state.system).forEach((otherSystemKey) => {
                const otherSystem = otherSystemKey as keyof ISystems;

                // Check if the current system is not the selected system
                if (otherSystem !== selectedSystem) {
                    // Iterate over selected parts in the current system
                    selectedParts[otherSystem].forEach((part) => {
                        if (part === 'loads') {
                            if (Array.isArray(state.system[otherSystem][part])) {
                                state.system[selectedSystem][part] = state.system[otherSystem][part].map(load => ({ ...load }));
                            }
                        } else if (part === 'flow') {
                            if (Array.isArray(state.system[otherSystem][part])) {
                                state.system[selectedSystem][part] = state.system[otherSystem][part].map(flow => ({ ...flow }));
                            }
                        } else if (part === 'additionalRemarks') {
                            state.system[selectedSystem][part] = state.system[otherSystem][part];
                        } else {

                            // Copy data from other systems to the selected system based on the selected part
                            state.system[selectedSystem][part] = {
                                //i don't have time for this shit... ignore these    
                                // @ts-ignore
                                ...state.system[selectedSystem][part],
                                // @ts-ignore
                                ...state.system[otherSystem][part], // Add type assertion here
                            };
                        }
                    });
                }
            });
        },

        updateEquipment: (state: IFormData, action: PayloadAction<{ updatedEquipment: IEquipment[]; selectedSystem: keyof ISystems }>) => {
            const { updatedEquipment, selectedSystem } = action.payload;

            // Update the equipment in the selected system
            state.system[selectedSystem].building.existingBuilding.equipment = updatedEquipment;
        },


        // ... add other reducers here if needed
    },
});

export const { setFormData, handleInputMethod, handleAddLoad, handleSystemChange, handleLoadChange, handleIndustryChange, handleDeleteLoad, handleAddFlow, handleDeleteFlow, handleFlowChange, resetFormData, handleDateChanges, handleCopySystemData, updateEquipment } = formDataSlice.actions;
export default formDataSlice.reducer;
export { initialFormDataState }