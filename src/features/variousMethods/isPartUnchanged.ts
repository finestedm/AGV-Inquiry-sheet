import { ICustomer, IFormData, IProject, ISales, ISystemData, ISystems, TPart } from "../interfaces";
import { initialFormDataState } from "../redux/reducers/formDataSlice";


export default function isPartUnchanged({ formData, part, step, systemToCheck }: { formData: IFormData, part: TPart, step?: keyof IFormData, systemToCheck?: keyof ISystems }) {

    if (step) {
        //@ts-ignore
        return JSON.stringify(formData[step][part]) === JSON.stringify(initialFormDataState[step][part]);
    } else {

        const systemsToCheck = systemToCheck ? [systemToCheck] : Object.keys(formData.system) as Array<keyof ISystems>;

        return systemsToCheck.every(system => {
            // the stringify below is needed for some weird reason - when loading localstorage data it is not recognized as the same as initialFormDataState even though it is virtually the same! JS in it's peak
        //@ts-ignore
            return JSON.stringify(formData.system[system][part]) === JSON.stringify(initialFormDataState.system[system][part]);
        });
    }
}