import { Avatar, Box, Chip, Typography } from "@mui/material";
import { IEquipment } from "../../../../features/interfaces";
import DoorSlidingSharpIcon from '@mui/icons-material/DoorSlidingSharp';
import ConstructionIcon from '@mui/icons-material/Construction';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import tinycolor from "tinycolor2";
import { useTranslation } from "react-i18next";

export default function EquipmentChip({ equipment }: { equipment: IEquipment }) {

    const chipColor = equipment.color;
    const chipSupplementColor = tinycolor(equipment.color).darken(50).toString();
    const {t} = useTranslation();

    function equipmentIcon() {
        switch (equipment.type) {
            case 'gate':
                return <DoorSlidingSharpIcon sx={{ fontSize: 'small', fill: chipSupplementColor, }} />;
            case 'wall':
                return <ConstructionIcon sx={{ fontSize: 'small', fill: chipSupplementColor, }} />;
            case 'dock':
                return <SystemUpdateAltIcon sx={{ fontSize: 'small', fill: chipSupplementColor, }} />;
            default:
                return <QuestionMarkIcon sx={{ fontSize: 'small', fill: chipSupplementColor, }} />;
        }
    }

    return (
        <Box>
            <Chip
                icon={equipmentIcon()}
                label={t(`system.building.equipment.${equipment.type}`, { defaultValue: equipment.type })}
                sx={{ background: chipColor, color: chipSupplementColor, textTransform: "capitalize" }}
                variant="filled"
                size="small"
            />
        </Box>
    )
}