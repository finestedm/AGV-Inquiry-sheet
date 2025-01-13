import { useTranslation } from "react-i18next";
import CapacityTable from "./CapacityTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';

export default function Capacity({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.capacity`)}
            subTitle={t(`system.subheader.capacitySubtitle`)}
            icon={EqualizerOutlinedIcon}
            content={<CapacityTable selectedSystem={selectedSystem} />}
        />
    )
}

