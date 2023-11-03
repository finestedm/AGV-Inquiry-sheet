import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { ExtendedTask, IMilestones } from "../../../../features/interfaces";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { handleDateChanges } from "../../../../features/redux/reducers/formDataSlice";

export default function DateEditDialog({ selectedTask, dateEditDialogOpen, handleDialogClose }: { selectedTask: ExtendedTask, dateEditDialogOpen: boolean, handleDialogClose: () => void }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation();
    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const taskId = selectedTask.id as keyof IMilestones
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(formData.project.milestones[taskId].start) || dayjs(new Date()))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(formData.project.milestones[taskId].end) || dayjs(new Date()))
    const { i18n } = useTranslation();

    function handleAcceptNewDates() {
        dispatch(handleDateChanges({ id: selectedTask.id, start: startDate, end: endDate }))
        handleDialogClose()
    }

    if (selectedTask && formData.project.milestones[taskId]) {
        return (
            <Dialog fullScreen={fullScreen} maxWidth='lg' open={dateEditDialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
                    <Typography variant="h5" >
                        {t(`${selectedTask.name}`)}
                    </Typography>
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
                    <DialogContent>
                        {selectedTask.id === 'order' ?
                            (
                                <Grid container spacing={3} direction='row' mt={2}>
                                    <Grid item xs>
                                        <Stack spacing={1}>
                                            <Box flex={1} justifyContent='center'>
                                                <DateCalendar
                                                    disabled={!editMode}
                                                    displayWeekNumber
                                                    disablePast
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    value={startDate}
                                                    onChange={(date) => date && setStartDate(date)}
                                                />
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container spacing={3} direction='row' mt={2}>
                                    <Grid item xs>
                                        <Stack spacing={1}>
                                            <Typography textAlign='center' variant="h6">{t('ui.dialog.ganttGraph.start')}</Typography>
                                            <Box flex={1} justifyContent='center'>
                                                <DateCalendar
                                                    disabled={!editMode}
                                                    displayWeekNumber
                                                    disablePast
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    value={startDate}
                                                    onChange={(date) => date && setStartDate(date)}
                                                // onChange={(date) => dispatch(handleDateChanges({ id: selectedTask.id, start: date, end: formData.project.milestones[taskId].end }))}
                                                />
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs>
                                        <Stack spacing={1}>
                                            <Typography textAlign='center' variant="h6">{t('ui.dialog.ganttGraph.end')}</Typography>
                                            <Box flex={1} justifyContent='center'>
                                                <DateCalendar
                                                    disabled={!editMode}
                                                    displayWeekNumber
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    disablePast
                                                    value={endDate}
                                                    onChange={(date) => date && setEndDate(date)}
                                                // onChange={(date) => dispatch(handleDateChanges({ id: selectedTask.id, start: formData.project.milestones[taskId].start, end: date }))}
                                                />
                                            </Box>

                                        </Stack>
                                    </Grid>
                                </Grid >
                            )
                        }
                    </DialogContent >
                    <DialogActions>
                        <Button autoFocus disabled={!editMode} onClick={handleAcceptNewDates} color="secondary">
                            {t('ui.button.dateEditDialog.accept')}
                        </Button>
                        <Button onClick={handleDialogClose} autoFocus >
                            {t('ui.button.dateEditDialog.cancel')}
                        </Button>
                    </DialogActions>
                </LocalizationProvider >
            </Dialog >
        )
    } else {
        return (
            null
        )
    }
}
