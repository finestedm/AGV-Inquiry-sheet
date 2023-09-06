import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { useDispatch } from "react-redux";
import { Box, Button, IconButton, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { handleAddFlow, handleFlowChange } from "../features/redux/reducers/formDataSlice";
import { PlaylistAdd } from "@mui/icons-material";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";

export default function FlowTable({ selectedSystem }: { selectedSystem: string },) {
    const { t } = useTranslation()

    const selectedSystemFlow = useSelector((state: RootState) => state.formData.system[selectedSystem].flow);
    const selectedSystemLoads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads);
    const dispatch = useDispatch();

    return (
        <>
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
}