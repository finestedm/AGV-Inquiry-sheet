import { IEquipment, IFlow, ISystem, ISystems } from "../../../../features/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, Tooltip, useTheme } from "@mui/material";
import { Arrow, Circle, Group, Line, Rect, Text, Transformer } from "react-konva";
import { useEffect, useState } from "react";

export default function EquipmentFlowLines({ flow, canvaToWarehouseRatio, selectedSystem }: { flow: IFlow, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {
    const { id, stationType, stationSource, stationTarget, flowAverage, flowPeak, loadType, distance, bidirectional } = flow;
    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const warehouseEquipment = warehouseData.equipment;
    const loads = useSelector((state: RootState) => state.formData.system[selectedSystem].loads)
    const theme = useTheme();

    const [points, setPoints] = useState<number[]>();
    const [tooltipText, setTooltipText] = useState('');
    const [hovered, setHovered] = useState(false);

    const rotatePoint = (point: { x: any; y: any; }, center: { x: any; y: any; }, angle: number) => {
        const radians = (angle * Math.PI) / 180;
        const xDiff = point.x - center.x;
        const yDiff = point.y - center.y;
        const rotatedX = center.x + xDiff * Math.cos(radians) - yDiff * Math.sin(radians);
        const rotatedY = center.y + xDiff * Math.sin(radians) + yDiff * Math.cos(radians);
        return { x: rotatedX, y: rotatedY };
    };

    useEffect(() => {
        const sourceEquipment = warehouseEquipment.find(eq => eq.id === stationSource);
        const targetEquipment = warehouseEquipment.find(eq => eq.id === stationTarget);

        if (sourceEquipment && targetEquipment) {
            // Use the center of the source equipment
            const sourceCenter = {
                x: sourceEquipment.x + sourceEquipment.width / 2,
                y: sourceEquipment.y + sourceEquipment.height / 2
            };

            // Use the center of the target equipment
            const targetCenter = {
                x: targetEquipment.x + targetEquipment.width / 2,
                y: targetEquipment.y + targetEquipment.height / 2
            };

            const rotatedSourceCenter = rotatePoint(
                {
                    x: sourceEquipment.x + sourceEquipment.width / 2,
                    y: sourceEquipment.y + sourceEquipment.height / 2
                },
                sourceCenter,
                sourceEquipment.rotation
            );

            const rotatedTargetCenter = rotatePoint(
                {
                    x: targetEquipment.x + targetEquipment.width / 2,
                    y: targetEquipment.y + targetEquipment.height / 2
                },
                targetCenter,
                targetEquipment.rotation
            );

            // Calculate the offset based on the width and height of the equipment
            const offsetSource = {
                x: sourceEquipment.width / 2,
                y: sourceEquipment.height / 2
            };

            const offsetTarget = {
                x: targetEquipment.width / 2,
                y: targetEquipment.height / 2
            };

            // Set the points based on the rotated center coordinates and offset
            setPoints([
                rotatedSourceCenter.x * canvaToWarehouseRatio - offsetSource.x * canvaToWarehouseRatio,
                rotatedSourceCenter.y * canvaToWarehouseRatio - offsetSource.y * canvaToWarehouseRatio,
                rotatedTargetCenter.x * canvaToWarehouseRatio - offsetTarget.x * canvaToWarehouseRatio,
                rotatedTargetCenter.y * canvaToWarehouseRatio - offsetTarget.y * canvaToWarehouseRatio
            ]);
        }

        setTooltipText(`ID: ${id}\nDistance: ${distance.toFixed(2)}\nFlow Average: ${flowAverage}`);
    }, [warehouseEquipment, stationSource, stationTarget, canvaToWarehouseRatio, id, distance, flowAverage]);


    const commonProps = {
        id: id ? id.toString() : '-1',
        points: points,
        stroke: theme.palette.text.primary,
        strokeWidth: 3
    };

    const arrowProps = {
        points: points || [],
        pointerLength: 10,
        pointerWidth: 10,
        fill: theme.palette.text.primary
    };

    const bidirectionalArrowProps = {
        points: points ? [points[2], points[3], points[0], points[1]] : [],
        pointerLength: 10,
        pointerWidth: 10,
        fill: theme.palette.text.primary,
    };

    const basicTextProps = {
        x: points ? (points[0] + points[2]) / 2 + 10 : 0,
        y: points ? (points[1] + points[3]) / 2 - 10 : 0,
        fontSize: 10,
        fill: theme.palette.text.primary,
        text: `ID: ${id}\nDistance: ${distance.toFixed(2)}`,
    };

    const detailedTextProps = {
        x: points ? (points[0] + points[2]) / 2 + 10 : 0,
        y: points ? (points[1] + points[3]) / 2 - 10 : 0,
        fontSize: 10,
        fill: theme.palette.text.primary,
        text: `ID: ${id}\nDistance: ${distance.toFixed(2)}\nFlow Average: ${flowAverage}\nFlow Peak: ${flowPeak}\nLoad Type: // dodać!!!`,
    };


    if (points) {
        return (
            <Group
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Line {...commonProps} />
                {hovered ? <Text {...detailedTextProps} /> : <Text {...basicTextProps} />}
                <Arrow {...arrowProps} />
                {bidirectional && <Arrow {...bidirectionalArrowProps} />}
                {/* <Text {...textProps} y={textProps.y - 10} text={`Type: ${type}`} /> */}
            </Group>
        );
    } else {
        return <Box />
    }

}