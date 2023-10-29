import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFormData } from "../features/interfaces";
import dayjs from "dayjs";
import { setFormData } from "../features/redux/reducers/formDataSlice";
import { useDispatch } from "react-redux";

export default function InquiriesDialog({ inquiriesDialogOpen, handleInquiriesDialogClose }: { inquiriesDialogOpen: boolean, handleInquiriesDialogClose: () => void }) {

    const [inquiries, setInquiries] = useState<IFormData[]>()
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<IFormData>()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:5000/api/inquiries')
            .then(res => {
                const fileList = res.data.inquiries;
                console.log(fileList)
                setInquiries(fileList)
                setLoading(false)

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });

    }, [inquiriesDialogOpen]);


    return (
        <Dialog fullScreen={fullScreen} maxWidth='lg' open={inquiriesDialogOpen} onClose={handleInquiriesDialogClose}>
            <DialogTitle sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
                <Typography variant="h5" >
                    {t('ui.dialog.inquiriesDialog.header')}
                </Typography>
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {loading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={50} animation="wave" />
                    ))
                }
                {inquiries && inquiries.length > 0 ?
                    (
                        inquiries.map(inquiry => (
                            <ListItem key={inquiry.customer.name} disableGutters>
                                <ListItemButton selected={inquiry === selectedInquiry} onClick={() => setSelectedInquiry(inquiry)}>
                                    <ListItemText primary={inquiry.customer.name} secondary={`${inquiry.timestamp ? dayjs(inquiry.timestamp).format('DD.MM.YYYY, HH:mm') : ''}, ${inquiry.sales.contactPerson}`} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No inquiries found on server</Typography>
                    )
                }
            </List>
            <DialogActions>
                <Button disabled={!selectedInquiry} onClick={() => selectedInquiry && dispatch(setFormData(selectedInquiry))} color="success">
                    {t('ui.dialog.inquiriesDialog.confirm')}
                </Button>
                <Button onClick={handleInquiriesDialogClose} autoFocus >
                    {t('ui.dialog.inquiriesDialog.cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}