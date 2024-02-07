import { useTranslation } from "react-i18next";
import CapacityTable from "./CapacityTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";

export default function Capacity({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.capacity`)}
            content={<CapacityTable selectedSystem={selectedSystem} />}
        />
    )
}

