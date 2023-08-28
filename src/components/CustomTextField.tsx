import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from "@mui/material";
import { FieldProps } from 'formik';
import { useDispatch } from 'react-redux';
import { handleInputMethod } from '../features/redux/reducers/formDataSlice';

interface CustomFieldProps extends Partial<FieldProps> {
  fieldName: string;
  required?: boolean;
}

export default function CustomTextField(props: CustomFieldProps) {
  const { fieldName, required, field, form, ...rest } = props;

  const [firstPart, secondPart]: string[] = fieldName.split('.');

  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (form) {
      dispatch(handleInputMethod({ path: fieldName, value: e.target.value }))
      form.setFieldValue(fieldName, e.target.value);
    }
  };

  const touchedValue = form?.touched[firstPart] && typeof form.touched[firstPart] === 'object' && (form.touched[firstPart] as any)[secondPart];

  const errors = form?.errors as any; // Cast form.errors to 'any'

  const errorValue = Boolean(errors?.[firstPart]?.[secondPart]);
  const helperTextValue = touchedValue && errors?.[firstPart]?.[secondPart] ? t(`${errors[firstPart][secondPart]}`) : '';

  return (
    <TextField
      {...field}
      {...rest}
      required={required}
      variant="outlined"
      label={t(`${fieldName}`)}
      onChange={handleChange}
      error={errorValue}
      helperText={helperTextValue}
    />
  );
};

