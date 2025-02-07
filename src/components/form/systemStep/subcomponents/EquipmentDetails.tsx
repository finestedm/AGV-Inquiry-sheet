import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import EquipmentDetailsEditingDialog from "./EquipmentDetailsEditingDialog";
import tinycolor from "tinycolor2";
import { updateEditEquipmentDrawer } from "../../../../features/redux/reducers/editEquipmentDrawer";
import { eqIcons } from "../../../../data/availableEquipment";

export default function EquipmentDetails({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const warehouseEquipment = useSelector((state: RootState) => state.formData.present.system[selectedSystem].building.existingBuilding.equipment)

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
                    <EquipmentDetailsChip eq={eq} />
                )}
            </Stack>
            <EquipmentDetailsEditingDialog selectedSystem={selectedSystem} />
        </Box>
    )
}

function EquipmentDetailsChip({ eq }: { eq: IEquipment }) {
    const darkMode = useSelector((state: RootState) => state.darkMode)
    const dispatch = useDispatch();
    const EquipmentIcon = eqIcons[eq.type] || null;
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';    

    return (
        <Chip
            sx={{
                backgroundColor: tinycolor(eq.color).setAlpha(.25).toHex8String(),
                color: darkMode ? tinycolor(eq.color).brighten(25).toHex8String() : tinycolor(eq.color).darken(20).toHex8String(),
            }}
            label={
                <Typography variant="caption">
                    <Typography fontWeight={700} variant="caption">{eq.type}</Typography>, {eq.height} x {eq.width}, H={eq.zHeight}
                </Typography>
            }
            avatar={
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
                    {EquipmentIcon &&
                        <EquipmentIcon
                            style={{
                                fontSize: 16,
                                fill: darkMode
                                    ? tinycolor(eq.color).brighten(25).toHex8String()
                                    : tinycolor(eq.color).darken(20).toHex8String(),
                            }}
                        />}
                </Box>
            }
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
            onDelete={() => editMode && dispatch(updateEditEquipmentDrawer({ open: true, eqId: eq.id }))}
        />
    )
}