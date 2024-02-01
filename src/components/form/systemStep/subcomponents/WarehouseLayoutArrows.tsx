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
    console.log('d')

    useEffect(() => {
        const sourceEquipment = warehouseEquipment.find(eq => eq.id === stationSource);
        const targetEquipment = warehouseEquipment.find(eq => eq.id === stationTarget);


        if (sourceEquipment && targetEquipment) {
            // Find the corners of the source equipment
            const sourceCorners = [
                { x: sourceEquipment.x, y: sourceEquipment.y },
                { x: sourceEquipment.x + sourceEquipment.width, y: sourceEquipment.y },
                { x: sourceEquipment.x + sourceEquipment.width, y: sourceEquipment.y + sourceEquipment.height },
                { x: sourceEquipment.x, y: sourceEquipment.y + sourceEquipment.height }
            ];

            // Find the center of the source equipment
            const sourceCenter = {
                x: sourceEquipment.x + sourceEquipment.width / 2,
                y: sourceEquipment.y + sourceEquipment.height / 2
            };

            // Rotate each corner around the center of the source equipment
            const rotatedSourceCorners = sourceCorners.map(corner => {
                const xDiff = corner.x - sourceCenter.x;
                const yDiff = corner.y - sourceCenter.y;
                const rotatedX = sourceCenter.x + xDiff * Math.cos(sourceEquipment.rotation) - yDiff * Math.sin(sourceEquipment.rotation);
                const rotatedY = sourceCenter.y + xDiff * Math.sin(sourceEquipment.rotation) + yDiff * Math.cos(sourceEquipment.rotation);
                return { x: rotatedX, y: rotatedY };
            });

            // Calculate the average coordinates of the rotated corners to find the new center
            const sourceCenterX = rotatedSourceCorners.reduce((sum, corner) => sum + corner.x, 0) / 4;
            const sourceCenterY = rotatedSourceCorners.reduce((sum, corner) => sum + corner.y, 0) / 4;

            // Repeat the process for the target equipment
            // Find the corners of the target equipment
            const targetCorners = [
                { x: targetEquipment.x, y: targetEquipment.y },
                { x: targetEquipment.x + targetEquipment.width, y: targetEquipment.y },
                { x: targetEquipment.x + targetEquipment.width, y: targetEquipment.y + targetEquipment.height },
                { x: targetEquipment.x, y: targetEquipment.y + targetEquipment.height }
            ];

            // Find the center of the target equipment
            const targetCenter = {
                x: targetEquipment.x + targetEquipment.width / 2,
                y: targetEquipment.y + targetEquipment.height / 2
            };

            // Rotate each corner around the center of the target equipment
            const rotatedTargetCorners = targetCorners.map(corner => {
                const xDiff = corner.x - targetCenter.x;
                const yDiff = corner.y - targetCenter.y;
                const rotatedX = targetCenter.x + xDiff * Math.cos(targetEquipment.rotation) - yDiff * Math.sin(targetEquipment.rotation);
                const rotatedY = targetCenter.y + xDiff * Math.sin(targetEquipment.rotation) + yDiff * Math.cos(targetEquipment.rotation);
                return { x: rotatedX, y: rotatedY };
            });

            // Calculate the average coordinates of the rotated corners to find the new center
            const targetCenterX = rotatedTargetCorners.reduce((sum, corner) => sum + corner.x, 0) / 4;
            const targetCenterY = rotatedTargetCorners.reduce((sum, corner) => sum + corner.y, 0) / 4;

            // Set the points based on the calculated center coordinates
            setPoints([sourceCenterX * canvaToWarehouseRatio, sourceCenterY * canvaToWarehouseRatio, targetCenterX * canvaToWarehouseRatio, targetCenterY * canvaToWarehouseRatio]);
        }
        setTooltipText(`ID: ${id}\nDistance: ${distance.toFixed(2)}\nFlow Average: ${flowAverage}`);
    }, [warehouseEquipment, stationSource, stationTarget, canvaToWarehouseRatio]);


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