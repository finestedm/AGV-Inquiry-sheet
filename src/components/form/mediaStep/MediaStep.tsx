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
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchitectureIcon from '@mui/icons-material/Architecture';

export default function FormMediaStep(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData.present);
    const imagesUploaded = formData.media.images;
    const filesUploaded = formData.media.files;
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [processingCount, setProcessingCount] = useState(0);
    const [imagesForGallery, setImagesForGallery] = useState<{ original: string, thumbnail: string, originalTitle: string, thumbnailTitle: string }[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
        if (!loading) {
            const input = event.target as HTMLInputElement;
            if (!input.files || input.files.length === 0) return;

            const files = Array.from(input.files);
            setLoading(true);

            try {
                const processedFiles = await Promise.all(
                    files.map(async (file) => {
                        const base64 = await fileToBase64(file);
                        return { base64, name: file.name, type: file.type };
                    })
                );

                dispatch(handleInputMethod({
                    path: "media.files",
                    value: [...filesUploaded, ...processedFiles],
                }));
            } catch (error) {
                console.error("Error while processing files:", error);
            } finally {
                setLoading(false);
                input.value = "";
            }
        }
    }


    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        if (!loading) {
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
    }

    function handleDeleteImageUploaded(index: number) {
        const imagesUploadedFiltered = imagesUploaded.filter((_, i) => i !== index);
        dispatch(handleInputMethod({
            path: 'media.images',
            value: imagesUploadedFiltered,
        }));
    }

    function handleDeleteFileUploaded(index: number) {
        const filesUploadedFiltered = filesUploaded.filter((_, i) => i !== index);
        dispatch(handleInputMethod({
            path: 'media.files',
            value: filesUploadedFiltered,
        }));
    }

    function handleEditImageUploadedName(index: number) {
        const currentName = imagesUploaded[index].name;

        const newName = prompt("Enter a new name for the image:", currentName);

        if (newName === null || newName.trim() === "") return;

        const updatedImagesUploaded = imagesUploaded.map((image, i) =>
            i === index ? { ...image, name: newName } : image
        );

        dispatch(handleInputMethod({
            path: 'media.images',
            value: updatedImagesUploaded,
        }));
    }

    function handleEditFileUploadedName(index: number) {
        const currentName = filesUploaded[index].name;

        const newName = prompt("Enter a new name for the file:", currentName);

        if (newName === null || newName.trim() === "") return;

        const updatedFilesUploaded = filesUploaded.map((image, i) =>
            i === index ? { ...image, name: newName } : image
        );

        dispatch(handleInputMethod({
            path: 'media.files',
            value: updatedFilesUploaded,
        }));
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };


    useEffect(() => {
        setImagesForGallery(
            imagesUploaded.map((img) => ({ original: img.base64, thumbnail: img.base64, originalTitle: img.name, thumbnailTitle: img.name }))
        );
    }, [imagesUploaded]);


    const galleryRef = useRef(null);

    function openGallery(index: number) {
        setSelectedImageIndex(index)
        if (galleryRef.current) {
            // @ts-ignore
            galleryRef.current.fullScreen();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Delete" && galleryRef.current) {
                // @ts-ignore
                handleDeleteImageUploaded(galleryRef.current.getCurrentIndex());
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleDeleteImageUploaded]);


    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <Box>
            <Typography minHeight={64} alignContent='center' variant="h4" textAlign='left'>{t('media.header')}</Typography>
        <Stack spacing={5}>
            <InputGroup
                title={t('media.subheader.images')}
                subTitle={t('media.subheader.imagesSubtitle')}
                icon={PhotoOutlinedIcon}
                content={
                    <Stack spacing={2}>
                        <Box>
                            <Stack spacing={2}>
                                <Box>
                                    <Grid container spacing={2}>
                                        {isMobile && editMode && (
                                            <Grid item xs={6} lg={3}>
                                                <NewFileCard takePhoto type='images' handleFileUpload={handleImageUpload} loading={loading} />
                                            </Grid>
                                        )}
                                        {editMode && (
                                            <Grid item xs={6} lg={3}>
                                                <NewFileCard type='images' handleFileUpload={handleImageUpload} loading={loading} />
                                            </Grid>
                                        )}


                                        <Box position='absolute' width={0} height={0} overflow='hidden'>
                                            <ImageGallery
                                                ref={galleryRef}
                                                items={imagesForGallery}
                                                startIndex={selectedImageIndex}
                                                showBullets
                                                onSlide={(currentIndex) => setSelectedImageIndex(currentIndex)}

                                            />
                                        </Box>


                                        {imagesUploaded.map((image, index) => (
                                            <Grid item xs={6} lg={3}>
                                                <Card key={index}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column", // Stack children vertically
                                                        justifyContent: "space-between", // Ensure consistent spacing
                                                        height: 260, // Set a uniform height for all cards
                                                    }}>
                                                    <CardMedia
                                                        onClick={() => openGallery(index)}
                                                        sx={{ height: 180 }}
                                                        image={image.base64}
                                                        title={image.name}
                                                    />
                                                    <CardContent sx={{ flexGrow: 1, maxHeight: 75, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                                        <Typography gutterBottom variant="caption" sx={{ textOverflow: "ellipsis" }}>
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
                                        ))}
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
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                }
            />
             <InputGroup
                title={t('media.subheader.files')}
                subTitle={t('media.subheader.filesSubtitle')}
                icon={PhotoOutlinedIcon}
                content={
                    <Stack spacing={2}>
                        <Box>
                            <Stack spacing={2}>
                                <Box>
                                    <Grid container spacing={2}>
                                        {editMode && (
                                            <Grid item xs={6} lg={3}>
                                                <NewFileCard type='files' handleFileUpload={handleFileUpload} loading={loading} />
                                            </Grid>
                                        )}
                                        {filesUploaded.map((file, index) => (
                                            <Grid item xs={6} lg={3}>
                                                <Card key={index}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column", // Stack children vertically
                                                        justifyContent: "space-between", // Ensure consistent spacing
                                                        height: 260, // Set a uniform height for all cards
                                                    }}>
                                                    {file.type === "application/pdf" ? (
                                                        <iframe
                                                            src={file.base64}
                                                            style={{ width: "100%", height: "180px", border: "none" }}
                                                            
                                                        ></iframe>
                                                    ) : (
                                                        <CardMedia
                                                            sx={{ height: 180 }}
                                                            image={file.base64}
                                                            title={file.name}
                                                        />
                                                    )}
                                                    <CardContent sx={{ flexGrow: 1, maxHeight: 75, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                                        <Typography gutterBottom variant="caption" sx={{ textOverflow: "ellipsis" }}>
                                                            {file.name}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing sx={{ borderTop: `1px solid ${theme.palette.divider}` }} >
                                                        <Tooltip title='edit name' sx={{ marginLeft: 'auto' }}>
                                                            <IconButton disabled={!editMode} size="small" aria-label="edit" onClick={() => handleEditFileUploadedName(index)}>
                                                                <EditIcon sx={{ fontSize: 18 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='delete'>
                                                            <IconButton disabled={!editMode} size="small" color='error' aria-label="delete" onClick={() => handleDeleteFileUploaded(index)}>
                                                                <DeleteIcon sx={{ fontSize: 18 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
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
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                }
            />
        </Stack >
        </Box>

    )
}

export function NewFileCard({ type, handleFileUpload, takePhoto, loading }: { type: 'files' | 'images', handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void, takePhoto?: boolean, loading: boolean }) {
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

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
                    {type === "files" ?
                    <ArchitectureIcon sx={{ fontSize: 50, color: !loading ? theme.palette.primary.main : theme.palette.action.disabled }} />
                    :
                    takePhoto
                        ?
                        <CameraAltIcon sx={{ fontSize: 50, color: !loading ? theme.palette.primary.main : theme.palette.action.disabled }} />
                        :
                        <CameraRollIcon sx={{ fontSize: 50, color: !loading ? theme.palette.primary.main : theme.palette.action.disabled }} />
                    }
                </CardMedia>
                <CardContent sx={{ backgroundColor: !loading ? theme.palette.primary.main : theme.palette.action.disabled, height: 45, p: 0, alignContent: 'center' }}>
                    <Typography variant="button" textAlign="center" color={theme.palette.primary.contrastText}>
                        {type === "files" ? t('ui.button.selectFile') : takePhoto ? t('ui.button.takePhoto') : t('ui.button.selectImage')}
                    </Typography>
                </CardContent>
                {type === 'images' 
                    ?
                    takePhoto ?
                        <input
                            ref={fileInputRef}
                            accept="image/*"
                            id="taking-image-input"
                            type="file"
                            capture="environment"
                            onChange={handleFileUpload}
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
                            onChange={handleFileUpload}
                        />
                    :
                    <input
                            ref={fileInputRef}
                            accept=".pdf, .dwg, .dxf"
                            id="taking-image-input"
                            type="file"
                            capture="environment"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                }
            </Card>
        </label>

    );
}

