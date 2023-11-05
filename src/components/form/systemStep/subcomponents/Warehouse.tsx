import React, { useEffect, useRef, useState } from 'react';
import Konva, { Stage, Layer, Rect, Line, Image } from 'react-konva';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { IEquipment, ISystems } from '../../../../features/interfaces';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { updateEquipment } from '../../../../features/redux/reducers/formDataSlice';
import jh from '../../../../images/JH_logo.png'
//@ts-ignore
import useImage from 'use-image';

export default function WarehouseLayout({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const divRef = useRef(null)
    const dispatch = useDispatch();

    const [docks, setDocks] = useState<{ key: number }[]>([]);
    const handleAddPallet = () => {
        setDocks([...docks, { key: docks.length }]);
    };

    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const warehouseEquipment = warehouseData.equipments;

    const [canvaDimensions, setCanvaDimensions] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        //@ts-ignore
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setCanvaDimensions({
                //@ts-ignore
                width: divRef.current.offsetWidth,
                //@ts-ignore
                height: divRef.current.offsetWidth * Number(warehouseData.length / warehouseData.width)
            })
        }
    }, [warehouseData.length, warehouseData.width])

    const wallThickness = canvaDimensions.width * 0.01; // Assuming 1%


    function handleAddDock() {
        const newDock = {
            key: docks.length,
            x: Math.random() * 550,
            y: Math.random() * 350,
            rotation: 0,
        };

        // Update Redux state with the new dock added to the existing array
        dispatch(updateEquipment({
            updatedEquipment: [...warehouseEquipment.docks, newDock],
            selectedEquipment: 'docks',
            selectedSystem: selectedSystem,
        }));
    };
    //@ts-ignore
    const handleDragEnd = (index: number) => (e: Konva.KonvaEventObject<DragEvent>) => {
        const updatedDocks = warehouseEquipment.docks.map((dock, i) => {
            if (i === index) {
                // Create a new object to avoid TypeScript inference issues
                return { ...dock, x: e.target.x(), y: e.target.y(), rotation: e.target.rotation() };
            }
            return dock;
        });

        // Update Redux state with the updated dock positions
        dispatch(updateEquipment({ updatedEquipment: updatedDocks, selectedEquipment: 'docks', selectedSystem: selectedSystem }));
    };


    function generateGridLines() {
        const lines = [];

        // Number of grid lines
        const numLinesX = Math.floor(warehouseData.width / 10);
        const numLinesY = Math.floor(warehouseData.length / 10);

        // Generate horizontal grid lines
        for (let i = 1; i < numLinesX; i++) {
            lines.push(
                <Line
                    key={`gridLineX${i}`}
                    points={[i * (canvaDimensions.width / numLinesX), 0, i * (canvaDimensions.width / numLinesX), canvaDimensions.height]}
                    stroke="grey"
                    strokeWidth={1}
                    opacity={0.5}
                />
            );
        }

        // Generate vertical grid lines
        for (let i = 1; i < numLinesY; i++) {
            lines.push(
                <Line
                    key={`gridLineY${i}`}
                    points={[0, i * (canvaDimensions.height / numLinesY), canvaDimensions.width, i * (canvaDimensions.height / numLinesY)]}
                    stroke="grey"
                    strokeWidth={1}
                    opacity={0.5}
                />
            );
        }
        return lines;
    };

    const DockImage = ({ dock, index }: { dock: IEquipment, index: number }) => {
        const [image] = useImage(`${jh}`);

        return <Image
            width={5 * canvaToWarehouseRatio}
            height={5 * canvaToWarehouseRatio}
            x={dock.x}
            y={dock.y}
            fill="green"
            rotation={dock.rotation} // Include the rotation property
            draggable
            onDragEnd={handleDragEnd(index)}
            image={image}
        />;
    };

    const canvaToWarehouseRatio = canvaDimensions.width / warehouseData.width;

    return (
        <Box ref={divRef} sx={{ minHeight: 50 }}>
            <Button onClick={handleAddDock}>Add Dock</Button>
            <Stage width={canvaDimensions.width} height={canvaDimensions.height}>
                <Layer>
                    {/* Warehouse */}
                    <Rect
                        width={canvaDimensions.width} // Adjusted width with offset
                        height={canvaDimensions.height} // Adjusted height with offset and proportional to ratio
                        fill="black"
                        opacity={0.8}
                    />

                    <Rect
                        width={canvaDimensions.width - wallThickness} // Adjusted width with offset
                        height={canvaDimensions.height - wallThickness} // Adjusted height with offset and equal thickness on all sides
                        x={(wallThickness / 2)} // Offset from the left border
                        Y={(wallThickness / 2)} // Offset from the left border
                        fill="white"
                        opacity={1}
                    />
                    {generateGridLines()}

                    {/* docks */}
                    {warehouseEquipment.docks.map((dock, index) => (
                        <DockImage
                            key={index}
                            dock={dock}
                            index={index}
                        />
                    ))}
                </Layer>
            </Stage>
        </Box>
    );
};
