import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { Field, FieldInputProps, FieldProps, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { handleInputMethod } from '../features/redux/reducers/formDataSlice';

interface CustomFieldProps {
  fieldName: string;
  required?: boolean;
}

export default function CustomTextField(props: CustomFieldProps) {
  const { fieldName, required } = props;
  const { t } = useTranslation();
  const formikProps = useFormikContext();
  const dispatch = useDispatch()
  const field: FieldInputProps<any> = formikProps.getFieldProps(fieldName)

  const [firstPart, secondPart]: string[] = fieldName.split('.');
  const errors = formikProps?.errors as any; // Cast form.errors to 'any'
  const touched = formikProps?.touched as any; // Cast form.errors to 'any'

  const errorValue = Boolean(errors?.[firstPart]?.[secondPart]);
  const touchedValue = touched?.[firstPart]?.[secondPart]
  const helperTextValue = touchedValue && errors?.[firstPart]?.[secondPart] ? t(`${errors[firstPart][secondPart]}`) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Update Formik field value
    formikProps.handleChange(e);

    // Update formData field using Redux dispatch
    dispatch(handleInputMethod({ path: fieldName, value: newValue }));
  };
  console.log(formikProps.errors)

  return (
    <Field
      as={TextField}
      name={fieldName}
      required={required}
      variant="outlined"
      label={t(`${fieldName}`)}
      value={field.value}
      onChange={handleChange}
      error={errorValue}
      helperText={helperTextValue}
    />
  );
}