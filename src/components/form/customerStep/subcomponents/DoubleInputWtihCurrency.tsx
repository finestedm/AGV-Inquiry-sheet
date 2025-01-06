import React from "react";
import { Divider, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { RootState } from "../../../../features/redux/store";
import { ICustomer } from "../../../../features/interfaces";
import { useTranslation } from "react-i18next";
import currencies from "../../../../data/currencies";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";

export function DoubleInputWithCurrency({ inputKey, perYear }: { inputKey: keyof ICustomer, perYear?: boolean }) {
    const customer = useSelector((state: RootState) => state.formData.present.customer);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== "summary";
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;


    const formatNumberWithSpaces = (value: string) => {
        // Remove all non-digit characters (including spaces and commas)
        const cleanValue = value.replace(/\D/g, '');
        // Format the number with spaces every 3 digits
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Remove spaces from the value to process it as a clean number
        const cleanValue = value.replace(/\D/g, '');
        dispatch(handleInputMethod({ path: `customer.${inputKey}`, value: cleanValue }));
    };

    const formattedValue = formatNumberWithSpaces(customer[inputKey] === undefined ? '' : String(customer[inputKey]));

    const currencyByLanguage =
        currencies.filter((currency) => currency.countries.includes(currentLanguage))?.[0]?.currency || "EUR";

    return (
        <Stack spacing={1} textAlign="left">
            <InputLabel>{t(`customer.relations.${inputKey}`)}</InputLabel>
            <TextField
                fullWidth
                size="small"
                name={inputKey}
                type="text"
                disabled={!editMode}
                value={formattedValue}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"
                            sx={{ minWidth: "12ch", height: "2.4rem" }}
                        >
                            <Divider orientation="vertical" />
                            <Select
                                disableUnderline
                                size="small"
                                value={customer.currency ? customer.currency : currencyByLanguage}
                                disabled={!editMode}
                                onChange={(e) => {
                                    dispatch(
                                        handleInputMethod({
                                            path: "customer.currency",
                                            value: e.target.value,
                                        })
                                    );
                                }}
                                variant="standard"
                            >
                                {currencies.map((currency) => (
                                    <MenuItem key={currency.currency} value={currency.currency}>
                                        {currency.currency} {perYear && t("customer.currency.perYear")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}
