import { Box, useTheme } from "@mui/material";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";

export default function GanntGraph() {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

    const milestones: Task[] = (() => {
        return Object.entries(formData.project.milestones).map(([name, date], index, array) => {
            const start = index > 0 ? new Date(array[index - 1][1]) : new Date();
            const end = new Date(date);
            return { id: name, name: t(`project.milestones.${name}`), start, end, type: 'task', progress: 0 };
        });
    })();

    return (
        <Box>
            <Gantt
                tasks={milestones}
                barCornerRadius={theme.shape.borderRadius}
                viewMode={'Month' as ViewMode}
                listCellWidth=''
                onDateChange={task => {
                    const { id, start, end } = task;
                    const path = `project.milestones.${id}`
                    console.log(id, start, end)
                    dispatch(handleInputMethod({ path, value: end }));
                }}
            />
        </Box>
    )
}