import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import EquipmentDetailsEditingDialog from "./EqupmentDetailsEditingDialog";
import tinycolor from "tinycolor2";

export default function EquipmentDetails({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const warehouseEquipment = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding.equipment)
    const theme = useTheme()
    const darkMode = useSelector((state: RootState) => state.darkMode)
    const [equipmentDetailsEditingDialogOpen, setEquipmentDetailsEditingDialogOpen] = useState(false)
    const [selectedEq, setSelectedEq] = useState(0);

    function handleOpeningEqDetailsDialog(id: IEquipment["id"]) {
        setSelectedEq(id)
    }

    function handleClosingEqDetailsDialog() {
        setSelectedEq(0)
    }

    useEffect(() => {
        selectedEq !== 0
            ?
            setEquipmentDetailsEditingDialogOpen(true)
            :
            setEquipmentDetailsEditingDialogOpen(false)
    }, [selectedEq])

    return (
        <Box>
            <Stack
                direction='row'
                spacing={2}
                sx={{
                    overflowX: 'scroll',
                    scrollbarWidth: 'none', // For Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // For Chrome, Safari, and Edge
                    },
                }}>
                {warehouseEquipment.map(eq =>
                    <Chip
                        sx={{
                            backgroundColor: tinycolor(eq.color).setAlpha(.25).toHex8String(),
                            color: darkMode ? tinycolor(eq.color).brighten(25).toHex8String() : tinycolor(eq.color).darken(20).toHex8String(),
                        }}
                        label={<Typography variant="caption"><Typography fontWeight={700} variant="caption">{eq.type}</Typography>, {eq.height} x {eq.width}, H={eq.zHeight} </Typography>}
                        deleteIcon={
                            <Box
                                sx={{
                                    backgroundColor: tinycolor(eq.color).setAlpha(.25).toHex8String(),
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 24,
                                    height: 24, // Adjust size to your preference
                                }}
                            >
                                <EditIcon
                                    style={{
                                        fontSize: 16,
                                        fill: darkMode
                                            ? tinycolor(eq.color).brighten(25).toHex8String()
                                            : tinycolor(eq.color).darken(20).toHex8String(),
                                    }}
                                />
                            </Box>}
                        onDelete={() => handleOpeningEqDetailsDialog(eq.id)}
                    />
                )}
            </Stack>
            <EquipmentDetailsEditingDialog equipmentDetailsEditingDialogOpen={equipmentDetailsEditingDialogOpen} handleClosingEqDetailsDialog={handleClosingEqDetailsDialog} selectedEq={selectedEq} selectedSystem={selectedSystem} />
        </Box>
    )
}

