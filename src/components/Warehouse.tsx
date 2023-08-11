import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Button } from '@mui/material';

const WarehouseLayout = () => {
    const [pallets, setPallets] = useState<{ key: number }[]>([]);

    const handleAddPallet = () => {
        setPallets([...pallets, { key: pallets.length }]);
    };

    return (
        <div>
            <Button onClick={handleAddPallet}>Add Pallet</Button>
            <Stage width={800} height={600}>
                <Layer>
                    {/* Warehouse */}
                    <Rect width={600} height={400} fill="black" opacity={0.2} />
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
        </div>
    );
};

export default WarehouseLayout;
