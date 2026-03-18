import React, { forwardRef } from 'react'

import type { TextFieldProps } from '@mui/material';
import { styled, TextField } from '@mui/material'

const StyedBorderlessInputTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        padding: "0 !important",
        boxShadow: "none !important",
        "&:hover": {
            boxShadow: "none !important",
        },
        "&.Mui-focused": {
            boxShadow: "none !important",
        },
        "& fieldset": {
            border: "none",
        },
        "&:hover fieldset": {
            border: "none",
        },
        "&.Mui-focused fieldset": {
            border: "none",
        },
    },
    "& .MuiAutocomplete-input": {
        padding: "0 !important",
    },
})

const BorderlessTextField = forwardRef<HTMLInputElement, TextFieldProps>(
    function BorderlessInput(props, ref) {
        return (
            <StyedBorderlessInputTextField {...props} inputRef={ref} />
        )
    }
)

export default BorderlessTextField
