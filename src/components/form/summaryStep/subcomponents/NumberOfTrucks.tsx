import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { IFlow } from "../../../../features/interfaces";
import { useEffect, useState } from "react";

export default function NumberOfTrucks() {
    const AGVFormData = useSelector((state: RootState) => state.formData.system.agv)
    const flows = AGVFormData.flow
    const truckSpeed = 2 // m/s
    const pickUpStationOperationTime = 30 // seconds
    const [requiredTrucks, setRequiredTrucks] = useState<Number>(0)
    const [operationPerHour, setOperationPerHour] = useState<Number[]>([])


    function calculateDistanceTwice(flow: IFlow) {
        return flow.bidirectional ? 2 : 1
    }

    function calculateOperationsPerHour(flow: IFlow) {
        let operationTimeSeconds = (flow.distance / truckSpeed) + 2 * pickUpStationOperationTime
        operationTimeSeconds = operationTimeSeconds * calculateDistanceTwice(flow)
        const operationTimeMinutes = operationTimeSeconds / 60
        const operationsPerHour = Math.floor(60 / operationTimeMinutes)
        return operationsPerHour
    }

    useEffect(() => {

        // calculate number of operations 1 trucks is able to perform in one hour
        setOperationPerHour(flows.map(flow => calculateOperationsPerHour(flow)))

        // calculate number of trucks required
        const flowsTotal = flows
            .map(flow => flow.flowAverage / calculateOperationsPerHour(flow))
            .reduce((sum, value) => sum + value, 0);
        setRequiredTrucks(Math.ceil(flowsTotal))



    }, [flows])


    return (
        <Box textAlign='left'>
            <Typography>Required number of trucks: {requiredTrucks.toString()}</Typography>
            {operationPerHour.map((operation, index) =>
                <Typography>flow number {index + 1}: one truck is able to perform: {operation.toString()} operations</Typography>
            )}
        </Box>
    )
}