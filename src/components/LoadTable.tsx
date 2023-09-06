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

    const dispatch = useDispatch();
    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Length (L1)</TableCell>
                            <TableCell>Width (W1)</TableCell>
                            <TableCell>Height</TableCell>
                            <TableCell>L2</TableCell>
                            <TableCell>W2</TableCell>
                            <TableCell>W3</TableCell>
                            <TableCell>H2</TableCell>
                            <TableCell>H3</TableCell>
                            <TableCell>Weight min</TableCell>
                            <TableCell>Weight max</TableCell>
                            <TableCell>Overhang</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell>Load side</TableCell>
                            <TableCell>Secured</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedSystemLoads.map((load, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography>{index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={load.name}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'name', value: e.target.value }))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.length)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'length', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.width)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'width', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.height)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'height', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.L2)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'L2', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.W2)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'W2', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.W3)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'W3', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.H2)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'H2', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.H3)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'H3', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    mm
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.weightMin)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'weightMin', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    kg
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trimLeadingZeros(load.weightMax)}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'weightMax', value: Number(e.target.value) }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    kg
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={load.overhang || load.length > load.L2 || load.width > load.W2} // auto check if the load dimensions are bigger than pallet dimensions
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'overhang', value: e.target.checked }))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        size="small"
                                        value={load.material}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'material', value: e.target.value }))}
                                    >
                                        {loadContainerMaterials.map(material => (
                                            <MenuItem value={loadContainerMaterials.indexOf(material)}>{t(`${material}`)}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Stack direction='row' alignItems='center'>
                                        <Typography>W</Typography>
                                        <Switch
                                            checked={load.loadSide}
                                            onChange={() => dispatch(handleLoadChange({ index, field: 'loadSide', value: !load.loadSide }))}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Typography>L</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={load.secured}
                                        onChange={(e) => dispatch(handleLoadChange({ index, field: 'secured', value: e.target.checked }))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            dispatch(setLoadIndexToDelete(index))
                                            dispatch(deleteLoadDialogOpen(true))
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

            <ButtonGroup variant="outlined" aria-label="split button">
                <Button
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
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
        </>
    )
}