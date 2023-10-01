import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { initialFormDataState } from "../features/redux/reducers/formDataSlice";
import { Iasrs } from "../features/interfaces";

export default function CopyOtherSystemDataDropdown({ selectedSystem }: { selectedSystem: string }) {

    const formData = useSelector((state: RootState) => state.formData);

    type AsrsSubpart = keyof Iasrs

    function getChangedSubparts(): AsrsSubpart[] {

        const otherSystems = Object.keys(formData.system).filter(system => system !== selectedSystem);

        return otherSystems.reduce((changedSubparts, system) => {
            const subparts = Object.keys(formData.system[selectedSystem]);
  
            const changedSubpartsInSystem = subparts.filter(subpart => {
                return (
                    JSON.stringify(formData.system[system][subpart]) !==
                    JSON.stringify(initialFormDataState.system[system][subpart])
                );
            });
  
            return changedSubparts.concat(changedSubpartsInSystem);
        }, [] as AsrsSubpart[]);

    }

    console.log(getChangedSubparts())

    return (
        <ul>
           
        </ul>
    )

}