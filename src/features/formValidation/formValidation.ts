import * as Yup from 'yup';

const validationSchema = Yup.object({
  customer: Yup.object({
    name: Yup.string().required('Name is required'),
    sapNumber: Yup.string()
      .matches(/^4\d{7}$/, 'SAP Number must start with 4 and have 8 digits')
      .notRequired(),
    address: Yup.string().required('Address is required'),
  }),

  // Define validation rules for other fields
})

export default validationSchema