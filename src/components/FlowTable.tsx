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
                                label: load.label,
                            }))
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
                                <Typography variant="h6">Add first load. <Typography color='text.secondary'>You can use predefined ones!</Typography></Typography>
                            </Box>
                        )
                    }}
                    onRowSelectionModelChange={(newRowSelectionModel) => { setRowSelectionModel(newRowSelectionModel) }}
                    rowSelectionModel={rowSelectionModel}

                // Add other Data Grid props as needed...
                />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Stage №</TableCell>
                                <TableCell>Pickup station</TableCell>
                                <TableCell>Unload Station</TableCell>
                                <TableCell>Average LU / h</TableCell>
                                <TableCell>Peak LU / h</TableCell>
                                <TableCell>Load type</TableCell>
                                <TableCell>Work time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedSystemFlow.map((flow, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography>{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={flow.stationSource}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'stationSource', value: e.target.value }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={flow.stationTarget}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'stationTarget', value: e.target.value }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={trimLeadingZeros(flow.flowAverage)}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'flowAverage', value: e.target.value }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={trimLeadingZeros(flow.flowPeak)}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'flowPeak', value: e.target.value }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            size="small"
                                            value={flow.stationType}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'stationType', value: e.target.value }))}
                                        >
                                            {selectedSystemLoads.map((load, loadIndex) => (
                                                <MenuItem key={loadIndex} value={loadIndex}>
                                                    <Stack >
                                                        <Typography mr={1}>
                                                            {load.name}
                                                        </Typography>
                                                        <Typography fontSize='65%' color='text.secondary' >
                                                            {load.length} x {load.width} x  {load.height}, {load.weightMax} kg
                                                        </Typography>
                                                    </Stack>

                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={trimLeadingZeros(flow.workTime)}
                                            onChange={(e) => dispatch(handleFlowChange({ index, field: 'workTime', value: e.target.value }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => {
                                                // dispatch(setLoadIndexToDelete(index))
                                                // dispatch(deleteLoadDialogOpen(true))
                                            }}>
                                            {/* <DeleteIcon /> */}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
                <Box textAlign='left'>
                    <Button variant='outlined' onClick={() => dispatch(handleAddFlow({ systemName: selectedSystem }))} endIcon={<PlaylistAdd />}>{t('ui.button.addNewFlow')} </Button >
                </Box>
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