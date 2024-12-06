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

    function calculateDistanceTwice(flow: IFlow) {
        return flow.bidirectional ? 2 : 1
    }

    function calculateOperationsPerHour(flow: IFlow) {
        const operationTimeSeconds = (flow.distance / truckSpeed) + 2 * pickUpStationOperationTime
        const operationTimeMinutes = operationTimeSeconds / 60
        const operationsPerHour = Math.floor(60 / operationTimeMinutes)
        console.log(operationTimeMinutes)
        return operationsPerHour
    }

    useEffect(() => {

        const flowsTotal = flows
            .map(flow => calculateDistanceTwice(flow) * flow.flowAverage / calculateOperationsPerHour(flow))
            .reduce((sum, value) => sum + value, 0);
        setRequiredTrucks(flowsTotal)


    }, [flows])


    return (
        <Box>
            <Typography>Required number of trucks: {requiredTrucks.toString()}</Typography>
        </Box>
    )
}