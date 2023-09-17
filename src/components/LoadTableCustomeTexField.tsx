import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material";

interface LoadTableCustomTextFieldProps {
    type?: string; // You can provide a more specific type if necessary
    value: any; // You can provide a more specific type if necessary
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    endAdornment?: string;
}

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        padding: 0,
        margin: 0
    },
    "& .MuiOutlinedInput-input": {
        padding: 0 // <-- added zero padding instruction
      }
});

function LoadTableCustomTextField({ type, value, onChange, endAdornment, }: LoadTableCustomTextFieldProps) {
    return (
        <CustomTextField
            size='small'
            type={type}
            value={value}
            onChange={onChange}
            onWheel={(event) => event.currentTarget.querySelector('input')?.blur()} // this disables scroll changing values on number inputs
            InputProps={{
                endAdornment: (
                    endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : ''
                ),
                
            }}
        />
    );
}

export default LoadTableCustomTextField;
