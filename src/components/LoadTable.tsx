import { Box, Button, ButtonBase, ButtonGroup, Checkbox, ClickAwayListener, Grow, IconButton, InputAdornment, Menu, MenuItem, MenuList, Paper, Popper, Select, SelectChangeEvent, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowDropDownCircleOutlined, PlaylistAdd } from "@mui/icons-material";
import { IFormData, IHandleAddLoad, IHandleLoadChange, ILoad } from "../features/interfaces";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";
import { handleAddLoad, handleDeleteLoad, handleLoadChange } from "../features/redux/reducers/formDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { loadsToAdd } from "../data/typicalLoadSizes";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteLoadDialogOpen, setLoadIndexToDelete } from "../features/redux/reducers/deleteLoadDialogSlice";
import { loadContainerMaterials } from "../data/loadContainerMaterials";
import LoadTableCustomTextField from "./LoadTableCustomeTexField";
import { DataGrid, GridActionsCellItem, GridCellEditStopReasons, GridRowId, GridToolbarContainer, MuiEvent } from "@mui/x-data-grid";

export default function LoadTable({ selectedSystem }: { selectedSystem: string },) {
    const { t } = useTranslation()

    const selectedSystemLoads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads);
    const [selectedIndex, setSelectedIndex] = useState<string>('empty');

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

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
        id: index + 1, // Sequential number starting from 1
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
    }));

    const handleDeleteClick = (id: GridRowId) => () => {
        const updatedLoads = rows
            .filter((row) => row.id !== id)
            .map((load) => ({
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
                label: "", // Add the 'label' property here if it's required by ILoad
            }));
        dispatch(handleDeleteLoad(updatedLoads));
    };

    const dispatch = useDispatch();
    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={[
                    { field: "id", headerName: "№", width: 50, type: 'number' },
                    { field: "name", headerName: "Name", width: 200, editable: true, type: 'string' },
                    { field: "length", headerName: "Length (L1)", width: 100, editable: true, type: 'number' },
                    { field: "width", headerName: "Width (W1)", width: 100, editable: true, type: 'number' },
                    { field: "height", headerName: "Height", width: 100, editable: true, type: 'number' },
                    { field: "L2", headerName: "L2", width: 100, editable: true, type: 'number' },
                    { field: "W2", headerName: "W2", width: 100, editable: true, type: 'number' },
                    { field: "W3", headerName: "W3", width: 100, editable: true, type: 'number' },
                    { field: "H2", headerName: "H2", width: 100, editable: true, type: 'number' },
                    { field: "H3", headerName: "H3", width: 100, editable: true, type: 'number' },
                    { field: "weightMin", headerName: "Weight min", width: 100, editable: true, type: 'number' },
                    { field: "weightMax", headerName: "Weight max", width: 100, editable: true, type: 'number' },
                    { field: "overhang", headerName: "Overhang", width: 100, editable: true, type: 'boolean' },

                    // {
                    //     field: 'overhang',
                    //     headerName: 'Overhang',
                    //     width: 150,
                    //     renderCell: (params => {
                    //         <Checkbox
                    //             checked={params.value}
                    //             // onChange={(e) => dispatch(handleLoadChange({ index: params.id, field: "length", value: Number(e.target.value) }))}
                    //         />
                    //     }),
                    // },
                    // {
                    //     field: 'material',
                    //     headerName: 'Material',
                    //     width: 150,
                    //     renderCell: MaterialCellRenderer, // Use the custom renderer for this column
                    // },
                    // {
                    //     field: 'loadSide',
                    //     headerName: 'Load Side',
                    //     width: 150,
                    //     renderCell: LoadSideCellRenderer, // Use the custom renderer for this column
                    // },
                    // {
                    //     field: 'secured',
                    //     headerName: 'Secured',
                    //     width: 150,
                    //     renderCell: SecuredCellRenderer, // Use the custom renderer for this column
                    // },
                    {
                        field: 'actions',
                        type: 'actions',
                        headerName: 'Actions',
                        width: 100,
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            return [
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id)}
                                    color="inherit"
                                />,
                            ];
                        }
                    }
                    // Add other columns here...
                ]}

                processRowUpdate={(newRow: any) => {
                    dispatch(handleLoadChange({ newRow, selectedSystem }));
                    // Return the updated row with isNew set to false
                    return { ...newRow, isNew: false };
                }}

                disableRowSelectionOnClick
                checkboxSelection
                // hideFooterPagination
                slots={{
                    pagination: () => (
                        <GridToolbarContainer>
                            <ButtonGroup variant='contained' aria-label="split button">
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
                                <Button onClick={handleClick} endIcon={<PlaylistAdd />}>{t('ui.button.addNewLoad')} </Button>
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
                                                <MenuList id="split-button-menu" autoFocusItem>
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
                }}
            // Add other Data Grid props as needed...
            />

        </Box>
    )
}