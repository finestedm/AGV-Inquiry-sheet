import { Dispatch, SetStateAction } from "react";
import { IFormData } from "../App";

export default function FormASRSStep({ formData, setFormData, data }: { formData: IFormData, setFormData: Dispatch<SetStateAction<IFormData>>, data: string }) {
    return (
        <h1>{data}</h1>
    )
}
