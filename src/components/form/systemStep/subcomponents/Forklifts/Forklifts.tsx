import { useTranslation } from "react-i18next";
import { ISystems } from "../../../../../features/interfaces";
import InputGroup from "../../../InputGroup";
import ForkLiftSelector from "../ForkLiftSelector";

export default function Forklifts({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const {t} = useTranslation();

        return (
            <InputGroup
                title={t(`system.subheader.forklifts`)}
                content={<ForkLiftSelector selectedSystem={selectedSystem} />}
            />
        )
}