import { InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { RootState } from "../../../../features/redux/store";
import { ICustomer } from "../../../../features/interfaces";
import { useTranslation } from "react-i18next";
import currencies from "../../../../data/currencies";
import { useState } from "react";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";

export function DoubleInputWithCurrency({ inputKey, perYear }: { inputKey: keyof ICustomer, perYear?: boolean }) {
    const customer = useSelector((state: RootState) => state.formData.present.customer)
    const currentStep = useSelector((state: RootState) => state.steps.present.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const currencyByLanguage = currencies.filter(currency => currency.countries.includes(currentLanguage))?.[0]?.currency || 'EUR'

    return (
        <Stack spacing={1} textAlign='left'>
            <InputLabel>{t(`customer.relations.${inputKey}`)}</InputLabel>
            <Stack direction='row' spacing={1}>
                <TextField
                    fullWidth
                    size="small"
                    name={inputKey}
                    type="number"
                    disabled={!editMode}
                    value={customer[inputKey] === undefined ? '' : trimLeadingZeros(Number(customer[inputKey]))}
                    onChange={(e) => {
                        dispatch(handleInputMethod({ path: `customer.${inputKey}`, value: e.target.value.replace(/\D/g, '') }));
                    }}
                />
                <Select
                    size="small"
                    sx={{minWidth: '16ch'}}
                    value={
                        customer.currency
                            ?
                            customer.currency
                            :
                            currencyByLanguage
                    }
                    disabled={!editMode}
                    onChange={(e) => { dispatch(handleInputMethod({ path: 'customer.currency', value: e.target.value })) }}>
                    {currencies.map(currency =>
                        <MenuItem value={currency.currency}>{currency.currency} {perYear && t('customer.currency.perYear')}</MenuItem>
                    )}
                </Select>
            </Stack>
        </Stack>
    )
}