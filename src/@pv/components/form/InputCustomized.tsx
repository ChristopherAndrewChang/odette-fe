"use client"

import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form"

import { Autocomplete, Divider, FormControlLabel, Switch, Typography } from "@mui/material";

import classNames from "classnames";

import CustomTextField from "@/@core/components/mui/TextField"

type TInputCustomized<T extends FieldValues> = {
    control: Control<T>
    label: string;
    name: Path<T>;
    variant?: "switch" | "select" | "textfield" | "select-infinite";
    isSelectInput?: boolean;
    selectOption?: { label: string; value: string }[];
    isOptionLoading?: boolean,
    rules?: RegisterOptions<T>;
    type?: HTMLInputElement["type"];
    disabled?: boolean;
    isPassword?: boolean;
    onPasswordTypeChange?: () => void;
    required?: boolean;
    useOnlyServerSideSearch?: boolean;
    onSearch?: (value?: string) => void;
    optionMessage?: string;
}

const renderErrorTypography = (error?: string) => (
    <Typography className="text-error text-xs">{error}</Typography>
)

function InputCustomized<T extends FieldValues>({
    control,
    label,
    name,
    rules,
    type,
    disabled,
    isPassword,
    onPasswordTypeChange,
    isSelectInput,
    selectOption,
    isOptionLoading,
    variant = "textfield",
    onSearch,
    useOnlyServerSideSearch,
    optionMessage
}: TInputCustomized<T>) {
    if (isSelectInput) {
        return (
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div>
                        <Autocomplete
                            options={selectOption || []}
                            value={value}
                            getOptionLabel={opt => opt.label}
                            loading={isOptionLoading}
                            disabled={disabled}
                            isOptionEqualToValue={(opt, value) => opt.value === value.value}
                            onChange={(_, value) => onChange(value)}
                            filterOptions={useOnlyServerSideSearch ? (x => x) : undefined}
                            renderOption={(props, opt, { index }) => {
                                return (
                                    <>
                                        {(optionMessage && index === 0) ? (
                                            <>
                                                <div className="px-4 py-1 text-xs italic">
                                                    {optionMessage}
                                                </div>
                                                <Divider />
                                            </>
                                        ) : null}
                                        <li {...props}>
                                            {opt.label}
                                        </li>
                                    </>
                                )
                            }}
                            renderInput={(props) => (
                                <CustomTextField
                                    {...props}
                                    error={!!error?.message}
                                    fullWidth
                                    label={label}
                                    type={type || "text"}
                                    disabled={disabled}
                                    onChange={e => {
                                        onSearch && onSearch(e.target.value);
                                    }}
                                />
                            )}
                        />
                        {renderErrorTypography(error?.message || "")}
                    </div>
                )}
            />
        )
    }

    // this condition is not ready
    if (variant === "select-infinite") {
        return (
            <Controller
                name={name}
                control={control}
                render={() => (
                    <Autocomplete
                        options={selectOption?.map(_opt => ({
                            label: _opt.label,
                            value: _opt.value
                        })) || []}
                        renderInput={() => (
                            <CustomTextField />
                        )}
                    />
                )}
            />
        )
    }

    if (variant === "switch") {
        return (
            <Controller
                control={control}
                name={name}
                disabled={disabled}
                render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                        label={label}
                        disabled={disabled}
                        className="w-fit"
                        control={(
                            <Switch
                                checked={!!value}
                                onChange={(_, checked) => onChange(checked)}
                                disabled={disabled}
                            />
                        )}
                    />
                )}
            />
        )
    }


    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div>
                    {isPassword ? (
                        <CustomTextField
                            fullWidth
                            label={label}
                            value={value}
                            onChange={onChange}
                            error={!!error?.message}
                            type={type || "text"}
                            disabled={disabled}
                            InputProps={{
                                endAdornment: (
                                    <i onClick={onPasswordTypeChange} className={classNames("cursor-pointer text-lg", {
                                        "tabler-eye": type === "password",
                                        "tabler-eye-off": type === "text"
                                    })} />
                                )
                            }}
                        />
                    ) : (
                        <CustomTextField
                            fullWidth
                            label={label}
                            value={value}
                            onChange={onChange}
                            error={!!error?.message}
                            type={type || "text"}
                            disabled={disabled}
                        />
                    )}
                    {renderErrorTypography(error?.message || "")}
                </div>
            )}
        />
    )
}

export default InputCustomized
