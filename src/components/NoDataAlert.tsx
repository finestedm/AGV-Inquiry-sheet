import CustomAlert from "./CustomAlert";

export default function NoDataAlert() {
    return (
        <CustomAlert
            severity="error"
            title='No data found'
            text="This file does not contain this data, was prepared in older version or data is corrupted"
        />
    )
}