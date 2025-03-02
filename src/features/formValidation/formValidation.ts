import * as Yup from 'yup';

const validationSchema = Yup.object({
  sales: Yup.object({
    salesUnit: Yup.string().required('helperText.sales.salesUnit.required'),
    contactPerson: Yup.string().required('helperText.sales.contactPerson.required'),
    OPNumber: Yup.string()
      .matches(/^4\d{7}$/, 'helperText.customer.OPNumber.format')
      .notRequired(),
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
    industryNameOther: Yup.string()
      .when('industryName', {
        is: (industryName: string) => industryName && industryName.includes('other'),
        then: (schema) => schema.required('helperText.customer.industryNameOther.required'),
      }),
    relations: Yup.number().required('helperText.customer.relations.number').min(0, 'helperText.customer.relations.number')
  }),
  project: Yup.object({
    supplyChainParts: Yup.array().required('helperText.project.supplyChainParts.number').min(1, 'helperText.project.supplyChainParts.number'),
    investmentType: Yup.string().required('helperText.project.investmentType.required'),
    it: Yup.object().shape({
      existingSystem: Yup.object().shape({
        name: Yup.number().when('present', {
            is: (present: boolean) => present === true,
            then: (schema) =>
                schema.notOneOf([-1], 'helperText.project.it.existingSystem.name.number')
                      .required('helperText.project.it.existingSystem.name.required'),
        }),
        existingOther: Yup.string().when(['present', 'name'], {
            is: (present: boolean, name: number) => present === true && name === 2,
            then: (schema) => schema.required('helperText.project.it.existingSystem.existingOther.required'),
        }),
      }),
  })
  })
})
export default validationSchema
