import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputLabel, Stack, TextField } from '@mui/material';
import { Field, FieldInputProps, FieldProps, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { handleInputMethod } from '../../features/redux/reducers/formDataSlice';
import { ICustomFieldProps } from '../../features/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/redux/store';

export default function CustomTextField(props: ICustomFieldProps) {
  let { fieldName, required, multiline, rows, fullWidth, disabled, type, size } = props;
  size = size || 'small';
  const { t } = useTranslation();
  const formikProps = useFormikContext();
  const dispatch = useDispatch();
  const editMode = useSelector((state: RootState) => state.editMode);
  const field: FieldInputProps<any> = formikProps.getFieldProps(fieldName);

  const [firstPart, secondPart]: string[] = fieldName.split('.');
  const errors = formikProps?.errors as any;
  const touched = formikProps?.touched as any;

  const errorValue = Boolean(errors?.[firstPart]?.[secondPart]);
  const touchedValue = touched?.[firstPart]?.[secondPart];
  const helperTextValue = touchedValue && errors?.[firstPart]?.[secondPart] ? t(`${errors[firstPart][secondPart]}`) : '';

  const handleBlur = (e: any) => {
    dispatch(handleInputMethod({ path: fieldName, value: e.target.value }));
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
          if (type === 'number') {
            formikProps.setFieldValue(fieldName, e.target.value.replace(/\D/g, ''));
          } else {
            formikProps.setFieldValue(fieldName, e.target.value);
          }
        }}
        onBlur={handleBlur}
        error={errorValue}
        helperText={helperTextValue}
      />
    </Stack>
  );
}
