import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, Chip, IconButton, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { handleAddFlow, handleDeleteFlow, handleFlowChange } from "../../../../features/redux/reducers/formDataSlice";
import { PlaylistAdd } from "@mui/icons-material";
import { DataGrid, GridDeleteIcon, GridRowSelectionModel, GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EastIcon from '@mui/icons-material/East';
import { IEquipment, ILoad, ISystems } from "../../../../features/interfaces";
import DoorSlidingSharpIcon from '@mui/icons-material/DoorSlidingSharp';
import ConstructionIcon from '@mui/icons-material/Construction';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import tinycolor from "tinycolor2";
import NoDataAlert from "../../../NoDataAlert";

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

    function CustomEditComponent(props: { id: any; value: any; field: any; }) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleChange = (event: { target: { value: any; }; }) => {
            const eventValue = event.target.value; // The new value entered by the user

            const updatedLoads = selectedSystemLoads.map(load => {
                if (load.id && eventValue.includes(load.id)) {
                    // If the load's id is in the eventValue array, update its name property
                    return load
                }
            });
            console.log(updatedLoads)
            apiRef.current.setEditCellValue({
                id,
                field,
                value: updatedLoads as ILoad[]
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
                            <Stack >
                                <Typography mr={1}>
                                    {load.name}
                                </Typography>
                                <Typography fontSize='65%' color='text.secondary' >
                                    {load.length} x {load.width} x  {load.height}, {load.weightMax} kg
                                </Typography>
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
            <TextField
                id={`contains-input-${item.id}`}
                value={item.value}
                onChange={(event) => applyValue({ ...item, value: event.target.value })}
                type={type || "text"}
                variant="standard"
                InputLabelProps={{
                    shrink: true
                }}
                inputRef={focusElementRef}
                select
                SelectProps={{
                    native: true
                }}
            >

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
                                label:
                                    <Stack>
                                        <Chip
                                            sx={{ backgroundColor: equipment.color }}
                                            label={
                                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                                    {equipment.type === 'gate' && <DoorSlidingSharpIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    {equipment.type === 'wall' && <ConstructionIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    {equipment.type === 'dock' && <SystemUpdateAltIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    <Typography variant="body2" sx={{ textTransform: 'capitalize', color: tinycolor(equipment.color).darken(50).toString() }} ml={1}>{equipment.type}</Typography>
                                                </Stack>
                                            }
                                        />
                                    </Stack>
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
                                label:
                                    <Stack>
                                        <Chip
                                            sx={{ backgroundColor: equipment.color }}
                                            label={
                                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                                    {equipment.type === 'gate' && <DoorSlidingSharpIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    {equipment.type === 'wall' && <ConstructionIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    {equipment.type === 'dock' && <SystemUpdateAltIcon fontSize='small' htmlColor={tinycolor(equipment.color).darken(50).toString()} />}
                                                    <Typography variant="body2" sx={{ textTransform: 'capitalize', color: tinycolor(equipment.color).darken(50).toString() }} ml={1}>{equipment.type}</Typography>
                                                </Stack>
                                            }
                                        />
                                    </Stack>
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
                            valueFormatter: ({ value }) => (value ? value : ""),
                            renderEditCell: CustomLoadTypeEditCell,
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
                            filterOperators: [
                                {
                                    value: "contains",
                                    getApplyFilterFn: (filterItem) => {
                                        if (filterItem.value == null || filterItem.value === "") {
                                            return null;
                                        }
                                        return ({ value }) => {
                                            // if one of the cell values corresponds to the filter item
                                            return value.some((cellValue: any) => cellValue === filterItem.value);
                                        };
                                    },
                                    InputComponent: CustomFilterInputSingleSelect
                                }
                            ],
                            renderCell: (params) => <Box textAlign='left'>{params.value}</Box>
                        },
                        { field: "distance", headerName: "Distance", minWidth: 130, editable: true, type: 'number', description: 'Distance to travel between pickup station and target station' },
                        { field: "bidirectional", headerName: "Bi-Directional?", minWidth: 130, editable: true, type: 'boolean', description: 'Does this flow occur in both directions?', valueGetter: (params) => params.value ? <SwapHorizIcon /> : <EastIcon />, renderCell: (params) => <>{params.value}</> }
                    ]}

                    processRowUpdate={(newRow: any, oldRow: any) => {
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