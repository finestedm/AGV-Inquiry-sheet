import { useSelector } from "react-redux";
import { ISystems, TLevelsConfig, TLevelsDetails } from "../../../../../features/interfaces";
import { RootState } from "../../../../../features/redux/store";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { MouseEvent, useState } from "react";
import { DataGrid, GridRowSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";
import { handleAddNewLevel, handleLevelConfigsChange } from "../../../../../features/redux/reducers/formDataSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { customGreyPalette, customGreyPaletteDark } from "../../../../../theme";
import { openSnackbar } from "../../../../../features/redux/reducers/snackBarSlice";
import AddIcon from '@mui/icons-material/Add';

export default function LevelsConfigTable({ selectedSystem, configId }: { selectedSystem: keyof ISystems; configId: TLevelsConfig['id']; }) {

    const beamHeight = 150;
    const formData = useSelector((state: RootState) => state.formData);
    const levelConfigs = formData.system[selectedSystem].levelConfigs;
    const config = levelConfigs.find(config => config.id === configId)!;
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useDispatch();

    const rows = config.levels.slice().sort((a, b) => a.id - b.id).map((level, index) => ({ id: level.id, height: level.height, accessory: level.accessory }));

    const columns = [
        { field: 'id', headerName: 'Beam Level', width: 120 },
        { field: 'height', headerName: 'Height', width: 120, editable: true },
        {
            field: 'difference', headerName: 'Difference', width: 150,
            valueGetter: (params: { row: { height: number; id: number; }; }) => {
                const currentLevel = params.row.height;
                const previousLevel = rows.find((level) => level.id === params.row.id - 1)?.height ?? 0;
                return currentLevel - +previousLevel;
            }
        },
        {
            field: 'freeLevelHeight', headerName: 'Free level height', width: 200,
            valueGetter: (params: { row: { height: number; id: number; }; }) => {
                const currentLevel = params.row.height;
                const previousLevel = rows.find((level) => level.id === params.row.id - 1)?.height ?? 0;
                return currentLevel - +previousLevel - beamHeight;
            }
        },
        {
            field: 'accessory', headerName: 'Accessory', width: 200, editable: true,
        },
    ]

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    function handleDeleteLevel() {
        const newLevels = config.levels.filter((level) => !rowSelectionModel.includes(level.id));
        const updatedConfig = { ...config, levels: newLevels };
        const updatedConfigs = levelConfigs.map(levelConfig => levelConfig.id === config.id ? updatedConfig : levelConfig);
        dispatch(handleLevelConfigsChange({ selectedSystem, levelConfigs: updatedConfigs }));
        setRowSelectionModel([]);
    }

    return (
        <DataGrid
            sx={{
                borderColor: 'transparent',
                boxShadow: theme.palette.mode === 'light' ? theme.shadows[1] : 'none',
                backgroundColor: 'background.default',
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
            columns={columns}
            slots={{
                pagination: () => (
                    <GridToolbarContainer>
                        {(editMode && rowSelectionModel.length > 0) &&
                            <Box>
                                <Box display={{ xs: 'none', md: 'block' }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        disabled={!editMode}
                                        onClick={handleDeleteLevel}
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
                                        onClick={handleDeleteLevel}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        }
                        <Button variant='outlined' startIcon={<AddIcon />} onClick={() => dispatch(handleAddNewLevel({ selectedSystem, configId: config.id }))}>Add Level</Button>
                    </GridToolbarContainer>
                ),
            }}
            autoHeight
            onRowSelectionModelChange={(newRowSelectionModel) => { setRowSelectionModel(newRowSelectionModel) }}
            rowSelectionModel={rowSelectionModel}
            processRowUpdate={(newRow, oldRow) => {
                const previousLevel = rows.find((level) => level.id === newRow.id - 1);
                if (previousLevel && newRow.height < previousLevel.height) {
                    dispatch(openSnackbar({ message: 'Level cannot be set lover than previous level', severity: 'error' }));
                    return oldRow;
                }
                if (previousLevel && newRow.height - previousLevel.height < (beamHeight + 100)) {
                    dispatch(openSnackbar({ message: 'Level have to be set at least 250mm above the previous level', severity: 'error' }));
                    return oldRow;
                }
                const newLevels = rows.map((level) => (level.id === oldRow.id ? { ...level, height: newRow.height, accessory: newRow.accessory } : level));
                const updatedConfig = { ...config, levels: newLevels };
                const updatedConfigs = levelConfigs.map(levelConfig => levelConfig.id === config.id ? updatedConfig : levelConfig);
                dispatch(handleLevelConfigsChange({ selectedSystem, levelConfigs: updatedConfigs as TLevelsConfig[] }));
                return { ...newRow, isNew: false };
            }}

            disableRowSelectionOnClick
            checkboxSelection
            initialState={{
                sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                },
            }}
            onProcessRowUpdateError={(error) => console.log(error)}
        />
    );
}
