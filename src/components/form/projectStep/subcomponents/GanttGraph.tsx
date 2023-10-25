import { Box, useTheme, ButtonGroup, Button, IconButton, Select, MenuItem, Stack, Tooltip, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, useMediaQuery, Toolbar, AppBar } from "@mui/material";
import "gantt-task-react/dist/index.css";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { handleDateChanges, handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ViewListIcon from '@mui/icons-material/ViewList';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateCalendar, DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { IMilestones } from "../../../../features/interfaces";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/pl';

export default function GanttGraph(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [columnsWidth, setColumnWidth] = useState<number>(40)
    const [viewTaskList, setViewTaskList] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<string>('Month')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [dateEditDialogOpen, setDateEditDialogOpen] = useState(false);

    function handledateEditDialogOpen(task: Task) {
        if (editMode) {
            setSelectedTask(task);
            setDateEditDialogOpen(true);
        }
    };

    function handleDialogClose() {
        setDateEditDialogOpen(false);
        setSelectedTask(null);
    }

    const milestones: Task[] = (() => {
        return Object.entries(formData.project.milestones).map(([name, date]) => {
            const start = new Date(date.start);
            const end = new Date(date.end);
            return {
                id: name,
                name: t(`project.milestones.${name}`),
                start,
                end,
                type: (name === 'order' || name === 'launch') ? 'milestone' : 'task',
                progress: 0,
                isDisabled: !editMode || name === 'launch',
                styles: { backgroundColor: (name === 'order' || name === 'launch') ? theme.palette.secondary.main : theme.palette.primary.main },

            };
        });
    })();

    function CustomListTable({ tasks, setSelectedTask, selectedTaskId, rowHeight, }: { tasks: Task[]; setSelectedTask: (taskId: string) => void; selectedTaskId: string; rowHeight: number }) {

        const theme = useTheme();
        return (
            <TableContainer component={Paper} elevation={1} sx={{ border: 1, borderRight: 0, borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`, borderColor: theme.palette.divider, minWidth: '350px' }} >
                <Table>
                    <TableHead sx={{ height: rowHeight }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date Range</TableCell>
                            {editMode && <TableCell>Edit</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                onClick={() => setSelectedTask(task.id)}
                                selected={task.id === selectedTaskId}
                                style={{ height: rowHeight }}
                            >
                                <TableCell><Typography fontSize='85%'>{task.name}</Typography></TableCell>
                                <TableCell>
                                    <Typography fontSize='85%'>
                                        {
                                            task.type === 'milestone' ?
                                                task.start.toLocaleDateString()
                                                :
                                                `${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`
                                        }
                                    </Typography>
                                </TableCell>
                                {editMode &&
                                    <TableCell><IconButton size='small' onClick={() => handledateEditDialogOpen(task)}><EditIcon /></IconButton></TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }



    return (
        <Box position='relative' className={theme.palette.mode === 'dark' ? 'ganttchart-container-dark' : 'ganttchart-container'} sx={{ borderColor: theme.palette.divider }}>
            <Gantt
                tasks={milestones}
                barCornerRadius={theme.shape.borderRadius}
                barBackgroundSelectedColor={theme.palette.secondary.main}
                arrowIndent={40}
                todayColor={theme.palette.divider}
                viewMode={viewMode as ViewMode}
                // preStepsCount={0}
                locale='pl'
                fontSize=".75rem"
                listCellWidth={viewTaskList ? '100px' : ""}
                columnWidth={columnsWidth}
                TooltipContent={CustomTooltip}
                TaskListHeader={() => null}
                TaskListTable={CustomListTable}
                onDateChange={(task: Task) => {
                    const { id, start, end } = task;
                    dispatch(handleDateChanges({ id, start, end }));
                }}
                onDoubleClick={(task: Task) => handledateEditDialogOpen(task)}
            />
            <Box position='absolute' top='10%' right={25}>
                <SizeEditButtons columnsWidth={columnsWidth} setColumnWidth={setColumnWidth} viewTaskList={viewTaskList} setViewTaskList={setViewTaskList} viewMode={viewMode} setViewMode={setViewMode} />
            </Box>
            <DateEditDialog selectedTask={selectedTask} dateEditDialogOpen={dateEditDialogOpen} handleDialogClose={handleDialogClose} />
        </Box>
    )
}

function SizeEditButtons({ columnsWidth, setColumnWidth, viewTaskList, setViewTaskList, viewMode, setViewMode }: { columnsWidth: number, setColumnWidth: Dispatch<SetStateAction<number>>, viewTaskList: boolean, setViewTaskList: Dispatch<SetStateAction<boolean>>, viewMode: string, setViewMode: Dispatch<SetStateAction<string>> }) {
    return (
        <Grid container spacing={2} className="ganttchart-edit-buttons">
            <Grid item xs>
                <ButtonGroup size="small" variant="contained" color="primary" aria-label="chart-size-edit-buttons" disableElevation>
                    <Button onClick={() => setColumnWidth(columnsWidth + 5)}> <AddIcon /> </Button>
                    <Button onClick={() => setColumnWidth(columnsWidth - 5)}> <RemoveIcon /> </Button>
                    <Button onClick={() => setViewTaskList(!viewTaskList)}> <ViewListIcon /> </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs>
                <ButtonGroup size="small" variant="contained" color="primary" aria-label="chart-size-edit-buttons" disableElevation>
                    <Button onClick={() => setViewMode("Week")} variant='contained' color={viewMode === "Week" ? "info" : "primary"}>Week</Button>
                    <Button onClick={() => setViewMode("Month")} variant='contained' color={viewMode === "Month" ? "info" : "primary"}>Month</Button>
                    <Button onClick={() => setViewMode("Year")} variant='contained' color={viewMode === "Year" ? "info" : "primary"}>Year</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

function CustomTooltip({ task }: { task: Task }) {
    const theme = useTheme();
    return (
        <Paper sx={{ backgroundColor: theme.palette.background.default }} elevation={8}>
            <Stack spacing={1} p={2}>
                <Typography>{task.name}</Typography>
                <Typography fontSize='75%'>
                    {task.type === 'milestone' ?
                        task.start.toLocaleDateString()
                        :
                        `${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`
                    }
                </Typography>
            </Stack>
        </Paper>
    );
};

function DateEditDialog({ selectedTask, dateEditDialogOpen, handleDialogClose }: { selectedTask: Task | null, dateEditDialogOpen: boolean, handleDialogClose: () => void }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation();
    const formData = useSelector((state: RootState) => state.formData);
    const taskId = selectedTask?.id as keyof IMilestones

    if (selectedTask && formData.project.milestones[taskId]) {
        console.log(formData.project.milestones[taskId])
        return (
            <Dialog fullScreen={fullScreen} maxWidth='lg' open={dateEditDialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
                    <Toolbar>
                        <Stack direction='row' spacing={2} flex={1} alignItems='start' justifyContent='space-between'>
                            <Typography variant="h4" >
                                {t(`${selectedTask.name}`)}
                            </Typography>
                            <IconButton
                                color="inherit"
                                onClick={handleDialogClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                    <DialogContent>
                        {selectedTask.id === 'order' ?
                            (
                                <Grid container spacing={3} direction='row' mt={2}>
                                    <Grid item xs>
                                        <Stack spacing={1}>
                                            <Box flex={1} justifyContent='center'>
                                                <DateCalendar
                                                    displayWeekNumber
                                                    disablePast
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    value={dayjs(formData.project.milestones[taskId].start)}
                                                    onChange={(date) => dispatch(handleDateChanges({ id: selectedTask.id, start: date, end: date }))}
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
                                                    displayWeekNumber
                                                    disablePast
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    value={dayjs(formData.project.milestones[taskId].start)}
                                                    onChange={(date) => dispatch(handleDateChanges({ id: selectedTask.id, start: date, end: formData.project.milestones[taskId].end }))}
                                                />
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs>
                                        <Stack spacing={1}>
                                            <Typography textAlign='center' variant="h6">{t('ui.dialog.ganttGraph.end')}</Typography>
                                            <Box flex={1} justifyContent='center'>
                                                <DateCalendar
                                                    displayWeekNumber
                                                    // views={['month', 'year']}
                                                    // openTo="month"
                                                    disablePast
                                                    value={dayjs(formData.project.milestones[taskId].end)}
                                                    onChange={(date) => dispatch(handleDateChanges({ id: selectedTask.id, start: formData.project.milestones[taskId].start, end: date }))}
                                                />
                                            </Box>

                                        </Stack>
                                    </Grid>
                                </Grid >
                            )
                        }
                    </DialogContent >
                </LocalizationProvider >
            </Dialog >
        )
    } else {
        return (
            null
        )
    }
}
