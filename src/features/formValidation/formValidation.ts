import * as Yup from 'yup';

const validationSchema = Yup.object({
  sales: Yup.object({
    contactPerson: Yup.string().required('helperText.sales.contactPerson.required'),
  }),
  customer: Yup.object({
    name: Yup.string().required('helperText.customer.name.required'),
    sapNumber: Yup.string()
      .matches(/^4\d{7}$/, 'helperText.customer.sapNumber.format')
      .notRequired(),
    address: Yup.string().required('helperText.customer.address.required'),
    contactPersonMail: Yup.string()
      .email('helperText.customer.contactPersonMail.format')
      .notRequired(),
    industryName: Yup.array().min(1, 'helperText.customer.industryName.number'),
    relations: Yup.string().required('helperText.customer.relations.number'),
  }),
  // Define validation rules for other fields
})

export default validationSchema