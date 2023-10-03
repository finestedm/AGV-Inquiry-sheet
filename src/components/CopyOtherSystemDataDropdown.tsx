import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { initialFormDataState } from "../features/redux/reducers/formDataSlice";
import { Iasrs } from "../features/interfaces";
import { useEffect, useState } from "react";

export default function CopyOtherSystemDataDropdown({ selectedSystem }: { selectedSystem: string }) {

    type AsrsSubpart = keyof Iasrs;
    const [changedSystems, setChangedSystem] = useState<Record<string, AsrsSubpart[]>>({});
    const formData = useSelector((state: RootState) => state.formData);

    useEffect(() => {
        const systems = Object.keys(formData.system);

        const newChangedSystems = systems.reduce((result, system) => {
            if (system !== selectedSystem) {
                const subparts = Object.keys(formData.system[system]);

                const changedSystemInSystems = subparts
                    .filter(subpart => {
                        return (
                            JSON.stringify(formData.system[system][subpart]) !==
                            JSON.stringify(initialFormDataState.system[system][subpart])
                        );
                    });

                if (changedSystemInSystems.length > 0) {
                    result[system] = changedSystemInSystems as AsrsSubpart[];
                }
            }

            return result;
        }, {} as Record<string, AsrsSubpart[]>);

        setChangedSystem(newChangedSystems);
    }, [formData, selectedSystem]);

    console.log()
    return (
        <ul>
            {Object.entries(changedSystems).map(([system, subparts]) => (
                <li key={system}>
                    {system}
                    <ul>
                        {subparts.map(subpart => (
                            <li key={subpart}>{subpart}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul> 
    )
}