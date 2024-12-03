import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, IconButton, InputLabel, makeStyles, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import { useDispatch } from "react-redux";
import InputGroup from "../InputGroup";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import imageCompression from 'browser-image-compression';
import { handleInputMethod } from "../../../features/redux/reducers/formDataSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { openSnackbar } from "../../../features/redux/reducers/snackBarSlice";
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { LightGallery as ILightGallery } from 'lightgallery/lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

export default function FormMediaStep(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const imagesUploaded = formData.media.images;
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [processingCount, setProcessingCount] = useState(0);

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const files = Array.from(input.files);
        setProcessingCount(files.length); // Update the count
        setLoading(true); // Start loading

        try {
            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    const options = {
                        maxSizeMB: 0.75,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);
                    const base64 = await fileToBase64(compressedFile);

                    const nameWithoutExtension = file.name.split('.')[0]

                    return { base64, name: nameWithoutExtension };
                })
            );

            const uniqueNewImages = compressedFiles.filter((newImage) => {
                const isDuplicate = imagesUploaded.some((existingImage) => {
                    const isMatch = existingImage.base64 === newImage.base64;
                    if (isMatch) {
                        dispatch(openSnackbar({ message: `${t('ui.snackBar.message.duplicateImageFound')}`, severity: 'warning' }));
                    }
                    return isMatch;
                });
                return !isDuplicate;
            });

            dispatch(handleInputMethod({
                path: 'media.images',
                value: [...imagesUploaded, ...uniqueNewImages],
            }));

        } catch (error) {
            console.error('Error while compressing or converting image:', error);
        } finally {
            setLoading(false); // End loading
            setProcessingCount(0); // Reset count after processing
            input.value = "";
        }
    }



    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };


    const lightGalleryRef = useRef<ILightGallery>(null);
    const containerRef = useRef(null);
    const [galleryContainer, setGalleryContainer] = useState(null);

    const onInit = useCallback((detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
            lightGalleryRef.current.openGallery();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setGalleryContainer(containerRef.current);
        }
    }, []);

    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <Stack spacing={5}>
            <Typography variant="h4" textAlign='left'>{t('media.header')}</Typography>
            <InputGroup
                title={t('media.subheader.images')}
                content={
                    <Stack spacing={2}>
                        <Box>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    {isMobile && editMode && (
                                        <Grid item xs={6} lg={3}>
                                            <NewImageCard takePhoto handleImageUpload={handleImageUpload} />
                                        </Grid>
                                    )}
                                    {editMode && (
                                        <Grid item xs={6} lg={3}>
                                            <NewImageCard handleImageUpload={handleImageUpload} />
                                        </Grid>
                                    )}
                                    <Box style={{
                                        width: '100%', // Take full width of parent
                                        height: '100%', // Optionally adapt to parent height
                                        maxWidth: '100%', // Prevent overflow
                                    }}>

                                        <Box height={800} ref={containerRef}></Box>
                                        <LightGallery
                                            container={galleryContainer}
                                            onInit={onInit}
                                            plugins={[lgZoom, lgThumbnail]}
                                            dynamic={true}
                                            slideDelay={400}
                                            thumbWidth={130}
                                            thumbHeight={'100px'}
                                            thumbMargin={6}
                                            appendSubHtmlTo={'.lg-item'}
                                            dynamicEl={imagesUploaded.map((image, index) => ({
                                                src: image.base64, // Main image source
                                                responsive: image.base64, // Responsive image (same here, or different sizes if available)
                                                thumb: image.base64, // Thumbnail (use a smaller image if you have one)
                                                subHtml: `<h4>Image ${index + 1}</h4>`, // Additional HTML (optional)
                                            }))}
                                        />
                                    </Box>

                                    {/* {imagesUploaded.map((image, index) => (
                                        <Grid item xs={6} lg={3}>
                                            <Card key={index}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column", // Stack children vertically
                                                    justifyContent: "space-between", // Ensure consistent spacing
                                                    height: 260, // Set a uniform height for all cards
                                                }}>
                                                <CardMedia
                                                    sx={{ height: 180 }}
                                                    image={image.base64}
                                                    title={image.name}
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="caption">
                                                        {image.name}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing sx={{ borderTop: `1px solid ${theme.palette.divider}` }} >
                                                    <Tooltip title='edit name' sx={{ marginLeft: 'auto' }}>
                                                        <IconButton disabled={!editMode} size="small" aria-label="edit" onClick={() => handleEditImageUploadedName(index)}>
                                                            <EditIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='delete'>
                                                        <IconButton disabled={!editMode} size="small" color='error' aria-label="delete" onClick={() => handleDeleteImageUploaded(index)}>
                                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))} */}
                                    {(loading && processingCount > 0) && (
                                        Array.from({ length: processingCount }).map((_, index) => (
                                            <Grid item xs={6} lg={3} key={`placeholder-${index}`}>
                                                <Card
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column", // Stack children vertically
                                                        justifyContent: "space-between", // Ensure consistent spacing
                                                        height: 220, // Set a uniform height for all cards
                                                    }}>
                                                    <CardMedia
                                                        sx={{
                                                            height: 140,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <CircularProgress />
                                                    </CardMedia>
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography variant="caption" color='text.secondary'>
                                                            Processing image {index + 1} of {processingCount}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </Stack>
                        </Box>
                    </Stack>
                }
            />
        </Stack >

    )
}

export function NewImageCard({ handleImageUpload, takePhoto }: { handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void, takePhoto?: boolean }) {
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);

    function triggerFileInput() {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset to ensure clean state
            fileInputRef.current.click();
        }
    };


    return (
        <label htmlFor="icon-button-file" style={{ display: 'block', cursor: 'pointer' }}>
            <Card
                sx={{
                    cursor: 'pointer',
                    display: "flex",
                    flexDirection: "column", // Stack children vertically
                    justifyContent: "space-between", // Ensure consistent spacing
                    height: 260, // Set a uniform height for all cards
                }}
                onClick={triggerFileInput}
            >
                <CardMedia
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    title="Upload"
                >
                    {takePhoto
                        ?
                        <CameraAltIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
                        :
                        <CameraRollIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
                    }
                </CardMedia>
                <CardContent sx={{ backgroundColor: theme.palette.primary.main, height: 45, p: 0, alignContent: 'center' }}>
                    <Typography variant="button" textAlign="center" color={theme.palette.primary.contrastText}>
                        {takePhoto ? 'Take Photo' : 'Select Images'}
                    </Typography>
                </CardContent>
                {takePhoto ?
                    <input
                        ref={fileInputRef}
                        accept="image/*"
                        id="taking-image-input"
                        type="file"
                        capture="environment"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    :
                    <input
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="uploadding-image-input"
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                    />
                }
            </Card>
        </label>

    );
}

