import React, { useEffect, useRef } from "react";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useTheme } from "@mui/material";
import { Circle, Rect, Text, Transformer } from "react-konva";
import Konva from 'konva';
import { debounce } from 'lodash';

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
        opacity: number;
    };
}

export default function EquipmentShape({ equipment, index, isSelected, onSelect, selectedShapeId, canvaToWarehouseRatio, selectedSystem }: 
    { equipment: IEquipment, index: number, isSelected: boolean, onSelect: any, selectedShapeId: number | null, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {

    const { id, x, width, y, height, rotation, type, color } = equipment;

    const shapeRef = useRef<Konva.Rect | Konva.Circle | null>(null);
    const trRef = useRef<Konva.Transformer | null>(null);

    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding);
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
        dispatch(updateEquipment({ updatedEquipment, selectedSystem }));
    };

    const onShapeChange = debounce(({ x, y, width, height, rotation }: 
        { x: number; y: number; width: number; height: number; rotation: number }) => {
        
        const updatedEquipment = warehouseEquipment.map((equipment) => {
            if (equipment.id === selectedShapeId) {
                const xInMeters = x / canvaToWarehouseRatio;
                const yInMeters = y / canvaToWarehouseRatio;
                const widthInMeters = width / canvaToWarehouseRatio;
                const heightInMeters = height / canvaToWarehouseRatio;

                return { ...equipment, x: xInMeters, y: yInMeters, width: widthInMeters, height: heightInMeters, rotation };
            }
            return equipment;
        });
        
        dispatch(updateEquipment({ updatedEquipment, selectedSystem }));
    }, 100);  // Adjust delay as necessary for smoother UX

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
            opacity: .6
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
                            ref={commonProps.shapeRef as React.MutableRefObject<Konva.Rect>}
                            onTransformEnd={commonProps.onTransformEnd}
                            onTransform={(e) => {
                                const node = commonProps.shapeRef.current;
                                if (node instanceof Konva.Rect) {
                                    const scaleX = node.scaleX() || 1;
                                    const scaleY = node.scaleY() || 1;

                                    const newWidth = Math.max(5, node.width() * scaleX);
                                    const newHeight = Math.max(5, node.height() * scaleY);

                                    node.scaleX(1);
                                    node.scaleY(1);

                                    node.width(newWidth);
                                    node.height(newHeight);

                                    const rotationLimited = Math.round(node.rotation() / 45) * 45;
                                    node.rotation(rotationLimited);

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
        }
    };

    return renderShape();
}
