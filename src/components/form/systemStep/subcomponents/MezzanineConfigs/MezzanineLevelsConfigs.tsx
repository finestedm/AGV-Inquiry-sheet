import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import LevelsConfigTable from "../RackConfigs/LevelsConfigTable";
import { ISystems } from "../../../../../features/interfaces";
import LevelConfigDrawing from "../RackConfigs/LevelConfigDrawing";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/redux/store";
import { useTranslation } from "react-i18next";
import InputGroup from "../../../InputGroup";
import { t } from "i18next";

export default function MezzanineLevelsConfigs({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const formData = useSelector((state: RootState) => state.formData)
    const levelConfigs = formData.system[selectedSystem].levelConfigs
    const selectedLevelConfig = selectedSystem === 'mezzanine' && levelConfigs.length > 0 && levelConfigs[0]
    const theme = useTheme();

    console.log(selectedLevelConfig)

    if (selectedSystem === 'mezzanine') {
        return (
            <InputGroup
                title={t(`system.subheader.mezzanineConfigs`)}
                content={
                    <Stack spacing={2}>
                        <Box>
                            <LevelsConfigTable selectedSystem={selectedSystem} configId={levelConfigs[0].id} />
                        </Box>
                        <Box sx={{ px: 2 }}>
                            <Typography gutterBottom variant="h6" color="textPrimary">Podgląd</Typography>
                            {selectedLevelConfig && <LevelConfigDrawing selectedSystem={selectedSystem} levels={selectedLevelConfig.levels} />}
                        </Box>
                    </Stack>
                }
            />
        )
    } else {
        return null
    }
}