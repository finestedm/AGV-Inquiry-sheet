import React, { Fragment, useEffect, useRef, useState } from 'react';
import Konva, { Stage, Layer, Rect, Line, Image, Circle, Text, Transformer, Shape } from 'react-konva';
import { Box, Button, ButtonGroup, Chip, ClickAwayListener, Collapse, Grow, InputLabel, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper, Stack, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { IEquipment, IFlow, ISystems } from '../../../../features/interfaces';
import { useDispatch } from 'react-redux';
import generateRandomId from '../../../../features/variousMethods/generateRandomId';
import randomColor from 'randomcolor'
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LineStyle, PlaylistAdd } from "@mui/icons-material";
import availableEquipment, { eqIcons } from '../../../../data/availableEquipment';
import { updateEquipment } from '../../../../features/redux/reducers/formDataSlice';
import NoDataAlert from '../../../NoDataAlert';
import EquipmentShape from './WarehouseLayoutEquipment';
import DeleteIcon from '@mui/icons-material/Delete';
import EquipmentFlowLines from './WarehouseEquipmentFlowLines';
import EquipmentDetails from './EquipmentDetails';
import { debounce } from 'lodash';
import CustomAlert from '../../../CustomAlert';
import warehouseDrawing from '../../../../images/warehouse.jpg'

export default function WarehouseLayout({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const divRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch();
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const warehouseData = useSelector((state: RootState) => state.formData.present.system[selectedSystem].building.existingBuilding)
    const warehouseFlows = useSelector((state: RootState) => state.formData.present.system[selectedSystem].flow)
    const warehouseEquipment = warehouseData.equipment;
    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => { navigator.maxTouchPoints > 0 ? setIsMobile(true) : setIsMobile(false) }, [])
    
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const img = new window.Image();
        img.src = warehouseDrawing;
        img.onload = () => setBackgroundImage(img);
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const anchorRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation()
    const theme = useTheme();
    const layoutBorderWidth = 8;
    const [equipmentToAdd, setEquipmentToAdd] = useState<IEquipment['type']>('dock')
    const handleClick = () => {
        const newEquipment: IEquipment = {
            id: generateRandomId(),
            x: 5,
            width: 10,
            y: 5,
            height: 10,
            zHeight: 0,
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

    const updateCanvaDimensions = () => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setCanvaDimensions({
                width: divRef.current.offsetWidth - layoutBorderWidth * 2,
                height: ((divRef.current.offsetWidth - layoutBorderWidth * 2) * Number(warehouseData.length / warehouseData.width)),
            });
        }
    };

    useEffect(() => {
        // Initial setup
        updateCanvaDimensions();

        // Debounced resize handler
        const handleResize = debounce(() => {
            updateCanvaDimensions();
        }, 200); // Adjust debounce delay as needed

        // Add event listener for resize
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            handleResize.cancel(); // Cancel any pending debounced calls
        };
    }, [warehouseData.length, warehouseData.width]);

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setCanvaDimensions({
                width: divRef.current.offsetWidth - layoutBorderWidth * 2,
                height: ((divRef.current.offsetWidth - layoutBorderWidth * 2) * Number(warehouseData.length / warehouseData.width))
            })
        }
    }, [warehouseData.length, warehouseData.width])

    const canvaToWarehouseRatio = canvaDimensions.width / warehouseData.width;

    const wallThickness = canvaDimensions.width * 0.001; // Assuming 1%


    function generateGridLines() {
        const lines = [];
        const labels = [];

        // Number of grid lines
        const gridSpacingX = canvaDimensions.width / warehouseData.width;
        const gridSpacingY = canvaDimensions.height / warehouseData.length;
        const numLinesX = Math.ceil(warehouseData.width / 10);
        const numLinesY = Math.ceil(warehouseData.length / 10);

        // Display labels for every second line
        const labelIntervalX = Math.ceil(numLinesX / 10) || 1;
        const labelIntervalY = Math.ceil(numLinesY / 10) || 1;

        // Generate horizontal grid lines and labels
        for (let i = 1; i <= numLinesX; i++) {
            const xPos = i * 10 * gridSpacingX; // Convert meters to canvas pixels

            // Avoid adding a line beyond the canvas
            if (xPos > canvaDimensions.width) break;

            lines.push(
                <Line
                    id={`konvaGridX${i}`}
                    key={`gridLineX${i}`}
                    points={[xPos, 0, xPos, canvaDimensions.height]}
                    stroke={theme.palette.divider}
                    strokeWidth={1}
                />
            );

            if (i % labelIntervalX === 0) {
                labels.push(
                    <Text
                        key={`labelX${i}`}
                        x={xPos}
                        y={canvaDimensions.height - 10}
                        fontSize={9}
                        text={`${i * 10}m`}
                        fill={theme.palette.text.secondary}
                        align="center"
                    />
                );
            }
        }


        // Generate vertical grid lines and labels
        for (let i = 1; i <= numLinesY; i++) {
            const yPos = i * 10 * gridSpacingY; // Convert meters to canvas pixels

            // Avoid adding a line beyond the canvas
            if (yPos > canvaDimensions.height) break;

            lines.push(
                <Line
                    id={`konvaGridY${i}`}
                    key={`gridLineY${i}`}
                    points={[0, yPos, canvaDimensions.width, yPos]}
                    stroke={theme.palette.divider}
                    strokeWidth={1}
                />
            );

            // Add labels at regular intervals
            if (i % labelIntervalY === 0) {
                labels.push(
                    <Text
                        key={`labelY${i}`}
                        x={5} // Offset from the left edge of the canvas
                        y={yPos - 10} // Slightly above the line
                        fontSize={9}
                        text={`${i * 10}m`}
                        fill={theme.palette.text.secondary}
                        align="center"
                    />
                );
            }
        }

        // Combine lines and labels into a single array
        return [...lines, ...labels];
    }


    const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);

    function handleEquipmentDelete() {
        const updatedEquipment = warehouseEquipment.filter(eq => eq.id !== selectedShapeId)
        dispatch(updateEquipment({ updatedEquipment, selectedSystem }))
        setSelectedShapeId(null)
    }

    const checkDeselect = (e: any) => {
        const clickedOnBackground = e.target.id() === 'konvaBackground' || e.target.id() === 'konvaGrid'

        if (clickedOnBackground) {
            setSelectedShapeId(null);
        }
    };

    if (warehouseEquipment) {
        return (
            <Box>
                {warehouseData.width > 0 && warehouseData.length > 0
                    ?
                    <Stack spacing={2} ref={divRef} sx={{ minHeight: 50 }}>
                        <InputLabel>{t(`system.building.layout`)}</InputLabel>
                        <Box borderRadius={1} sx={{ overflow: 'hidden' }} flex={1} justifyContent='center' alignItems='center' border={layoutBorderWidth} borderColor={theme.palette.divider}>
                            <Stage
                                width={canvaDimensions.width}
                                height={canvaDimensions.height}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onMouseDown={checkDeselect}
                                onTouchStart={checkDeselect}
                            >
                                <Layer>
                                    <Rect
                                        id='konvaBackground'
                                        width={canvaDimensions.width - wallThickness} // Adjusted width with offset
                                        height={canvaDimensions.height - wallThickness} // Adjusted height with offset and equal thickness on all sides
                                        x={(wallThickness / 2)} // Offset from the left border
                                        Y={(wallThickness / 2)} // Offset from the left border
                                        fill={theme.palette.background.paper}
                                        opacity={1}
                                    />
                                </Layer>
                                <Layer>
                                        {backgroundImage && <Image
                                            width={canvaDimensions.width}
                                            height={canvaDimensions.height}
                                            image={backgroundImage}
                                        />
                                        }
                                </Layer>
                                <Layer>
                                    {generateGridLines()}
                                </Layer>
                                <Layer>
                                    {warehouseEquipment.map((equipment: IEquipment, index: number) => (
                                        <EquipmentShape
                                            isSelected={equipment.id === selectedShapeId}
                                            onSelect={() => {
                                                editMode && setSelectedShapeId(equipment.id);
                                            }}
                                            key={equipment.id}
                                            equipment={equipment}
                                            index={index}
                                            selectedSystem={selectedSystem}
                                            canvaToWarehouseRatio={canvaToWarehouseRatio}
                                            selectedShapeId={selectedShapeId}
                                        />
                                    ))}
                                </Layer>
                                <Layer>
                                    {warehouseFlows
                                        .map((flow: IFlow) => <EquipmentFlowLines flow={flow} selectedSystem={selectedSystem} canvaToWarehouseRatio={canvaToWarehouseRatio} />)
                                    }
                                </Layer>
                                <Layer>
                                </Layer>
                            </Stage>
                        </Box>
                        <EquipmentDetails selectedSystem={selectedSystem} />
                        <Stack spacing={2} direction='row' justifyContent='space-between'>
                            <Box>
                                <ButtonGroup disabled={!editMode} variant='outlined' size="small" aria-label="split button">
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
                                    <Button onClick={handleClick} endIcon={<PlaylistAdd />}><Box display={{ xs: 'none', md: 'inline-block' }}>{t('ui.button.addNewEquipment')}</Box></Button>
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
                                                            <EqMenuItem eq={eq} handleMenuItemClick={handleMenuItemClick} equipmentToAdd={equipmentToAdd} />
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Box>
                            <Collapse
                                in={Boolean(selectedShapeId)}
                                collapsedSize={0}
                            >
                                <Button
                                    size="small"
                                    color='error'
                                    variant='contained'
                                    disableElevation
                                    startIcon={<DeleteIcon />}
                                    onClick={handleEquipmentDelete}
                                >
                                    Usuń wybrany element
                                </Button>
                            </Collapse>
                        </Stack>
                    </Stack>
                    :
                    <CustomAlert collapseTrigger={!!warehouseData.width && !!warehouseData.length} severity='warning' title={t('system.noWarehouseDimensionsTitle')} text={t('system.noWarehouseDimensions')} />
                }
            </Box>
        );
    } else {
        return (
            <NoDataAlert />
        )
    }
};


function EqMenuItem({ eq, equipmentToAdd, handleMenuItemClick }: { eq: string, equipmentToAdd: string, handleMenuItemClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => void }) {
    const EquipmentIcon = eqIcons[eq] || null;
    const { t } = useTranslation()

    return (
        <MenuItem
            key={eq}
            value={eq}
            selected={eq === equipmentToAdd}
            onClick={(e) => handleMenuItemClick(e, eq)}
            sx={{ textAlign: 'left' }}
        >
            <ListItemIcon>
                <EquipmentIcon style={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText>
                {t(`${eq}`)}
            </ListItemText>
        </MenuItem>
    )
}


const getPdfImageCanvas = async (pdf: any) => {
    const pdfPage = await pdf.getPage(1);
    const viewport = pdfPage.getViewport({ scale: 1.333 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderContext = {
            canvasContext: context,
            viewport,
        };
        await pdfPage.render(renderContext).promise;
    }
    return { canvas, width: viewport.width, height: viewport.height };
};