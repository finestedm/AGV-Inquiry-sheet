import { Box, useTheme, ButtonGroup, Button, IconButton, Select, MenuItem, Stack, Tooltip, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, useMediaQuery, Toolbar, AppBar, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "gantt-task-react/dist/index.css";
import { Task, ViewMode } from "gantt-task-react";
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
import { ExtendedTask, IMilestones, TViewMode } from "../../../../features/interfaces";
import 'dayjs/locale/pl';
import DateEditDialog from "./DateEditDialog";
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import dayjs from "dayjs";
import milestonesLengths, { milestoneOrder } from "../../../../data/milestones";
import { customGreyPalette, customGreyPaletteDark } from "../../../../theme";
import { GanttComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Selection, Toolbar } from '@syncfusion/ej2-react-gantt';
import "wx-react-gantt/dist/gantt.css";


export default function GanttGraph(): JSX.Element {

    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [columnsWidth, setColumnsWidth] = useState<number>(70)
    const [currentViewMinColumnsWidth, setCurrentViewMinColumnsWidth] = useState<number>(50)
    const [decreaseColumnsWidthButtonDisabled, setDecreaseColumnsWidthButtonDisabled] = useState<boolean>(false)
    const [viewTaskList, setViewTaskList] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<TViewMode>('Month')
    const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null);
    const [dateEditDialogOpen, setDateEditDialogOpen] = useState(false);
    const taskListHeight = 50;
    const headerHeight = 60;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const minColumnsWidthPerView = { 'Week': 28, 'Month': 50, 'Year': 175 }
    const columnsWidthDifference = 5
    function handleColumnsWidth(increment: '+' | '-') {
        const newColumnsWidth = increment === '+' ? columnsWidth + columnsWidthDifference : columnsWidth - columnsWidthDifference
        newColumnsWidth > minColumnsWidthPerView[viewMode] && setColumnsWidth(newColumnsWidth);
    }

    // chack if width is not too small to decrease it further
    useEffect(() => {
        columnsWidth - columnsWidthDifference <= minColumnsWidthPerView[viewMode] ? setDecreaseColumnsWidthButtonDisabled(true) : setDecreaseColumnsWidthButtonDisabled(false)
    }, [columnsWidth])

    // set new minWidth of the current viewMode when it changes
    useEffect(() => {
        setColumnsWidth(minColumnsWidthPerView[viewMode])
        setCurrentViewMinColumnsWidth(minColumnsWidthPerView[viewMode])
    }, [viewMode])

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

    function handleDateChange(task: ExtendedTask) {
        const { id, start, end } = task;
        const dateState = formData.project.milestones;
        let updatedState = { ...dateState };
        const currentIndex = milestoneOrder.indexOf(id)
        function validateMilestone(milestone: keyof IMilestones) {
            const isOneDayMilestone = milestone === 'order' || milestone === 'launch';
            const previousMilestone = milestoneOrder[milestoneOrder.indexOf(milestone) - 1];
            const previousMilestoneEndDate = previousMilestone ? dayjs(updatedState[previousMilestone].end) : dayjs();

            // Set startDate based on whether it's the 'launch' milestone
            const startDate = milestone === 'launch'
                ? previousMilestoneEndDate
                : id === milestone
                    ? dayjs(start).isBefore(previousMilestoneEndDate) ? previousMilestoneEndDate : dayjs(start)
                    : dayjs(updatedState[milestone].start).isBefore(previousMilestoneEndDate) ? previousMilestoneEndDate : dayjs(updatedState[milestone].start);

            const endDate = isOneDayMilestone
                ? startDate
                : id === milestone
                    ? dayjs(end).diff(startDate, 'months') < milestonesLengths[milestone].min ? startDate.add(milestonesLengths[milestone].min, 'month') : dayjs(end)
                    : dayjs(updatedState[milestone].end).diff(startDate, 'months') < milestonesLengths[milestone].min ? startDate.add(milestonesLengths[milestone].min, 'month') : dayjs(updatedState[milestone].end);

            updatedState = {
                ...updatedState,
                [milestone]: {
                    start: startDate.toDate(),
                    end: endDate.toDate()
                }
            };
        }

        milestoneOrder.slice(currentIndex).forEach((milestone) => {
            validateMilestone(milestone)
        })

        dispatch(handleDateChanges(updatedState))

    }

    function backgroundColorForTaskType(name: keyof IMilestones) {
        switch (name) {
            case 'order':
                return theme.palette.error.main;
            case 'launch':
                return theme.palette.success.main;
            default:
                return theme.palette.mode === 'light' ? customGreyPalette[500] : customGreyPaletteDark[500]
        }
    }


    const milestones: Task[] = (() => {
        const milestoneEntries = Object.entries(formData.project.milestones);
        return milestoneEntries.map(([name, date], index) => {
            const start = new Date(date.start);
            let end = new Date(date.end);
            return {
                TaskID: name,
                TaskName: t(`project.milestones.${name}`),
                StartDate: start,
                EndDate: end,
                Predecessor: index > 0 ? milestoneEntries[index - 1][0] : undefined,
            }
        });
    })();

    const taskFields: any = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        dependency: 'Predecessor',
    };

    const editSettings = {
        allowEditing: editMode,
        // allowTaskbarEditing: true,
        allowAdding: false, // Disable adding new tasks if not supported
        allowDeleting: false, // Disable deletion

    };
    

    const timelineSettings = {
        timelineViewMode: viewMode,
        timelineUnitSize: 80,
        showTooltip: true
    };

    const toolbarOptions = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];

    const splitterSettings = {
        position: "40%"
    };
    
   

    function CustomListTable() {

        const theme = useTheme();
        return (
            <Paper elevation={1} sx={{ border: 1, borderColor: theme.palette.divider, overflow: 'hidden', minWidth: 300 }}>
                <TableContainer component={Box} >
                    <Table>
                        <TableHead sx={{ height: headerHeight + 1 }}>
                            <TableRow >
                                <TableCell>{t('ganttGraph.tableHeader.step')}</TableCell>
                                <TableCell>{t('ganttGraph.tableHeader.dateRange')}</TableCell>
                                {editMode && <TableCell>{t('ganttGraph.tableHeader.edit')}</TableCell>}
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

    function handleRecordDoubleClick(args: any) {
        const taskData = args.rowData;
        if (editMode && !isTaskUneditable(taskData.TaskID as keyof IMilestones)) {
            setSelectedTask(taskData);
            setDateEditDialogOpen(true);
        }
    }

    return (
        <Stack spacing={2} className={theme.palette.mode === 'dark' ? 'ganttchart-container-dark' : 'ganttchart-container'} >
            <SizeEditButtons decreaseColumnsWidthButtonDisabled={decreaseColumnsWidthButtonDisabled} handleColumnsWidth={handleColumnsWidth} viewMode={viewMode} setViewMode={setViewMode} />
            <Box>
                <GanttComponent
                    dataSource={milestones}
                    taskFields={taskFields}
                    editSettings={editSettings}
                    allowSelection={true}
                    timelineSettings={timelineSettings}
                    toolbar={toolbarOptions}
                    splitterSettings={splitterSettings} 
                    recordDoubleClick={(args) => handleRecordDoubleClick(args)}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='TaskName' textAlign="Left"/>
                        <ColumnDirective field='StartDate' textAlign="Left" width={70} />
                        <ColumnDirective field='EndDate' textAlign="Left" width={70}/>
                    </ColumnsDirective>
                    <Inject services={[Edit, Selection, Toolbar]} />
                </GanttComponent>

            </Box>
            {selectedTask && <DateEditDialog selectedTask={selectedTask} dateEditDialogOpen={dateEditDialogOpen} handleDialogClose={handleDialogClose} />}
        </Stack >
    )
}

function SizeEditButtons({ handleColumnsWidth, viewMode, setViewMode, decreaseColumnsWidthButtonDisabled }: { handleColumnsWidth: (increment: "+" | "-") => void, viewMode: TViewMode, setViewMode: Dispatch<SetStateAction<TViewMode>>, decreaseColumnsWidthButtonDisabled: boolean }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation()

    function ViewModeIcon({ viewModeSet, ...props }: { viewModeSet: TViewMode }) {
        return (
            <ToggleButton {...props} value={viewModeSet} selected={viewMode === viewModeSet} className='buttongroup-deep' color="primary">{t(`ganttGraph.timeSizeToggleButton.${viewModeSet}`)}</ToggleButton>
        )
    }

    return (
        <Stack direction="row" spacing={2} className="ganttchart-edit-buttons" justifyContent={isMobile ? 'space-between' : 'end'}>
            <Box>
                <ButtonGroup variant="outlined" color="primary" aria-label="chart-size-edit-buttons" disableElevation>
                    <Button onClick={() => handleColumnsWidth('+')}> <AddIcon /> </Button>
                    <Button onClick={() => handleColumnsWidth('-')} disabled={decreaseColumnsWidthButtonDisabled}> <RemoveIcon /> </Button>
                </ButtonGroup>
            </Box>
            <Box>
                <ToggleButtonGroup
                    size="small"
                    color="primary"
                    onChange={(e: any) => setViewMode(e.target.value)}
                    aria-label="chart-size-edit-buttons"
                >
                    <ViewModeIcon viewModeSet='Week' />
                    <ViewModeIcon viewModeSet='Month' />
                    <ViewModeIcon viewModeSet='Year' />
                </ToggleButtonGroup>
            </Box>
        </Stack>
    )
}

function CustomTooltip({ task }: { task: Task }) {
    const theme = useTheme();
    function formatWeeks(): string {
        const milestoneDurationInDays = dayjs(task.end).diff(task.start, 'days');
        const weeks = Math.floor(milestoneDurationInDays / 7);
        const leftoverDays = milestoneDurationInDays % 7;

        return weeks > 0
            ? `${weeks} week${weeks > 1 ? 's' : ''}${leftoverDays > 0 ? ' + ' : ''}`
            : `${leftoverDays} day${leftoverDays > 1 ? 's' : ''}`;
    }

    return (
        <Paper sx={{ backgroundColor: theme.palette.background.default }} elevation={8}>
            <Stack spacing={1} p={2}>
                <Typography>{task.name}</Typography>
                <Typography fontSize='75%'>
                    {task.type === 'milestone' ?
                        task.start.toLocaleDateString()
                        :
                        `${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()} (${formatWeeks()})`
                    }
                </Typography>
            </Stack>
        </Paper>
    );
};