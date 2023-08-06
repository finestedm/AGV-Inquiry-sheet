import { Button, Checkbox, InputAdornment, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PlaylistAdd } from "@mui/icons-material";
import { IFormData, IHandleAddLoad, IHandleLoadChange, ILoad } from "../features/interfaces";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";

export default function LoadTable({ loads, handleLoadChange, handleAddLoad }: { loads: ILoad[], handleLoadChange: IHandleLoadChange, handleAddLoad: IHandleAddLoad },) {
    const { t } = useTranslation()
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
                                    onChange={(e) => handleLoadChange(index, 'name', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={trimLeadingZeros(load.length)}
                                    onChange={(e) => handleLoadChange(index, 'length', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'width', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'height', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'L2', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'W2', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'W3', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'weightMin', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'weightMax', Number(e.target.value))}
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
                                    onChange={(e) => handleLoadChange(index, 'overhang', e.target.checked)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={load.material}
                                    onChange={(e) => handleLoadChange(index, 'material', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Stack direction='row' alignItems='center'>
                                    <Typography>W</Typography>
                                    <Switch
                                        checked={load.loadSide === "L"}
                                        onChange={() => handleLoadChange(index, 'loadSide', load.loadSide === 'W' ? 'L' : "W")}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography>L</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={load.secured}
                                    onChange={(e) => handleLoadChange(index, 'secured', e.target.checked)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Button onClick={handleAddLoad}><PlaylistAdd />{t('ui.button.table.newload')}</Button>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}