import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
import { FormikErrors } from 'formik'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';
import { DateValidationError } from '@mui/x-date-pickers';
import { FormikProps, useFormikContext, Field } from 'formik'
import { useDispatch } from 'react-redux';
import { handleInputMethod } from '../../features/redux/reducers/formDataSlice';
import { IFormData } from '../../features/interfaces';

export default function CustomDatePicker({ label, value, helperText, minDate, maxDate }: { label: string, value: Date | dayjs.Dayjs, helperText: undefined | FormikErrors<Date>, minDate: Date | dayjs.Dayjs, maxDate?: Date | dayjs.Dayjs, }) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleDateChange = (
        newValue: Date | dayjs.Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>
    ) => {
        if (newValue) {
            const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
            formikProps.setFieldValue('project.milestones.officialOffer', formattedDate)
            dispatch(handleInputMethod({ path: 'project.milestones.officialOffer', value: formattedDate }))
        }
    }


    const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from contex

    return (
        <Grid item xs={6} sm={4}>
            <DatePicker
                sx={{ width: '100%' }}
                label={t(label)}
                format='DD-MM-YYYY'
                value={value}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                disablePast
                slotProps={{
                    textField: {
                        helperText: (
                            <>
                                {helperText && typeof helperText === 'string' && <span>{helperText}</span>}
                                {helperText && typeof helperText === 'object' && (
                                    <span>{JSON.stringify(helperText)}</span>
                                )}
                            </>
                        ),
                    },
                }}
            />
        </Grid>
    );
};