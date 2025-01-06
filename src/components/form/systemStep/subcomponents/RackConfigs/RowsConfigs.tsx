import { ISystems } from "../../../../../features/interfaces";
import RowsConfigsTable from "./RowsConfigsTable";

export default function RowsConfigs({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    return (
        <RowsConfigsTable selectedSystem={selectedSystem} />
    )
}