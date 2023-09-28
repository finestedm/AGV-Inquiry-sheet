import { Box, Button, ButtonBase, ButtonGroup, Checkbox, ClickAwayListener, Grow, IconButton, InputAdornment, Menu, MenuItem, MenuList, Paper, Popper, Select, SelectChangeEvent, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowDropDownCircleOutlined, PlaylistAdd } from "@mui/icons-material";
import { handleAddLoad, handleDeleteLoad, handleLoadChange } from "../features/redux/reducers/formDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { loadsToAdd } from "../data/typicalLoadSizes";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDeleteLoadDialog } from "../features/redux/reducers/deleteLoadDialogSlice";
import { DataGrid, GridActionsCellItem, GridCellEditStopReasons, GridCellModes, GridCellModesModel, GridCellParams, GridRowId, GridRowSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";

export default function LoadTable({ selectedSystem }: { selectedSystem: string },) {
    const { t } = useTranslation()

    const selectedSystemLoads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads);
    const selectedSystemFlows = useSelector((state: RootState) => state.formData.system[selectedSystem].flow);
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState<string>('placeholder');

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const theme = useTheme();

    const handleClick = () => {
        dispatch(handleAddLoad({ systemName: selectedSystem, loadType: selectedIndex }));
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: string,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const rows = selectedSystemLoads.map((load, index) => ({
        index: index + 1, // Sequential number starting from 1
        id: load.id,
        name: load.name,
        length: load.length,
        width: load.width,
        height: load.height,
        L2: load.L2,
        W2: load.W2,
        W3: load.W3,
        H2: load.H2,
        H3: load.H3,
        weightMin: load.weightMin,
        weightMax: load.weightMax,
        overhang: load.overhang,
        material: load.material,
        loadSide: load.loadSide,
        secured: load.secured,
        capacity: load.capacity,
        label: '',
    }));

    function handleDeleteSelected() {
        const updatedLoads = rows.filter((row) => row.id && !rowSelectionModel.includes(row.id))

        const isLoadUsedInFlows = selectedSystemFlows.some(flow => rowSelectionModel.includes(flow.loadType));

        if (isLoadUsedInFlows) {
            dispatch(updateDeleteLoadDialog({ open: true, updatedLoads, selectedSystem })) // we set the updatedLoads and selected system as a temp value as we wait for the user to take action
            setRowSelectionModel([])
        } else {
            dispatch(handleDeleteLoad({ updatedLoads, selectedSystem }));
        }
    };

    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        navigator.maxTouchPoints > 0 ? setIsMobile(true) : setIsMobile(false)
    }, [])

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    return (
        <Box sx={{ minHeight: '10rem' }}>
            <DataGrid
                rows={rows}
                columns={[
                    { field: "index", headerName: "№", width: 50, type: 'number' },
                    { field: "name", headerName: "Name", minWidth: 130, editable: true, type: 'string' },
                    { field: "length", headerName: "L1", minWidth: 90, editable: true, type: 'number', description: 'Load length in mm' },
                    { field: "width", headerName: "W1", minWidth: 90, editable: true, type: 'number', description: 'Load width in mm' },
                    { field: "height", headerName: "Height", minWidth: 80, editable: true, type: 'number', description: 'Load height in mm' },
                    { field: "L2", headerName: "L2", minWidth: 60, editable: true, type: 'number', description: 'Pallet length in mm' },
                    { field: "W2", headerName: "W2", minWidth: 60, editable: true, type: 'number', description: 'Pallet width in mm' },
                    { field: "W3", headerName: "W3", minWidth: 60, editable: true, type: 'number', description: 'Pallet opening width in mm' },
                    { field: "H2", headerName: "H2", minWidth: 60, editable: true, type: 'number', description: 'Pallet height in mm' },
                    { field: "H3", headerName: "H3", minWidth: 60, editable: true, type: 'number', description: 'Pallet opening height in mm' },
                    { field: "weightMin", headerName: "Weight min", minWidth: 125, editable: true, type: 'number' },
                    { field: "weightMax", headerName: "Weight max", minWidth: 125, editable: true, type: 'number' },
                    { field: "overhang", headerName: "Overhang", minWidth: 100, editable: true, type: 'boolean', description: 'Is the load bigger than the pallet?' },
                    {
                        field: 'material',
                        headerName: 'Material',
                        width: 125,
                        editable: true,
                        type: 'singleSelect',
                        valueOptions: [
                            { value: 0, label: t('loadTable.loadContainerMaterial.wood') },
                            { value: 1, label: t('loadTable.loadContainerMaterial.plastic') },
                            { value: 2, label: t('loadTable.loadContainerMaterial.metal') }
                        ]
                    },
                    {
                        field: 'loadSide',
                        headerName: 'Load Side',
                        width: 90,
                        editable: true,
                        type: 'singleSelect',
                        valueOptions: [
                            { value: 0, label: 'W' },
                            { value: 1, label: 'L' }
                        ]
                    },
                    { field: 'secured', headerName: 'Load Secured', width: 100, editable: true, type: 'boolean', description: 'Is the load secured on pallet (wrapped)?' },
                ]}

                processRowUpdate={(newRow: any) => {
                    dispatch(handleLoadChange({ newRow, selectedSystem }));
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
                                    <Box display={{ xs: 'none', md: 'block' }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            onClick={handleDeleteSelected}
                                            endIcon={<DeleteIcon />}
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
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                : ''
                            }
                            <ButtonGroup variant='contained' size="small" aria-label="split button">
                                <Button
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="add loads"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    {t(`${loadsToAdd[selectedIndex]?.label}`)}
                                    <Box ref={anchorRef} />
                                    <ArrowDropDownIcon />
                                </Button>
                                <Button onClick={handleClick} disabled={loadsToAdd[selectedIndex].name === 'placeholder'} endIcon={<PlaylistAdd />}><Box display={{ xs: 'none', md: 'inline-block' }}>{t('ui.button.addNewLoad')}</Box></Button>
                            </ButtonGroup>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList dense={isMobile} id="split-button-menu" autoFocusItem>
                                                    {Object.keys(loadsToAdd).map((option) => (
                                                        <MenuItem
                                                            key={option}
                                                            value={option}
                                                            selected={option === selectedIndex}
                                                            onClick={(e) => handleMenuItemClick(e, option)}
                                                        >
                                                            {t(`${loadsToAdd[option].label}`)}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
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

        </Box >
    )
}