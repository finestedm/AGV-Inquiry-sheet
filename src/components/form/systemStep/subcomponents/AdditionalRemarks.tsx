import { useSelector } from "react-redux";
import { ISystems } from "../../../../features/interfaces";
import { RootState } from "../../../../features/redux/store";
import { useDispatch } from "react-redux";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../CustomTextField";
import InputGroup from "../../InputGroup";

export default function AdditionalRemarks({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';

    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.additionalRemarks`)}
            content={
                <Box>
                    <CustomTextField
                        disabled={!editMode}
                        fieldName={`system.${selectedSystem}.additionalRemarks`}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>
            }
        />
    )
}