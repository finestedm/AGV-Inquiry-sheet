import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { Field, FormikProps, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputMethod } from '../../features/redux/reducers/formDataSlice';
import { ICustomFieldProps, IFormData } from '../../features/interfaces';
import { RootState } from '../../features/redux/store';

export default function CustomCheckbox(props: ICustomFieldProps) {
    const { fieldName, required, label, size, icon } = props;
    const { t } = useTranslation();
    const formikProps: FormikProps<IFormData> = useFormikContext();

    const dispatch = useDispatch();

    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const field = formikProps.getFieldProps(fieldName);

    // Utility to dynamically access nested properties based on fieldName path
    const getNestedError = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const errorValue = Boolean(getNestedError(formikProps.errors, fieldName));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formikProps.setFieldValue(fieldName, e.target.checked); // Update Formik state
        dispatch(handleInputMethod({ path: fieldName, value: e.target.checked }));
    };

    return (
        <Box>
            <Stack spacing={1} textAlign="left" position='relative' sx={{ left: -11 }}>
                <FormControlLabel
                    control={
                        <Field
                            as={Checkbox}
                            name={fieldName}
                            checked={field.value || false}
                            onChange={handleChange}
                            disabled={!editMode}
                            size={size || 'medium'}
                            required={required}
                        />
                    }
                    label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant='body1'>{t(label || fieldName)}</Typography>
                            {icon &&
                                React.createElement(icon, {
                                    sx: { fontSize: '20px' }
                                })
                            }
                        </Stack>
                    }
                />
                {errorValue && (
                    <span style={{ color: 'red', fontSize: '0.75rem' }}>
                        {t(`${getNestedError(formikProps.errors, fieldName)}`)}
                    </span>
                )}
            </Stack>
        </Box>
    );
}
