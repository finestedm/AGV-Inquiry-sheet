import { DataGrid, GridRowSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";
import { ISystems } from "../../../../../features/interfaces";
import { customGreyPalette, customGreyPaletteDark } from "../../../../../theme";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/redux/store";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { handleAddNewRack, handleRackConfigsChange } from "../../../../../features/redux/reducers/formDataSlice";
import { useDispatch } from "react-redux";
import bays, { TBayTypes } from "../../../../../data/availableBays";
import uprightSizes from "../../../../../data/uprightsSizes";

export default function RowsConfigsTable({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const formData = useSelector((state: RootState) => state.formData)
    const rackConfigs = formData.system[selectedSystem].rackConfigs
    const levelConfigs = formData.system[selectedSystem].levelConfigs

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const rows = rackConfigs
    const fieldSets = [
        ['numberOfBays', 'levelsConfig', 'bayLength'],
    ];
    const numberOfBayTypesInRow = 2
    const columnGroupingModel = Array.from({ length: numberOfBayTypesInRow }, (_, index) => {
        const groupId = `Bay group${index + 1}`;
        const children = fieldSets.map(fields => fields.map(field => ({ field: `${field}${index}` }))).flat();
        return { groupId, children };
    });
    console.log(columnGroupingModel)

    function handleDeleteLevel() {
        const updatedRackConfigs = rackConfigs.filter(config => !rowSelectionModel.includes(config.id));
        dispatch(handleRackConfigsChange({ selectedSystem, rackConfigs: updatedRackConfigs }));
        setRowSelectionModel([])
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 150,
            editable: true,
            type: 'number'
        },
        {
            field: 'depth',
            headerName: 'Depth',
            width: 150,
            editable: true,
            type: 'number'
        },
        {
            field: 'numberOfBays0',
            headerName: 'Number of Bays',
            width: 200,
            editable: true,
            type: 'number'
        },
        {
            field: 'levelsConfig0',
            headerName: 'Levels Config',
            width: 200,
            editable: true,
            type: 'singleSelect',
            valueOptions: levelConfigs.map(config => ({
                value: config.id,
                label: `Config ${levelConfigs.indexOf(config)} (0 + ${config.levels.length})`
            })),
            valueGetter: (params: { value: any; }) => params.value
        },
        {
            field: 'bayLength0',
            headerName: 'Bay Length',
            width: 200,
            editable: true,
            type: 'singleSelect',
            valueOptions: [...bays.euro].concat([...bays.indu])
        },
        {
            field: 'numberOfBays1',
            headerName: 'Number of Bays',
            width: 200,
            editable: true,
            type: 'number'
        },
        {
            field: 'levelsConfig1',
            headerName: 'Levels Config',
            width: 200,
            editable: true,
            type: 'singleSelect',
            valueOptions: levelConfigs.map(config => ({
                value: config.id,
                label: `Config ${levelConfigs.indexOf(config)} (0 + ${config.levels.length})`
            })),
            valueGetter: (params: { value: any; }) => params.value
        },
        {
            field: 'bayLength1',
            headerName: 'Bay Length',
            width: 200,
            editable: true,
            type: 'singleSelect',
            valueOptions: [...bays.euro].concat([...bays.indu])
        },
        {
            field: 'totalRackLength',
            headerName: 'Total Rack Length',
            width: 200,
            valueGetter: (params: any) => {
                console.log(params)
                const quantity = params.row.numberOfBays;
                const bayLength = params.row.bayLength;
                const bays = params.row.bays;
                const [min, med, max] = computeTotalRackLength(quantity, bayLength, bays);
                return `${min} / ${med} / ${max}`;
            }
        }
    ]

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ columnGrouping: true }}
            columnGroupingModel={columnGroupingModel}
            sx={{
                borderColor: 'divider',
                boxShadow: theme.palette.mode === 'light' ? theme.shadows[1] : 'none',
                backgroundColor: 'background.paper',
                '& .MuiDataGrid-row': {
                    '& .MuiDataGrid-cell': {
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'divider',
                },
                '& .MuiDataGrid-columnHeader': {
                    color: theme.palette.mode === 'light' ? customGreyPalette[500] : customGreyPaletteDark[400],
                    fontSize: 12,
                },
                '& .MuiDataGrid-footerContainer': {
                    borderTop: `1px solid ${theme.palette.divider}`,
                },
                '&.MuiDataGrid-columnHeader--filledGroup': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }
            }}
            slots={{
                pagination: () => (
                    <GridToolbarContainer>
                        {(editMode && rowSelectionModel.length > 0) ?
                            <Box>
                                <Box display={{ xs: 'none', md: 'block' }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        disabled={!editMode}
                                        endIcon={<DeleteIcon />}
                                        onClick={handleDeleteLevel}
                                    >
                                        {t('ui.button.deleteSelectedLevels')}
                                    </Button>
                                </Box>
                                <Box display={{ xs: 'inline-block', md: 'none' }}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        disabled={!editMode}
                                        onClick={handleDeleteLevel}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            : ''
                        }
                        <Button variant='outlined' startIcon={<AddIcon />} onClick={() => dispatch(handleAddNewRack(selectedSystem))}>Add new rack</Button>
                    </GridToolbarContainer>
                ),
            }}
            autoHeight
            onRowSelectionModelChange={(newRowSelectionModel) => { setRowSelectionModel(newRowSelectionModel) }}
            rowSelectionModel={rowSelectionModel}
            disableRowSelectionOnClick
            checkboxSelection
        />
        // <></>
    )
}


function computeTotalRackLength(quantity: number, bayLength: number, bays: number[]): [number, number, number] {
    const minUprightSize = Math.min(...uprightSizes);
    const maxUprightSize = Math.max(...uprightSizes);

    const minTotalLength = (bayLength * quantity) + (minUprightSize * (quantity + 1));
    const medTotalLength = (bayLength * quantity) + (uprightSizes[Math.floor(uprightSizes.length / 2)] * (quantity + 1));
    const maxTotalLength = (bayLength * quantity) + (maxUprightSize * (quantity + 1));

    return [minTotalLength, medTotalLength, maxTotalLength];
}