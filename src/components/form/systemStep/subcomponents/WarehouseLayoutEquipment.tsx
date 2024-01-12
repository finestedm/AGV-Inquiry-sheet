import React, { useEffect, useRef } from "react";
import { IEquipment, ISystem, ISystems } from "../../../../features/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useTheme } from "@mui/material";
import { Circle, Rect, Text, Transformer } from "react-konva";

export default function EquipmentShape({ equipment, index, isSelected, onSelect, selectedShapeId, canvaToWarehouseRatio, selectedSystem }: { equipment: IEquipment, index: number, isSelected: boolean, onSelect: any, selectedShapeId: number | null, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {
    const { id, x, width, y, height, rotation, type, color } = equipment;

    const shapeRef = useRef();
    const trRef = useRef();

    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const warehouseEquipment = warehouseData.equipment;

    const theme = useTheme();

    //@ts-ignore
    const handleDragEnd = (index: number) => (e: Konva.KonvaEventObject<DragEvent>) => {
        const updatedEquipment = warehouseEquipment.map((equipment, i) => {
            if (i === index) {
                // Calculate the real coordinates in meters based on the canvaToWarehouseRatio
                const xInMeters = e.target.x() / canvaToWarehouseRatio;
                const yInMeters = e.target.y() / canvaToWarehouseRatio;

                // Create a new object to avoid TypeScript inference issues
                return { ...equipment, x: xInMeters, y: yInMeters, rotation: e.target.rotation() };
            }
            return equipment;
        });

        // Update Redux state with the updated dock positions
        dispatch(updateEquipment({ updatedEquipment: updatedEquipment, selectedSystem: selectedSystem }));
    };


    const onShapeChange = ({ x, y, width, height, rotation }: { x: number; y: number; width: number; height: number; rotation: number }) => {
        const updatedEquipment = warehouseEquipment.map((equipment) => {
            // Assuming each equipment has a unique identifier (id)
            if (equipment.id === selectedShapeId) {
                // Calculate the real coordinates in meters based on the canvaToWarehouseRatio
                const xInMeters = x / canvaToWarehouseRatio;
                const yInMeters = y / canvaToWarehouseRatio;
                const xDimInMeters = width / canvaToWarehouseRatio;
                const yDimInMeters = height / canvaToWarehouseRatio;

                // Create a new object to avoid TypeScript inference issues
                return { ...equipment, x: xInMeters, y: yInMeters, width: xDimInMeters, height: yDimInMeters, rotation: Math.round(rotation / 45) * 45 };
            }
            return equipment;
        });

        // Update Redux state with the updated equipment positions
        dispatch(updateEquipment({ updatedEquipment, selectedSystem: selectedSystem }));
    };

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            //@ts-ignore
            trRef.current!.nodes([shapeRef.current]);
            //@ts-ignore
            trRef.current!.getLayer().batchDraw();
        }
    }, [isSelected]);


    const commonProps = {
        id: id.toString(),
        x: x * canvaToWarehouseRatio,
        width: width * canvaToWarehouseRatio,
        y: y * canvaToWarehouseRatio,
        height: height * canvaToWarehouseRatio,
        fill: color,
        rotation,
        draggable: editMode,
        onDragEnd: handleDragEnd(index),

    };

    const textProps = {
        x: commonProps.x,
        y: commonProps.y - 10, // Adjust the Y position for the text
        fontSize: 10, // Adjust the font size as needed
        fill: theme.palette.text.primary,
    };

    const renderShape = () => {
        switch (type) {
            case 'wall':
            case 'gate':
            case 'dock':
                return (
                    <React.Fragment>
                        <Rect onClick={onSelect}
                            onTap={onSelect}
                            //@ts-ignore
                            ref={shapeRef}
                            onTransformEnd={() => {
                                const node = shapeRef.current;
                                //@ts-ignore
                                const scaleX = node.scaleX();
                                //@ts-ignore
                                const scaleY = node.scaleY();

                                // we will reset it back
                                //@ts-ignore
                                node.scaleX(1);
                                //@ts-ignore
                                node.scaleY(1);

                                onShapeChange({
                                    //@ts-ignore
                                    x: node.x(),
                                    //@ts-ignore
                                    y: node.y(),
                                    //@ts-ignore
                                    width: node.width() * scaleX,
                                    //@ts-ignore
                                    height: node.height() * scaleY,
                                    //@ts-ignore
                                    rotation: node.rotation(),
                                });

                            }}
                            {...commonProps} />
                        <Text {...textProps} y={textProps.y - 10} text={type} />
                        <Text {...textProps} text={`${width.toFixed(2)} x ${height.toFixed(2)}`} />
                        {isSelected && (
                            <Transformer
                                //@ts-ignore
                                ref={trRef}
                                id="transformer"
                                flipEnabled={false}
                                boundBoxFunc={(oldBox, newBox) => {
                                    // limit resize
                                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        <Circle {...commonProps} />
                        <Text {...textProps} text={`ID: ${id}`} />
                        <Text {...textProps} y={textProps.y - 10} text={type} />
                    </React.Fragment>
                );
        }
    };

    return renderShape();
}