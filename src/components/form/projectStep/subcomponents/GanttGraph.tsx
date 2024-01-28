import { Box, useTheme, ButtonGroup, Button, IconButton, Select, MenuItem, Stack, Tooltip, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, useMediaQuery, Toolbar, AppBar, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
import { ExtendedTask, IMilestones, TViewMode } from "../../../../features/interfaces";
import 'dayjs/locale/pl';
import DateEditDialog from "./DateEditDialog";
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import dayjs from "dayjs";
import milestonesLengths, { milestoneOrder } from "../../../../data/milestones";
import { customGreyPalette, customGreyPaletteDark } from "../../../../theme";
import tinycolor from "tinycolor2";

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
    const minColumnsWidthPerView = { 'Week': 35, 'Month': 60, 'Year': 200 }
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
            const isOneDayMilestone = milestone === 'order' || milestone === 'launch'
            const previousMilestone = milestoneOrder[milestoneOrder.indexOf(milestone) - 1]
            const previousMilestoneEndDate = previousMilestone ? dayjs(updatedState[previousMilestone].end) : dayjs() //get reference to the end date of the previous milestone
            const startDate = id === milestone  // check if currently we are checking the current step or are we in another iteration and checking another steps (if another step then we try to maintain the lenght of it)
                ? dayjs(start).isBefore(previousMilestoneEndDate) ? previousMilestoneEndDate : dayjs(start)
                : dayjs(updatedState[milestone].start).isBefore(previousMilestoneEndDate) ? previousMilestoneEndDate : dayjs(updatedState[milestone].start)
            // compare end of previous milestone with start date of current milestone

            const endDate = isOneDayMilestone   // if one day milestone, end date the same as start
                ? startDate
                : id === milestone  // check if currently we are checking the current step or are we in another iteration and checking another steps (if another step then we try to maintain the lenght of it)
                    ? dayjs(end).diff(startDate, 'months') < milestonesLengths[milestone].min ? startDate.add(milestonesLengths[milestone].min, 'month') : dayjs(end) // if not one day milestone, add 1 month to start date if currently it is not longer than 1 month
                    : dayjs(updatedState[milestone].end).diff(startDate, 'months') < milestonesLengths[milestone].min ? startDate.add(milestonesLengths[milestone].min, 'month') : dayjs(updatedState[milestone].end)


            updatedState = {
                ...updatedState,
                [milestone]: {
                    start: startDate.toDate(),
                    end: endDate.toDate()
                }
            }
        }
        milestoneOrder.slice(currentIndex).forEach((milestone) => {
            validateMilestone(milestone)
        })

        dispatch(handleDateChanges(updatedState))

    }

    //change months names into ligits
    // useEffect(() => {
    //     const ganttHeader = document.getElementsByClassName('calendar')[0]
    //     const textElements = ganttHeader.querySelectorAll('text');
    //     const monthMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
    //     textElements.forEach((textElement, index) => {
    //         const monthNumber = index % 12 + 1; // Adjusting for the repeated months
    //         textElement.textContent = monthMap[monthNumber];
    //     });
    // }, [viewMode])

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
        return Object.entries(formData.project.milestones).map(([name, date]) => {
            const start = new Date(date.start);
            const end = new Date(date.end);
            const previousMilestone = milestoneOrder[milestoneOrder.indexOf(name as keyof IMilestones) - 1]
            return {
                id: name,
                dependencies: name === 'concept' ? [] : [previousMilestone],
                rowHeight: taskListHeight - 2,
                name: t(`project.milestones.${name}`),
                start,
                end,
                type: (name === 'order' || name === 'launch') ? 'milestone' : 'task',
                progress: 0,
                isDisabled: !editMode || isTaskUneditable(name as keyof IMilestones),
                styles: { backgroundColor: backgroundColorForTaskType(name as keyof IMilestones) }
            };
        });
    })();

    function CustomListTable() {

        const theme = useTheme();
        return (
            <Paper elevation={1} sx={{ border: 1, borderColor: theme.palette.divider, backgroundColor: theme.palette.background.default }}>
                <TableContainer component={Box} >
                    <Table>
                        <TableHead sx={{ height: headerHeight + 1 }}>
                            <TableRow >
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
        <Stack spacing={2} className={theme.palette.mode === 'dark' ? 'ganttchart-container-dark' : 'ganttchart-container'} >
            <SizeEditButtons decreaseColumnsWidthButtonDisabled={decreaseColumnsWidthButtonDisabled} handleColumnsWidth={handleColumnsWidth} viewMode={viewMode} setViewMode={setViewMode} />
            <Box>
                <Grid container spacing={0} rowGap={2} justifyContent='space-between' sx={{ display: 'flex', flexDirection: 'column', [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: { flexDirection: 'row' } }}>
                    {viewTaskList &&
                        <Grid item xs={12} lg={4} sx={{ flexBasis: 'auto' }}><CustomListTable /></Grid>
                    }
                    <Grid item xs={12} lg={viewTaskList ? 7 : 12} position='relative' sx={{ flexBasis: 'auto' }}>
                        <Box border={1} sx={{ borderColor: theme.palette.divider, borderRadius: theme.shape.borderRadius / 4, overflow: 'hidden' }}>
                            <Gantt
                                tasks={milestones}
                                barCornerRadius={theme.shape.borderRadius }
                                barBackgroundSelectedColor={theme.palette.primary.main}
                                arrowIndent={40}
                                todayColor={theme.palette.mode === 'light' ? tinycolor(theme.palette.secondary.main).setAlpha(.5).toHex8String() : tinycolor(theme.palette.secondary.main).setAlpha(.5).toHex8String()}
                                viewMode={viewMode as ViewMode}
                                preStepsCount={2}
                                locale={currentLanguage}
                                fontSize=".75rem"
                                listCellWidth={viewTaskList ? '100px' : ""}
                                columnWidth={columnsWidth}
                                TooltipContent={CustomTooltip}
                                TaskListHeader={() => null}
                                headerHeight={headerHeight}
                                TaskListTable={() => null}
                                onDateChange={(task: Task) => handleDateChange(task as ExtendedTask)}
                                onDoubleClick={(task: Task) => !isTaskUneditable(task.id as keyof IMilestones) && handleDateEditDialogOpen(task as ExtendedTask)}
                            />
                        </Box>
                        {!isMobile &&
                            <Box position='absolute' top='50%' left={-10}>
                                <Button variant='contained' disableElevation onClick={() => setViewTaskList(!viewTaskList)}><SwitchRightIcon /></Button>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
            {selectedTask && <DateEditDialog selectedTask={selectedTask} dateEditDialogOpen={dateEditDialogOpen} handleDialogClose={handleDialogClose} />}
        </Stack >
    )
}

function SizeEditButtons({ handleColumnsWidth, viewMode, setViewMode, decreaseColumnsWidthButtonDisabled }: { handleColumnsWidth: (increment: "+" | "-") => void, viewMode: TViewMode, setViewMode: Dispatch<SetStateAction<TViewMode>>, decreaseColumnsWidthButtonDisabled: boolean }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    function ViewModeIcon({ viewModeSet, ...props }: { viewModeSet: TViewMode }) {
        return (
            <ToggleButton {...props} value={viewModeSet} selected={viewMode === viewModeSet} className='buttongroup-deep' color="primary">{viewModeSet}</ToggleButton>
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