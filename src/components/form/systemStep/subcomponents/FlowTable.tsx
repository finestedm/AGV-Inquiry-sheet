import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";
import { Avatar, Badge, Box, Button, ButtonGroup, Checkbox, Chip, IconButton, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { handleAddFlow, handleDeleteFlow, handleFlowChange } from "../../../../features/redux/reducers/formDataSlice";
import { PlaylistAdd } from "@mui/icons-material";
import { DataGrid, GridDeleteIcon, GridRowSelectionModel, GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EastIcon from '@mui/icons-material/East';
import { IEquipment, IFlow, ILoad, ISystems } from "../../../../features/interfaces";
import tinycolor from "tinycolor2";
import NoDataAlert from "../../../NoDataAlert";
import EquipmentChip from "./EquipmentChip";

export default function FlowTable({ selectedSystem }: { selectedSystem: keyof ISystems },) {
    const { t } = useTranslation()

    const selectedSystemFlow = useSelector((state: RootState) => state.formData.system[selectedSystem].flow);
    const selectedSystemLoads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads);
    const selectedSystemEquipment = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding.equipment);
    const editMode = useSelector((state: RootState) => state.editMode)
    const dispatch = useDispatch();
    const theme = useTheme();

    const rows = selectedSystemEquipment && selectedSystemFlow.map((flow, index) => { // selectedSystemEquipment added to only render rows if this version includes this data
        // Find source and target stations based on their ids
        const sourceStation = selectedSystemEquipment.find(equipment => equipment.id === flow.stationSource);
        const targetStation = selectedSystemEquipment.find(equipment => equipment.id === flow.stationTarget);

        // Calculate distance based on coordinates
        const distance = sourceStation && targetStation
            ? Math.sqrt(Math.pow(targetStation.x - sourceStation.x, 2) + Math.pow(targetStation.y - sourceStation.y, 2))
            : 0;

        return {
            id: index + 1, // Sequential number starting from 1 
            stationSource: flow.stationSource,
            stationTarget: flow.stationTarget,
            stationType: flow.stationType,
            flowAverage: flow.flowAverage,
            flowPeak: flow.flowPeak,
            distance: distance, // Set the calculated distance
            loadType: flow.loadType,
            bidirectional: flow.bidirectional
        };
    });

    const handleDeleteSelected = () => {
        const updatedFlows = rows
            .filter((row) => !rowSelectionModel.includes(row.id))
            .map((flow) => ({
                id: flow.id,
                stationSource: flow.stationSource,
                stationTarget: flow.stationTarget,
                stationType: flow.stationType,
                flowAverage: flow.flowAverage,
                flowPeak: flow.flowPeak,
                distance: flow.distance,
                loadType: flow.loadType,
                bidirectional: flow.bidirectional
            }));

        dispatch(handleDeleteFlow({ updatedFlows, selectedSystem }));
        setRowSelectionModel([])
    };

    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        navigator.maxTouchPoints > 0 ? setIsMobile(true) : setIsMobile(false)
    }, [])

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    //the below is needed to filter out loads that are no longer available in the selectedSystemLoads
    useEffect(() => {
        const updatedFlows: IFlow[] = selectedSystemFlow.map((flow) => ({
            ...flow,
            loadType: flow.loadType.filter((loadId) =>
                selectedSystemLoads.some((load) => load.id === loadId)
            ),
        }
        ));
        updatedFlows.forEach(flow => dispatch(handleFlowChange({ newRow: flow, selectedSystem })));

        // Now, 'updatedFlows' contains flows with loadType filtered based on selectedSystemLoads
    }, [selectedSystemLoads]);

    function CustomEditComponent(props: { id: any; value: any; field: any; }) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleChange = (event: { target: { value: number | string; }; }) => {

            const eventValue = event.target.value;

            apiRef.current.setEditCellValue({
                id,
                field,
                value: eventValue
            });
        };

        return (
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={value}
                onChange={handleChange}
                sx={{ width: "100%" }}
            >
                {selectedSystemLoads.map((load) => (
                    <MenuItem key={load.id} value={load.id}>
                        {
                            <Stack direction='row' spacing={1}>
                                <Checkbox checked={value.includes(load.id)} />
                                <Stack>
                                    <Typography mr={1}>
                                        {load.name}
                                    </Typography>
                                    <Typography fontSize='65%' color='text.secondary' >
                                        {load.length} x {load.width} x  {load.height}, {load.weightMax} kg
                                    </Typography>
                                </Stack>
                            </Stack>

                        }
                    </MenuItem>
                ))}
            </Select>
        );
    }

    const CustomLoadTypeEditCell = (params: any) => <CustomEditComponent {...params} />;

    function CustomFilterInputSingleSelect(props: { [x: string]: any; item: any; applyValue: any; type: any; apiRef: any; focusElementRef: any; }) {
        const { item, applyValue, type, apiRef, focusElementRef, ...others } = props;

        return (
            <TextField>
            </TextField>
        );
    }

    if (selectedSystemFlow && selectedSystemLoads && selectedSystemEquipment) {
        return (
            <Box>
                <DataGrid
                    rows={rows}
                    columns={[
                        { field: "id", headerName: "Stage", width: 50, type: 'number' },
                        {
                            field: "stationSource",
                            headerName: "Pickup station",
                            minWidth: 130,
                            editable: true,
                            type: 'singleSelect',
                            valueOptions: selectedSystemEquipment.map((equipment) => ({
                                value: equipment.id,
                                label: <EquipmentChip equipment={equipment} />
                            })),
                            renderCell: (params) => <Box textAlign='left'>{params.formattedValue}</Box>
                        },
                        {
                            field: "stationTarget",
                            headerName: "Unload station",
                            minWidth: 130,
                            editable: true,
                            type: 'singleSelect',
                            valueOptions: selectedSystemEquipment.map((equipment) => ({
                                value: equipment.id,
                                label: <EquipmentChip equipment={equipment} />
                            })),
                            renderCell: (params) => <Box textAlign='left'>{params.formattedValue}</Box>
                        },
                        { field: "flowAverage", headerName: "Average material flow", minWidth: 130, editable: true, type: 'number' },
                        { field: "flowPeak", headerName: "Peak material flow", minWidth: 130, editable: true, type: 'number' },
                        {
                            field: "loadType",
                            headerName: "Load Type",
                            minWidth: 150,
                            editable: true,
                            type: 'singleSelect',
                            description: 'Type of loads used on this stage',
                            renderEditCell: CustomLoadTypeEditCell,
                            valueFormatter: ({ value }: { value: number[] }) => {
                                if (value.length === 0) {
                                    return 'No loads selected';
                                } else if (value.length === 1) {
                                    const loadId = value[0];
                                    return selectedSystemLoads.find((load) => load.id === loadId)?.name || 'Load unnamed';
                                } else {
                                    return 'Multiple loads';
                                }
                            },
                            valueOptions: selectedSystemLoads.map((load) => ({
                                value: load.id,
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
                            renderCell: (params) => {
                                const loadIds = params.value as number[];

                                if (loadIds.length === 0) {
                                    return 'No loads selected';
                                } else if (loadIds.length === 1) {
                                    const loadId = loadIds[0];
                                    const loadName = selectedSystemLoads.find((load) => load.id === loadId)?.name || 'Load not found';
                                    return <Chip
                                        label={loadName}
                                        color='primary'
                                        variant="filled"
                                        size="small"
                                    />;
                                } else {
                                    return (
                                        <Chip
                                            avatar={<Avatar>{loadIds.length}</Avatar>}
                                            color='primary'
                                            label="Multiple loads"
                                            variant="filled"
                                            size="small"
                                        />
                                    );
                                }
                            },
                        },
                        { field: "distance", headerName: "Distance", minWidth: 130, editable: true, type: 'number', description: 'Distance to travel between pickup station and target station' },
                        { field: "bidirectional", headerName: "Bi-Directional?", minWidth: 130, editable: true, type: 'boolean', description: 'Does this flow occur in both directions?', valueGetter: (params) => params.value ? <SwapHorizIcon /> : <EastIcon />, renderCell: (params) => <>{params.value}</> }
                    ]}

                    processRowUpdate={(newRow: IFlow, oldRow: IFlow) => {
                        if (editMode) {
                            dispatch(handleFlowChange({ newRow, selectedSystem }));
                            // Return the updated row with isNew set to false
                            return { ...newRow, isNew: false };
                        } else {
                            return oldRow
                        }
                    }}
                    disableRowSelectionOnClick
                    checkboxSelection
                    disableColumnMenu={isMobile}
                    density='compact'
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
                                                onClick={handleDeleteSelected}
                                                endIcon={<GridDeleteIcon />}
                                            >
                                                {t('ui.button.deleteSelectedLoads')}
                                            </Button>
                                        </Box>
                                        <Box display={{ xs: 'inline-block', md: 'none' }}>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={handleDeleteSelected}
                                            >
                                                <GridDeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    : ''
                                }
                                <Button
                                    size="small"
                                    variant='contained'
                                    onClick={() => dispatch(handleAddFlow({ systemName: selectedSystem }))}
                                    endIcon={<PlaylistAdd />}
                                    disabled={!editMode}
                                >
                                    {t('ui.button.addNewFlow')}
                                </Button >
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
                    onRowSelectionModelChange={(newRowSelectionModel) => { editMode && setRowSelectionModel(newRowSelectionModel) }}
                    rowSelectionModel={rowSelectionModel}
                />

            </Box>
        )
    } else {
        return (
            <NoDataAlert />
        )
    }
}