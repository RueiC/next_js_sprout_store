import * as yup from "yup";

export const schema = yup.object().shape({
  firstname: yup.string().required("此選項必填"),
  lastname: yup.string().required("此選項必填"),
  phoneNum: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "號碼必須是10個字元")
    .max(10, "號碼必須是10個字元")
    .required("此選項必填"),
  email: yup.string().email("請輸入有效的email格式").required("此選項必填"),
  country: yup.string().required("此選項必填"),
  city: yup.string().required("此選項必填"),
  street: yup.string().required("此選項必填"),
  postalCode: yup.number().required("此選項必填"),
  packageType: yup.string().required("此選項必填"),
  transportationOps: yup.string().required("此選項必填"),
});
