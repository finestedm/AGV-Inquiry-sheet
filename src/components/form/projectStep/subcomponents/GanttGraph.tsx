import { Box, useTheme, ButtonGroup, Button, IconButton, Select, MenuItem, Stack } from "@mui/material";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { handleDateChanges, handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function GanttGraph(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();
    const [columnsWidth, setColumnWidth] = useState<number>(40)
    const [viewTaskList, setViewTaskList] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<string>('Month')

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
                isDisabled: name === 'launch',
                styles: { backgroundColor: (name === 'order' || name === 'launch') ? theme.palette.secondary.main : theme.palette.primary.main },
            };
        });
    })();

    return (
        <Box position='relative' className='ganntchart-container'>
            <Gantt
                tasks={milestones}
                barCornerRadius={theme.shape.borderRadius}
                viewMode={viewMode as ViewMode}
                preStepsCount={0}
                locale='pl'
                fontSize=".75rem"
                listCellWidth={viewTaskList ? '100px' : ""}
                columnWidth={columnsWidth}
                onDateChange={(task: Task) => {
                    const { id, start, end } = task;
                    dispatch(handleDateChanges({ id, start, end }));
                }}
            />
            <Box position='absolute' top='10%' right={25}>
                <SizeEditButtons columnsWidth={columnsWidth} setColumnWidth={setColumnWidth} viewTaskList={viewTaskList} setViewTaskList={setViewTaskList} viewMode={viewMode} setViewMode={setViewMode} />
            </Box>
        </Box>
    )
}

function SizeEditButtons({ columnsWidth, setColumnWidth, viewTaskList, setViewTaskList, viewMode, setViewMode }: { columnsWidth: number, setColumnWidth: Dispatch<SetStateAction<number>>, viewTaskList: boolean, setViewTaskList: Dispatch<SetStateAction<boolean>>, viewMode: string, setViewMode: Dispatch<SetStateAction<string>> }) {
    return (
        <Stack direction='row' spacing={2} className="ganttchart-edit-buttons">
            <ButtonGroup size="small" variant="contained" color="primary" aria-label="chart-size-edit-buttons" disableElevation>
                <Button onClick={() => setColumnWidth(columnsWidth + 5)}> <AddIcon /> </Button>
                <Button onClick={() => setColumnWidth(columnsWidth - 5)}> <RemoveIcon /> </Button>
                <Button onClick={() => setViewTaskList(!viewTaskList)}> <ViewListIcon /> </Button>
            </ButtonGroup>
            <ButtonGroup size="small" variant="contained" color="primary" aria-label="chart-size-edit-buttons" disableElevation>
                <Button onClick={() => setViewMode("Week")} variant='contained' color={viewMode === "Week" ? "info" : "primary"}>Week</Button>
                <Button onClick={() => setViewMode("Month")} variant='contained' color={viewMode === "Month" ? "info" : "primary"}>Month</Button>
                <Button onClick={() => setViewMode("Year")} variant='contained' color={viewMode === "Year" ? "info" : "primary"}>Year</Button>
            </ButtonGroup>

        </Stack>
    )
}