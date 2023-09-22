import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, IconButton, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { handleAddFlow, handleFlowChange } from "../features/redux/reducers/formDataSlice";
import { PlaylistAdd } from "@mui/icons-material";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";
import { DataGrid, GridRowSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function FlowTable({ selectedSystem }: { selectedSystem: string },) {
    const { t } = useTranslation()

    const selectedSystemFlow = useSelector((state: RootState) => state.formData.system[selectedSystem].flow);
    const selectedSystemLoads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads);
    const dispatch = useDispatch();

    const rows = selectedSystemFlow.map((load, index) => ({
        id: index + 1, // Sequential number starting from 1
        stationSource: load.stationSource,
        stationTarget: load.stationTarget,
        stationType: load.stationType,
        flowAverage: load.flowAverage,
        flowPeak: load.flowPeak,
        workTime: load.workTime,
        loadType: load.loadType
    }));

    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        navigator.maxTouchPoints > 0 ? setIsMobile(true) : setIsMobile(false)
    }, [])

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    if (selectedSystemFlow) {
        return (
            <>
                <DataGrid
                    rows={rows}
                    columns={[
                        { field: "id", headerName: "Stage", width: 50, type: 'number' },
                        { field: "stationSource", headerName: "Pickup station", minWidth: 130, editable: true, type: 'string' },
                        { field: "stationTarget", headerName: "Unload station", minWidth: 130, editable: true, type: 'string' },
                        { field: "stationType", headerName: "Station Type", minWidth: 130, editable: true, type: 'singleSelect' },
                        { field: "flowAverage", headerName: "Average material flow", minWidth: 130, editable: true, type: 'number' },
                        { field: "flowPeak", headerName: "Peak material flow", minWidth: 130, editable: true, type: 'number' },
                        {
                            field: "loadType",
                            headerName: "Load Type",
                            minWidth: 130,
                            editable: true,
                            type: 'singleSelect',
                            valueOptions: selectedSystemLoads.map((load, index) => ({
                                value: index,
                                label:
                                    (<Stack >
                                        <Typography mr={1}>
                                            {load.name}
                                        </Typography>
                                        <Typography fontSize='65%' color='text.secondary' >
                                            {load.length} x {load.width} x  {load.height}, {load.weightMax} kg
                                        </Typography>
                                    </Stack>)
                            })),
                            renderCell: (params) => <span>{params.formattedValue}</span>
                        },
                        { field: "workTime", headerName: "workTime", minWidth: 130, editable: true, type: 'number' },
                    ]}

                    processRowUpdate={(newRow: any) => {
                        dispatch(handleFlowChange({ newRow, selectedSystem }));
                        // Return the updated row with isNew set to false
                        return { ...newRow, isNew: false };
                    }}
                    disableRowSelectionOnClick
                    checkboxSelection
                    disableColumnMenu={isMobile}
                    density='compact'
                    slots={{
                        pagination: () => (
                            <GridToolbarContainer>
                                {(rowSelectionModel.length > 0) ?
                                    <Box>

                                    </Box>

                                    : ''
                                }

                            </GridToolbarContainer>
                        ),
                        noRowsOverlay: () => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                <Typography variant="h6">Add first flow.</Typography>
                            </Box>
                        )
                    }}
                    onRowSelectionModelChange={(newRowSelectionModel) => { setRowSelectionModel(newRowSelectionModel) }}
                    rowSelectionModel={rowSelectionModel}

                // Add other Data Grid props as needed...
                />
                {/* <Box textAlign='left'>
                    <Button variant='outlined' onClick={() => dispatch(handleAddFlow({ systemName: selectedSystem }))} endIcon={<PlaylistAdd />}>{t('ui.button.addNewFlow')} </Button >
                </Box> */}
            </>
        )
    } else {
        return (
            <Box>
                <Typography variant='h1'>Error loading flow tables</Typography>
            </Box>
        )
    }
}