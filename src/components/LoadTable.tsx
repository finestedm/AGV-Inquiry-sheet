import { Button, Checkbox, InputAdornment, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PlaylistAdd } from "@mui/icons-material";
import { IFormData, IHandleAddLoad, IHandleLoadChange, ILoad } from "../features/interfaces";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";
import { handleAddLoad, handleLoadChange } from "../features/redux/reducers/formDataSlice";
import { useDispatch } from "react-redux";

export default function LoadTable({ loads }: { loads: ILoad[] },) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Length</TableCell>
                        <TableCell>Width</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>L2</TableCell>
                        <TableCell>W2</TableCell>
                        <TableCell>W3</TableCell>
                        <TableCell>Weight min</TableCell>
                        <TableCell>Weight max</TableCell>
                        <TableCell>Overhang</TableCell>
                        <TableCell>Material</TableCell>
                        <TableCell>Load side</TableCell>
                        <TableCell>Secured</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loads.map((load, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TextField
                                    value={load.name}
                                    onChange={(e) => dispatch(handleLoadChange({ index, field: 'name', value: e.target.value }))}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
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
                                    checked={load.overhang}
                                    onChange={(e) => dispatch(handleLoadChange({ index, field: 'overhang', value: e.target.checked }))}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={load.material}
                                    onChange={(e) => dispatch(handleLoadChange({ index, field: 'material', value: e.target.value }))}
                                />
                            </TableCell>
                            <TableCell>
                                <Stack direction='row' alignItems='center'>
                                    <Typography>W</Typography>
                                    <Switch
                                        checked={load.loadSide === "L"}
                                        onChange={() => dispatch(handleLoadChange({ index, field: 'loadSide', value: load.loadSide === 'W' ? 'L' : "W" }))}
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
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Button onClick={() => dispatch(handleAddLoad)}><PlaylistAdd />{t('ui.button.table.newload')}</Button>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}