import { useSelector } from "react-redux";
import { ISystems, TLevelsConfig } from "../../../../../features/interfaces";
import { RootState } from "../../../../../features/redux/store";
import { useDispatch } from "react-redux";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Grid, IconButton, Input, Menu, MenuItem, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme, useThemeProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { handleAddNewConfig, handleAddNewLevel, handleLevelConfigsChange } from "../../../../../features/redux/reducers/formDataSlice";
import LevelsConfigTable from "./LevelsConfigTable";
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DataGrid, GridRowSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";
import { customGreyPalette, customGreyPaletteDark } from "../../../../../theme";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import LevelConfigDialog from "./LevelConfigDialog";


export default function LevelsConfigs({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const formData = useSelector((state: RootState) => state.formData)
    const levelConfigs = formData.system[selectedSystem].levelConfigs
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const theme = useTheme();

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [levelConfigToEdit, setLevelConfigToEdit] = useState<TLevelsConfig['id']>();
    const [levelConfigDialogOpen, setLevelConfigDialogOpen] = useState<boolean>(false);

    function handleLevelConfigDialogOpen(configId: TLevelsConfig['id']) {
        setLevelConfigToEdit(configId);
        setLevelConfigDialogOpen(true);
    }

    function handleLevelConfigDialogClose() {
        setLevelConfigToEdit(undefined);
        setLevelConfigDialogOpen(false);
    }

    function handleDeleteConfig() {
        const filteredConfigs = levelConfigs.filter(config => !rowSelectionModel.includes(config.id));
        dispatch(handleLevelConfigsChange({ selectedSystem, levelConfigs: filteredConfigs }));
        setRowSelectionModel([])
    }

    function addNewConfig() {
        dispatch(handleAddNewConfig(selectedSystem));
    };

    const rows = levelConfigs

    return (
        <Box>
            <DataGrid
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
                }}
                rows={rows}
                columns={
                    [
                        { field: 'id', headerName: 'Configuration', width: 120, valueGetter: (params) => rows.findIndex(row => params.row.id === row.id) + 1 },
                        { field: 'beamLevels', headerName: 'Beam levels', width: 120, valueGetter: (params) => ` (0+${rows.find(row => row.id === params.row.id)?.levels.length})` },
                        {
                            field: 'highestLevel', headerName: 'Highest level', width: 120, valueGetter: (params) => {
                                const levels = rows.find(row => row.id === params.row.id)?.levels || [];
                                return Math.max(...levels.map(level => level.height));
                            }
                        },
                        { field: 'actions', headerName: 'Edit', width: 80, renderCell: (params) => <IconButton onClick={() => handleLevelConfigDialogOpen(params.row.id)}><OpenInNewIcon fontSize="small" /></IconButton> },
                    ]
                }
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
                                            onClick={handleDeleteConfig}
                                            endIcon={<DeleteIcon />}
                                        >
                                            {t('ui.button.deleteSelectedLevels')}
                                        </Button>
                                    </Box>
                                    <Box display={{ xs: 'inline-block', md: 'none' }}>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            disabled={!editMode}
                                            onClick={handleDeleteConfig}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                : ''
                            }
                            <Button startIcon={<AddIcon />} variant="contained" onClick={addNewConfig}>Add configuration</Button>
                        </GridToolbarContainer>
                    ),
                }}
                autoHeight
                onRowSelectionModelChange={(newRowSelectionModel) => { setRowSelectionModel(newRowSelectionModel) }}
                rowSelectionModel={rowSelectionModel}
                disableRowSelectionOnClick
                checkboxSelection
            />
            <LevelConfigDialog levelConfigDialogOpen={levelConfigDialogOpen} handleLevelConfigDialogClose={handleLevelConfigDialogClose} selectedSystem={selectedSystem} configId={levelConfigToEdit} />
        </Box>
    )
}