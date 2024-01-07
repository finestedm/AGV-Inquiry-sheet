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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ExtendedTask, IMilestones } from "../../../../features/interfaces";
import 'dayjs/locale/pl';
import DateEditDialog from "./DateEditDialog";

export default function GanttGraph(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [columnsWidth, setColumnWidth] = useState<number>(40)
    const [viewTaskList, setViewTaskList] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<string>('Month')
    const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null);
    const [dateEditDialogOpen, setDateEditDialogOpen] = useState(false);
    const taskListHeight = 50;
    const headerHeight = 60;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const uneditableTasks: (keyof IMilestones)[] = ['launch' as keyof IMilestones]

    function isTaskUneditable(task: keyof IMilestones) {
        return uneditableTasks.includes(task)
    }

    function handleDateEditDialogOpen(task: ExtendedTask) {
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
                rowHeight: taskListHeight - 3,
                name: t(`project.milestones.${name}`),
                start,
                end,
                type: (name === 'order' || name === 'launch') ? 'milestone' : 'task',
                progress: 0,
                isDisabled: !editMode || isTaskUneditable(name as keyof IMilestones),
                styles: { backgroundColor: (name === 'order' || name === 'launch') ? theme.palette.secondary.main : theme.palette.primary.main },
            };
        });
    })();

    function CustomListTable() {

        const theme = useTheme();
        return (
            <Paper elevation={0} sx={{ borderRadius: theme.shape.borderRadius, border: 1, borderColor: theme.palette.divider }}>
                <TableContainer component={Box} >
                    <Table>
                        <TableHead sx={{ height: headerHeight }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date Range</TableCell>
                                {editMode && <TableCell>Edit</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {milestones.map((task) => (
                                <TableRow
                                    key={task.id}
                                    style={{ height: taskListHeight }}
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
                                        <TableCell>
                                            <IconButton
                                                size='small'
                                                disabled={isTaskUneditable(task.id as keyof IMilestones)}
                                                onClick={() => handleDateEditDialogOpen(task as ExtendedTask)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        );
    }

    return (
        <Box className={theme.palette.mode === 'dark' ? 'ganttchart-container-dark' : 'ganttchart-container'} >
            <Grid container >
                <Grid item xs={12} lg={4}><CustomListTable /></Grid>
                <Grid item xs={12} lg={8} position='relative'>
                    <Box border={1} sx={{ borderColor: theme.palette.divider }}>
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
                            headerHeight={headerHeight}
                            TaskListTable={() => null}
                            onDateChange={(task: Task) => {
                                const { id, start, end } = task;
                                dispatch(handleDateChanges({ id, start, end }));
                            }}
                            onDoubleClick={(task: Task) => !isTaskUneditable(task.id as keyof IMilestones) && handleDateEditDialogOpen(task as ExtendedTask)}
                        />
                    </Box>
                    <Box position='absolute' top='10%' right={25}>
                        <SizeEditButtons columnsWidth={columnsWidth} setColumnWidth={setColumnWidth} viewTaskList={viewTaskList} setViewTaskList={setViewTaskList} viewMode={viewMode} setViewMode={setViewMode} />
                    </Box>
                    <Box position='absolute' top='50%' left={-5}>
                        <Button variant='contained' onClick={() => console.log('eee')}>eeeee </Button>
                    </Box>
                </Grid>
            </Grid>
            {selectedTask && <DateEditDialog selectedTask={selectedTask} dateEditDialogOpen={dateEditDialogOpen} handleDialogClose={handleDialogClose} />}
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
