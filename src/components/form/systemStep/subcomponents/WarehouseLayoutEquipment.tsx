import React, { useEffect, useRef } from "react";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useTheme } from "@mui/material";
import { Rect, Text, Transformer } from "react-konva";
import Konva from 'konva';

interface CommonProps {
    onSelect: () => void;
    shapeRef: React.MutableRefObject<Konva.Rect | null>;
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
        onTransformEnd: (e: Konva.KonvaEventObject<Event>) => void
        opacity: number;
    };
}

export default function EquipmentShape({ equipment, index, isSelected, onSelect, selectedShapeId, canvaToWarehouseRatio, selectedSystem }: 
    { equipment: IEquipment, index: number, isSelected: boolean, onSelect: any, selectedShapeId: number | null, canvaToWarehouseRatio: number, selectedSystem: keyof ISystems }) {

    const { id, x, width, y, height, rotation, type, color } = equipment;

    const shapeRef = useRef<Konva.Rect | null>(null);
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

    const onShapeChange = (index: number) => (e: Konva.KonvaEventObject<Event>) => {
        
        const updatedEquipment = warehouseEquipment.map((equipment, i) => {
            if (i === index) {
                const node = e.target
                const xInMeters = Number((node.x() / canvaToWarehouseRatio).toFixed(1));
                const yInMeters = Number((node.y() / canvaToWarehouseRatio).toFixed(1));
                const widthInMeters = Number(((node.width() * node.scaleX()) / canvaToWarehouseRatio).toFixed(1));
                const heightInMeters = Number(((node.height() * node.scaleY()) / canvaToWarehouseRatio).toFixed(1));
                const rotation = Math.round(node.rotation() / 22.5) * 22.5;
                // Reset scale to avoid compounding
                node.scaleX(1);
                node.scaleY(1);

                return { ...equipment, x: xInMeters, y: yInMeters, width: widthInMeters, height: heightInMeters, rotation };
            }
            
            return equipment;
        });
        
        dispatch(updateEquipment({ updatedEquipment, selectedSystem }));
    }  

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
                            {...commonProps.commonProps}
                        />
                        <Text {...textProps} y={textProps.y - 10} text={type} />
                        <Text {...textProps} text={`${Number(width).toFixed(1)} x ${Number(height).toFixed(1)}`} />
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
                                rotationSnaps= {[0, 90, 180, 270]}
                            />
                        )}
                    </React.Fragment>
                );
        }
    };

    return renderShape();
}
