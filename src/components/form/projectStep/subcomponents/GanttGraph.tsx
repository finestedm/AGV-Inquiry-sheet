import { Box, useTheme } from "@mui/material";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";

export default function GanttGraph() {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

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
                progress: 0
            };
        });
    })();

    return (
        <Box>
            <Gantt
                tasks={milestones}
                barCornerRadius={theme.shape.borderRadius}
                viewMode={'Month' as ViewMode}
                preStepsCount={0}
                locale='pl'
                fontSize=".75rem"
                listCellWidth='0'
                onDateChange={(task: Task) => {
                    const { id, start, end } = task;
                    const pathStart = `project.milestones.${id}.start`
                    const pathEnd = `project.milestones.${id}.end`
                    dispatch(handleInputMethod({ path: pathStart, value: start }));
                    dispatch(handleInputMethod({ path: pathEnd, value: end }));
                }}
            />
        </Box>
    )
}