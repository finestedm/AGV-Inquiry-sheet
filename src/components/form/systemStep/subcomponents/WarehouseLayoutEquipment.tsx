import React, { useEffect, useRef } from "react";
import { IEquipment, ISystem, ISystems } from "../../../../features/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useTheme } from "@mui/material";
import { Circle, Rect, Text, Transformer } from "react-konva";
import Konva from 'konva';

interface CommonProps {
    onSelect: () => void;
    shapeRef: React.MutableRefObject<Konva.Rect | Konva.Circle | null>;
    onTransformEnd: () => void;
    commonProps: {
        id: string;
        x: number;
        width: number;
        y: number;
        height: number;
        fill: string;
        rotation: number;
        draggable: boolean;
        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
    };
}

export default function EquipmentShape({ equipment, index, isSelected, onSelect, selectedShapeId, canvaToWarehouseRatio, selectedSystem }: { equipment: IEquipment, index: number, isSelected: boolean, onSelect: any, selectedShapeId: number | null, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {
    const { id, x, width, y, height, rotation, type, color } = equipment;

    const shapeRef = useRef<Konva.Rect | Konva.Circle | null>(null);
    const trRef = useRef<Konva.Transformer | null>(null);

    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const warehouseEquipment = warehouseData.equipment;

    const theme = useTheme();

    const handleDragEnd = (index: number) => (e: Konva.KonvaEventObject<DragEvent>) => {
        const updatedEquipment = warehouseEquipment.map((equipment, i) => {
            if (i === index) {
                const xInMeters = e.target.x() / canvaToWarehouseRatio;
                const yInMeters = e.target.y() / canvaToWarehouseRatio;

                return { ...equipment, x: xInMeters, y: yInMeters, rotation: e.target.rotation() };
            }
            return equipment;
        });

        dispatch(updateEquipment({ updatedEquipment: updatedEquipment, selectedSystem: selectedSystem }));
    };

    const onShapeChange = ({ x, y, width, height, rotation }: { x: number; y: number; width: number; height: number; rotation: number }) => {
        const updatedEquipment = warehouseEquipment.map((equipment) => {
            if (equipment.id === selectedShapeId) {
                const xInMeters = x / canvaToWarehouseRatio;
                const yInMeters = y / canvaToWarehouseRatio;
                const xDimInMeters = width / canvaToWarehouseRatio;
                const yDimInMeters = height / canvaToWarehouseRatio;

                return { ...equipment, x: xInMeters, y: yInMeters, width: xDimInMeters, height: yDimInMeters, rotation: Math.round(rotation / 45) * 45 };
            }
            return equipment;
        });

        dispatch(updateEquipment({ updatedEquipment, selectedSystem: selectedSystem }));
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

    const commonProps: CommonProps = {
        onSelect,
        shapeRef,
        onTransformEnd: () => {
            const node = shapeRef.current;
            if (node) {
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);

                onShapeChange({
                    x: node.x(),
                    y: node.y(),
                    width: node.width() * scaleX,
                    height: node.height() * scaleY,
                    rotation: node.rotation(),
                });
            }
        },
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
        },
    };

    const textProps = {
        x: commonProps.commonProps.x,
        y: commonProps.commonProps.y - 10,
        fontSize: 10,
        fill: theme.palette.text.primary,
    };

    // ... (Previous code remains unchanged)

const renderShape = () => {
    switch (type) {
        case 'wall':
        case 'gate':
        case 'dock':
            return (
                <React.Fragment>
                    <Rect
                        onClick={commonProps.onSelect}
                        onTap={commonProps.onSelect}
                        ref={commonProps.shapeRef as React.MutableRefObject<Konva.Rect>}
                        onTransformEnd={commonProps.onTransformEnd}
                        onTransform={(e) => {
                            const node = commonProps.shapeRef.current;
                            if (node instanceof Konva.Rect) {
                                const scaleX = node.scaleX() || 1;
                                const scaleY = node.scaleY() || 1;

                                // limit resizing
                                if (Math.abs(scaleX) < 0.5 || Math.abs(scaleY) < 0.5) {
                                    return;
                                }

                                // update size
                                const newWidth = Math.max(5, node.width() * scaleX);
                                const newHeight = Math.max(5, node.height() * scaleY);
                                node.width(newWidth);
                                node.height(newHeight);

                                commonProps.onTransformEnd();
                            }
                        }}
                        {...commonProps.commonProps}
                    />
                    <Text {...textProps} y={textProps.y - 10} text={type} />
                    <Text {...textProps} text={`${width.toFixed(2)} x ${height.toFixed(2)}`} />
                    {isSelected && (
                        <Transformer
                            ref={trRef}
                            id="transformer"
                            flipEnabled={false}
                            boundBoxFunc={(oldBox, newBox) => {
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
                     <Circle
                        {...commonProps.commonProps}
                        ref={commonProps.shapeRef as React.MutableRefObject<Konva.Circle>}
                        onTransform={(e) => {
                            const node = commonProps.shapeRef.current;
                            if (node instanceof Konva.Circle) {
                                const scaleX = node.scaleX() || 1;
                                const scaleY = node.scaleY() || 1;

                                // limit resizing
                                if (Math.abs(scaleX) < 0.5 || Math.abs(scaleY) < 0.5) {
                                    return;
                                }

                                // update size (assuming width and height are the same for a circle)
                                const newSize = Math.max(5, node.radius() * scaleX);
                                node.radius(newSize);

                                commonProps.onTransformEnd();
                            }
                        }}
                    />
                    <Text {...textProps} text={`ID: ${id}`} />
                    <Text {...textProps} y={textProps.y - 10} text={type} />
                </React.Fragment>
            );
    }
};



    return renderShape();
}
