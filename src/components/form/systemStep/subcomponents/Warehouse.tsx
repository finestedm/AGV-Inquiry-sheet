import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { ISystems } from '../../../../features/interfaces';
import AddBoxIcon from '@mui/icons-material/AddBox';

function WarehouseLayout({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const [pallets, setPallets] = useState<{ key: number }[]>([]);
    const warehouseDimensions = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const [warehouseWidth, setWarehouseWidth] = useState(0);
    const [warehouseLength, setWarehouseLength] = useState(0);
    const [canvaDimensions, setCanvaDimensions] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        setWarehouseLength(Number(warehouseDimensions.length))
        setWarehouseWidth(Number(warehouseDimensions.width))
    }, [warehouseDimensions])

    useEffect(() => {
        //@ts-ignore
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setCanvaDimensions({
                //@ts-ignore
                width: divRef.current.offsetWidth,
                //@ts-ignore
                height: divRef.current.offsetWidth * Number(warehouseLength / warehouseWidth)
            })
        }
    }, [warehouseDimensions, warehouseLength, warehouseWidth])

    const handleAddPallet = () => {
        setPallets([...pallets, { key: pallets.length }]);
    };

    const divRef = useRef(null)

    const wallThickness = canvaDimensions.width * 0.02; // Assuming 10% thickness


    // We cant set the h & w on Stage to 100% it only takes px values so we have to
    // find the parent container's w and h and then manually set those !

    return (
        <Box ref={divRef}>
            <Button onClick={handleAddPallet}>Add Pallet</Button>
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




                    {/* Pallets */}
                    {pallets.map(({ key }, index) => (
                        <Rect
                            key={key}
                            width={50}
                            height={50}
                            x={Math.random() * 550}
                            y={Math.random() * 350}
                            fill="blue"
                            draggable
                        />
                    ))}
                </Layer>
            </Stage>
        </Box>
    );
};

export default WarehouseLayout;
