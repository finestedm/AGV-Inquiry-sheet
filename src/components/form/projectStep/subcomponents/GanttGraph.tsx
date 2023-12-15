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
import { ExtendedTask, IMilestones } from "../../../../features/interfaces";
import { Chart } from "react-google-charts";
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

    const uneditableTasks: (keyof IMilestones)[] = ['launch' as keyof IMilestones]

    function isTaskUneditable(task: keyof IMilestones) {
        return uneditableTasks.includes(task)
    }

    function handledateEditDialogOpen(task: ExtendedTask) {
        if (editMode) {
            setSelectedTask(task);
            setDateEditDialogOpen(true);
        }
    };

    function handleDialogClose() {
        setDateEditDialogOpen(false);
        setSelectedTask(null);
    }

    function CustomListTable() {
        return (
            <TableContainer component={Paper} elevation={1} sx={{ border: 1, borderRight: 0, borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`, borderColor: theme.palette.divider, minWidth: '350px' }} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date Range</TableCell>
                            {editMode && <TableCell>Edit</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {milestones.map((task) => (
                            <TableRow
                            >
                                <TableCell><Typography fontSize='85%'>{task[0]?.toString()}</Typography></TableCell>
                                <TableCell>
                                    <Typography fontSize='85%'>

                                        `${task[3]?.toLocaleString()} - ${task[4]?.toLocaleString()}`
                                    </Typography>
                                </TableCell>
                                {editMode &&
                                    <TableCell>
                                        <IconButton
                                            size='small'
                                            disabled={isTaskUneditable(task[0] as keyof IMilestones)}
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
        );
    }


    const milestones = (() => {
        return Object.entries(formData.project.milestones).map(([name, date]) => {
            let start = new Date(date.start);
            let end = new Date(date.end);

            // If start and end dates are the same, add 24 hours to the end date
            if (start.getTime() === end.getTime()) {
                end = new Date(end.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds
            }

            return [
                name,
                t(`project.milestones.${name}`),
                name,
                start,
                end,
                null,
                0,
                null
            ];
        });
    })();


    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },

    ];

    const data = [columns, ...milestones]

    return (
        <Box position='relative' className={theme.palette.mode === 'dark' ? 'ganttchart-container-dark' : 'ganttchart-container'} sx={{ borderColor: theme.palette.divider }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Chart
                        chartType="Gantt"
                        width='100%'
                        data={data}
                        options={{ height: 275 }}
                    />
                </Grid>
                <Grid item xs>
                    <CustomListTable />
                </Grid>
            </Grid>
            <Box position='absolute' top='10%' right={25}>
                <SizeEditButtons columnsWidth={columnsWidth} setColumnWidth={setColumnWidth} viewTaskList={viewTaskList} setViewTaskList={setViewTaskList} viewMode={viewMode} setViewMode={setViewMode} />
            </Box>
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