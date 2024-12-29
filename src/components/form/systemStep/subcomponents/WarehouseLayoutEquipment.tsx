import React, { useEffect, useRef } from "react";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { Stack, useTheme } from "@mui/material";
import { Rect, Text, Transformer } from "react-konva";
import Konva from 'konva';
import { updateEditEquipmentDrawer } from "../../../../features/redux/reducers/editEquipmentDrawer";

export default function EquipmentShape({ equipment, index, isSelected, onSelect, selectedShapeId, canvaToWarehouseRatio, selectedSystem }:
    { equipment: IEquipment, index: number, isSelected: boolean, onSelect: any, selectedShapeId: number | null, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {

    const { id, x, width, y, height, zHeight, rotation, type, color } = equipment;
    const shapeRef = useRef<Konva.Rect | null>(null);
    const trRef = useRef<Konva.Transformer | null>(null);

    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const warehouseData = useSelector((state: RootState) => state.formData.present.system[selectedSystem].building.existingBuilding);
    const warehouseEquipment = warehouseData.equipment;

    const warehouseWidth = warehouseData.width * canvaToWarehouseRatio; // Assuming warehouse width in meters is available
    const warehouseLength = warehouseData.length * canvaToWarehouseRatio; // Assuming warehouse height in meters is available

    const theme = useTheme();
    const SNAP_STEP_METERS = 1; // Define the grid step size in meters

    const snapToGrid = (valueInPixels: number) => {
        const valueInMeters = valueInPixels / canvaToWarehouseRatio; // Convert to meters
        const snappedValueInMeters = Math.round(valueInMeters / SNAP_STEP_METERS * 2) * SNAP_STEP_METERS / 2; // Snap to nearest step
        return snappedValueInMeters * canvaToWarehouseRatio; // Convert back to pixels
    };

    const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
        const snappedX = snapToGrid(e.target.x());
        const snappedY = snapToGrid(e.target.y());

        // Get half dimensions for boundary checking
        const halfWidth = (width * canvaToWarehouseRatio) / 2;
        const halfHeight = (height * canvaToWarehouseRatio) / 2;

        // Check boundaries
        const newX = Math.max(halfWidth, Math.min(warehouseWidth - halfWidth, snappedX));
        const newY = Math.max(halfHeight, Math.min(warehouseLength - halfHeight, snappedY));



        e.target.x(newX);
        e.target.y(newY);
    };

    const handleDragEnd = (index: number) => (e: Konva.KonvaEventObject<DragEvent>) => {
        const xInMeters = e.target.x() / canvaToWarehouseRatio;
        const yInMeters = e.target.y() / canvaToWarehouseRatio;

        const updatedEquipment = warehouseEquipment.map((equipment, i) => {
            if (i === index) {
                return { ...equipment, x: xInMeters, y: yInMeters, rotation: e.target.rotation() };
            }
            return equipment;
        });

        dispatch(updateEquipment({ updatedEquipment, selectedSystem }));
    };

    const onShapeChange = (index: number) => (e: Konva.KonvaEventObject<Event>) => {
        const updatedEquipment = warehouseEquipment.map((equipment, i) => {
            if (i === index) {
                const node = e.target;
                const widthInMeters = Math.round(((node.width() * node.scaleX()) / canvaToWarehouseRatio) / SNAP_STEP_METERS) * SNAP_STEP_METERS;
                const heightInMeters = Math.round(((node.height() * node.scaleY()) / canvaToWarehouseRatio) / SNAP_STEP_METERS) * SNAP_STEP_METERS;
                const rotation = node.rotation();
                // Reset scale to avoid compounding
                node.scaleX(1);
                node.scaleY(1);

                return { ...equipment, width: widthInMeters, height: heightInMeters, rotation };
            }
            return equipment;
        });

        dispatch(updateEquipment({ updatedEquipment, selectedSystem }));
    };

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            attachTransformer();
        }
    }, [isSelected]);

    const attachTransformer = () => {
        if (trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    };

    function handleDoubleClick() {
        dispatch(updateEditEquipmentDrawer({ open: true, eqId: id }));  // Dispatch the action on double-click
    };

    const commonProps = {
        onSelect,
        shapeRef,
        commonProps: {
            id: id.toString(),
            x: x * canvaToWarehouseRatio,
            width: width * canvaToWarehouseRatio,
            y: y * canvaToWarehouseRatio,
            height: height * canvaToWarehouseRatio,
            fill: color,
            rotation,
            draggable: editMode,
            onDragEnd: handleDragEnd(index),
            onTransformEnd: onShapeChange(index),
            opacity: .6,
            onDragMove: handleDragMove,
            onDblClick: handleDoubleClick,
        },
    };

    const textProps = {
        x: commonProps.commonProps.x,
        y: commonProps.commonProps.y - 10,
        fontSize: 10,
        fill: theme.palette.text.primary,
    };

    const renderShape = () => {
        switch (type) {
            default:
                return (
                    <React.Fragment>
                        <Rect
                            offsetX={width / 2 * canvaToWarehouseRatio}
                            offsetY={height / 2 * canvaToWarehouseRatio}
                            onClick={commonProps.onSelect}
                            onTap={commonProps.onSelect}
                            onDblTap={commonProps.commonProps.onDblClick}
                            ref={commonProps.shapeRef as React.MutableRefObject<Konva.Rect>}
                            {...commonProps.commonProps}
                        />
                        <Text {...textProps} y={textProps.y - 20} text={type} />
                        <Text {...textProps} y={textProps.y - 10} text={`${Number(width).toFixed(1)}m x ${Number(height).toFixed(1)}m`} />
                        <Text {...textProps} text={`${Number(zHeight).toFixed(2)}m`} />
                        {isSelected && (
                            <Transformer
                                ref={trRef}
                                id="transformer"
                                flipEnabled={false}
                                rotateLineVisible
                                onDragMove={handleDragMove}
                                rotationSnapTolerance={11.25}
                                boundBoxFunc={(oldBox, newBox) => {
                                    if (Math.abs(newBox.width / canvaToWarehouseRatio) < 1 || Math.abs(newBox.height / canvaToWarehouseRatio) < 1) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                                rotationSnaps={[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]}
                            />
                        )}
                    </React.Fragment>
                );
        }
    };

    return renderShape();
}
