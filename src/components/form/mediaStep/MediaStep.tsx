import { Box, Button, Card, CardContent, CardMedia, Grid, InputLabel, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import { useDispatch } from "react-redux";
import { FormikProps, useFormikContext } from "formik";
import { IFormData, IMedia } from "../../../features/interfaces";
import InputGroup from "../InputGroup";
import { ChangeEvent, useState } from "react";
import imageCompression from 'browser-image-compression';
import plusImage from '../../../images/plus-svgrepo-com.svg'
import { handleInputMethod } from "../../../features/redux/reducers/formDataSlice";

export default function FormMediaStep(): JSX.Element {

    const { t } = useTranslation();
    const theme = useTheme();
    const formData = useSelector((state: RootState) => state.formData);
    const imagesUploaded = formData.media.images;
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const [images, setImages] = useState<IMedia['images']>([]);
    
    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;
    
        const files = Array.from(input.files);
    
        try {
            // Map over the files and compress each one
            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    const options = {
                        maxSizeMB: 1,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);
                    const base64 = await fileToBase64(compressedFile);
    
                    return { base64, name: file.name }; // Return both base64 and the file name
                })
            );
    
            // Add all the compressed and converted images to the current state
            setImages((prevImages) => [...prevImages, ...compressedFiles]);
    
        } catch (error) {
            console.error('Error while compressing or converting image:', error);
        }
    };
    
    
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    function handleImageDispatch() {
        // Filter out images that are already in `imagesUploaded`
        const uniqueNewImages = images.filter((newImage) => {
            return !imagesUploaded.some((existingImage) =>
                existingImage.base64 === newImage.base64
            );
        });
    
        dispatch(handleInputMethod({
            path: 'media.images',
            value: [...imagesUploaded, ...uniqueNewImages],
        }));

        setImages([])
    }
    

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
                                        {images.map((image, index) => (
                                            <Grid item xs={6} md={3}> 
                                                <Card key={index} sx={{ maxWidth: 345 }}>
                                                    <CardMedia
                                                        sx={{ height: 140 }}
                                                        image={image.base64}
                                                        title={image.name}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="caption">
                                                            {image.name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                        <Grid item xs={6} md={3}> 
                                                <Card sx={{ maxWidth: 345 }}>
                                                    <CardMedia
                                                        sx={{ height: 140 }}
                                                        image={plusImage}
                                                        title='upload'
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="caption">
                                                            Select Images
                                                        </Typography>
                                                        <input disabled={!editMode} accept="image/*" type="file" multiple onChange={(e) => handleImageUpload(e)} id="upload-image-button" />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                    </Grid>
                                    <Button disabled={!editMode} onClick={handleImageDispatch}>upload</Button>
                            </Stack>
                        </Box>
                    </Stack>
                }
            />
            <InputGroup
                title={t('media.subheader.imagesUploaded')}
                content={
                    <Stack spacing={2}>
                        <Box>
                            <Stack spacing={2}>
                                    <Grid container spacing={2}>
                                        {imagesUploaded.map((image, index) => (
                                            <Grid item xs={6} md={3}> 
                                                <Card key={index} sx={{ maxWidth: 345 }}>
                                                    <CardMedia
                                                        sx={{ height: 140 }}
                                                        image={image.base64}
                                                        title={image.name}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="caption">
                                                            {image.name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                        </Grid>
                            </Stack>
                        </Box>
                    </Stack>
                }
            />
        </Stack >

    )
}