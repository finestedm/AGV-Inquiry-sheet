import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Paper, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemData, ISystems } from "../../../../features/interfaces";
import BoxForTextPair from "./BoxForTextPair";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import FormSystemStep from "../../systemStep/FormSystemStep";
import { useState } from "react";

export default function SystemsTabs() {
    const currentStep = useSelector((state: RootState) => state.steps);
    const selectedSystems = useSelector((state: RootState) => (
        Object.entries(state.formData.system)
            .filter(([systemName, systemData]) => systemData.selected)
            .map(([systemName]) => systemName)
    )) as (keyof ISystems)[];

    const { t } = useTranslation();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const TabPanel: React.FC<{ value: number; index: number; selectedSystem: keyof ISystems; children: React.ReactNode }> = ({ value, index, selectedSystem, children }) => (
        <div role="tabpanel" hidden={value !== index}>
          {value === index && (
            <Box p={3}>
              {children}
            </Box>
          )}
        </div>
      );

    return (
        <div>
            <Tabs value={value} onChange={handleChange} sx={{borderBottom: `1px solid ${theme.palette.divider}`}} >
                {selectedSystems.map((system, index) => (
                    <Tab key={index} label={t(`steps.${system}`)} />
                ))}
            </Tabs>
            {selectedSystems.map((system, index) => (
                <TabPanel key={index} value={value} index={index} selectedSystem={system}>
                    <FormSystemStep selectedSystem={system} />
                </TabPanel>
            ))}
        </div>
    );
}