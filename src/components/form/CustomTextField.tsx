import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputLabel, Stack, TextField } from '@mui/material';
import { Field, FieldInputProps, FormikProps, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputMethod } from '../../features/redux/reducers/formDataSlice';
import { ICustomFieldProps, IFormData } from '../../features/interfaces';
import { RootState } from '../../features/redux/store';

export default function CustomTextField(props: ICustomFieldProps) {
  let { fieldName, required, multiline, rows, fullWidth, disabled, type, size } = props;
  size = size || 'small';
  const { t } = useTranslation();
  const formikProps: FormikProps<IFormData> = useFormikContext(); 

  const dispatch = useDispatch();
  const editMode = useSelector((state: RootState) => state.editMode);
  const field: FieldInputProps<any> = formikProps.getFieldProps(fieldName);

  // Utility to dynamically access nested properties based on fieldName path
  const getNestedError = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const errorValue = Boolean(getNestedError(formikProps.errors, fieldName));
  const helperTextValue = getNestedError(formikProps.errors, fieldName)
    ? t(`${getNestedError(formikProps.errors, fieldName)}`)
    : '';

  const handleBlur = (e: any) => {
    dispatch(handleInputMethod({ path: fieldName, value: e.target.value }));
  };

  // Prevent non-numeric key input (allowing only numbers, backspace, delete, etc.)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (type === 'number') {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
      ];
      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <Stack spacing={1} textAlign='left'>
      <InputLabel required={required}>{t(`${fieldName}`)}</InputLabel>
      <Field
        as={TextField}
        fullWidth={fullWidth}
        multiline={multiline}
        size={size}
        type={type}
        rows={rows}
        disabled={disabled || !editMode}
        name={fieldName}
        required={required}
        variant="outlined"
        value={field.value}
        onChange={(e: any) => {
          let value = e.target.value;
          if (type === 'number') {
            value = value.replace(/\D/g, ''); // Remove any non-numeric characters
          }
          formikProps.setFieldValue(fieldName, value); // Update Formik state
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} // Restrict keypress for non-numeric input
        error={errorValue}
        helperText={helperTextValue}
        inputProps={type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : undefined} // Add inputMode for mobile
      />
    </Stack>
  );
}
