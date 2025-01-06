import { useTranslation } from "react-i18next";
import { ISystems } from "../../../../../features/interfaces";
import InputGroup from "../../../InputGroup";
import GuidanceSelector from "../GuidanceSelector";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/redux/store";

export default function Guidance({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const {t} = useTranslation();
    const forkliftState = useSelector((state: RootState) => state.formData.system[selectedSystem].forklift);
    const isSystemTruck = forkliftState === 'System'

    if (isSystemTruck) {
        return (
            <InputGroup
                title={t(`system.subheader.forklifts`)}
                content={<GuidanceSelector selectedSystem={selectedSystem} />}
            />
        )
    } else {
        return null
    }
}