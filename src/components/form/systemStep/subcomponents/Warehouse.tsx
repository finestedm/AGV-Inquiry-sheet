import React, { Fragment, useEffect, useRef, useState } from 'react';
import Konva, { Stage, Layer, Rect, Line, Image, Circle, Text } from 'react-konva';
import { Box, Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { IEquipment, ISystems } from '../../../../features/interfaces';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
//@ts-ignore
import generateRandomId from '../../../../features/variousMethods/generateRandomId';
import randomColor from 'randomcolor'
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { PlaylistAdd } from "@mui/icons-material";
import { availableEquipment } from '../../../../data/availableEquipment';
import { updateEquipment } from '../../../../features/redux/reducers/formDataSlice';
import NoDataAlert from '../../../NoDataAlert';

export default function WarehouseLayout({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const divRef = useRef(null)
    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const warehouseData = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding)
    const warehouseEquipment = warehouseData.equipment;
    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        navigator.maxTouchPoints > 0 ? setIsMobile(true) : setIsMobile(false)
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const anchorRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation()
    const theme = useTheme();
    const [equipmentToAdd, setEquipmentToAdd] = useState<IEquipment['type']>('dock')
    const handleClick = () => {
        const newEquipment: IEquipment = {
            id: generateRandomId(),
            x: 25,
            y: 25,
            rotation: 0,
            type: equipmentToAdd,
            color: randomColor({ luminosity: 'light' }),
        };

        // Update Redux state with the new dock added to the existing array
        dispatch(updateEquipment({
            updatedEquipment: [...warehouseEquipment, newEquipment],
            selectedSystem: selectedSystem,
        }))
    };
    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };
    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string,) => {
        setEquipmentToAdd(type as IEquipment['type']);
        setOpen(false);
    };

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
                height: (divRef.current.offsetWidth * Number(warehouseData.length / warehouseData.width))
            })
        }
    }, [warehouseData.length, warehouseData.width])

    const canvaToWarehouseRatio = canvaDimensions.width / warehouseData.width;

    const wallThickness = canvaDimensions.width * 0.01; // Assuming 1%

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

    function EquipmentShape({ equipment, index }: { equipment: IEquipment, index: number }) {
        const { id, x, y, rotation, type, color } = equipment;
        const sizeInPixels = 5 * canvaToWarehouseRatio;

        const commonProps = {
            width: sizeInPixels,
            height: sizeInPixels,
            x: x * canvaToWarehouseRatio,
            y: y * canvaToWarehouseRatio,
            fill: color,
            rotation,
            draggable: true,
            onDragEnd: handleDragEnd(index),
        };

        const textProps = {
            x: commonProps.x,
            y: commonProps.y - 10, // Adjust the Y position for the text
            fontSize: 8, // Adjust the font size as needed
            fill: theme.palette.text.primary,
        };

        const renderShape = () => {
            switch (type) {
                case 'wall':
                    return <Rect {...commonProps} />
                case 'gate':
                case 'dock':
                    return (
                        <React.Fragment>
                            <Rect {...commonProps} />
                            <Text {...textProps} text={`ID: ${id}`} />
                            <Text {...textProps} y={textProps.y - 10} text={`Type: ${type}`} />
                        </React.Fragment>
                    );
                default:
                    return (
                        <React.Fragment>
                            <Circle {...commonProps} />
                            <Text {...textProps} text={`ID: ${id}`} />
                            <Text {...textProps} y={textProps.y - 10} text={`Type: ${type}`} />
                        </React.Fragment>
                    );
            }
        };

        return renderShape();
    }

    if (warehouseEquipment) {
        return (
            <Stack spacing={2} ref={divRef} sx={{ minHeight: 50 }}>
                <Box>
                    <ButtonGroup disabled={!editMode} variant='contained' size="small" aria-label="split button">
                        <Button
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="add loads"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {t(`${equipmentToAdd}`)}
                            <Box ref={anchorRef} />
                            <ArrowDropDownIcon />
                        </Button>
                        <Button onClick={handleClick} endIcon={<PlaylistAdd />}><Box display={{ xs: 'none', md: 'inline-block' }}>{t('ui.button.addNewEqipment')}</Box></Button>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList dense={isMobile} id="split-button-menu" autoFocusItem>
                                            {availableEquipment.map((eq) => (
                                                <MenuItem
                                                    key={eq}
                                                    value={eq}
                                                    selected={eq === equipmentToAdd}
                                                    onClick={(e) => handleMenuItemClick(e, eq)}
                                                >
                                                    {t(`${eq}`)}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
                <Box borderRadius={1} sx={{ overflow: 'hidden' }} flex={1} justifyContent='center' alignItems='center' border={8} borderColor={theme.palette.divider}>
                    <Stage width={canvaDimensions.width} height={canvaDimensions.height} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layer>
                            {/* Warehouse */}
                            {/* <Rect
                            width={canvaDimensions.width} // Adjusted width with offset
                            height={canvaDimensions.height} // Adjusted height with offset and proportional to ratio
                            fill={theme.palette.text.primary}
                            opacity={0.8}
                        /> */}

                            <Rect
                                width={canvaDimensions.width - wallThickness} // Adjusted width with offset
                                height={canvaDimensions.height - wallThickness} // Adjusted height with offset and equal thickness on all sides
                                x={(wallThickness / 2)} // Offset from the left border
                                Y={(wallThickness / 2)} // Offset from the left border
                                fill={theme.palette.background.default}
                                opacity={1}
                            />
                            {generateGridLines()}

                            {/* docks */}
                            {warehouseEquipment.map((equipment, index) => (
                                <EquipmentShape
                                    key={index}
                                    equipment={equipment}
                                    index={index}
                                />
                            ))}
                        </Layer>
                    </Stage>
                </Box>
            </Stack>
        );
    } else {
        return (
            <NoDataAlert />
        )
    }
};
