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
  project: Yup.object({
    supplyChainParts: Yup.array().min(1, 'helperText.project.industryName.number'),
    investmentLocation: Yup.string().required('helperText.project.investmentLocation.required'),
    investmentType: Yup.string().required('helperText.project.investmentType.required')

  })
  // Define validation rules for other fields
})

export default validationSchema