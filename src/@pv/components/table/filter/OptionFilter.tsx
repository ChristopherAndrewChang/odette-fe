// "use client";

// import React, { useEffect, useState } from 'react'

// import { Autocomplete, Typography } from '@mui/material';

// import classNames from 'classnames';

// import CustomTextField from '@/@core/components/mui/TextField';
// import { useQueryParams } from '@/utils/hooks/use-query-params';

// type TOptionFilter = {
//     label: string;
//     valueKey: string;
//     options: { label: string; value: string }[];
//     loading?: boolean;
//     useServerSearchOnly?: boolean;
//     onSearch?: (value?: string) => void;
// };

// function OptionFilter({ label, options, valueKey, loading, useServerSearchOnly, onSearch }: TOptionFilter) {
//     const [value, setValue] = useState<{
//         label: string;
//         value: string;
//     }>({
//         label: "All",
//         value: ""
//     });

//     const { addParam, removeParam, getParam, hasParam } = useQueryParams();

//     useEffect(() => {
//         if (!value?.value) {
//             removeParam(valueKey);
//         } else {
//             addParam(valueKey, value.value);
//         }
//     }, [value]);

//     useEffect(() => {
//         if (hasParam(valueKey)) {
//             const tempValueSelected = getParam(valueKey);

//             if (options && tempValueSelected) {
//                 const selected = options.find(opt => opt.value === tempValueSelected);

//                 if (selected) {
//                     setValue(selected);
//                 }
//             }
//         } else {
//             setValue({
//                 label: "All",
//                 value: ""
//             })
//         }
//     }, [options]);

//     return (
//         <div className={classNames("flex items-center gap-2 shadow-xs p-2 px-4 rounded-xl border", {
//             "border-gray-200": !value.value,
//             "border-gray-500": value.value
//         })}>
//             <Typography className="text-black font-semibold">{label}</Typography>
//             <Autocomplete
//                 options={[
//                     {
//                         label: "All",
//                         value: ""
//                     },
//                     ...options
//                 ]}
//                 size="small"
//                 loading={loading}
//                 disableClearable
//                 getOptionLabel={(opt) => opt.label}
//                 isOptionEqualToValue={(opt, value) => opt.value === value.value}
//                 value={value}
//                 filterOptions={useServerSearchOnly ? (x => x) : undefined}
//                 onChange={(_, _value) => {
//                     setValue(_value);
//                 }}
//                 renderInput={(props) => (
//                     <CustomTextField
//                         {...props}
//                         className="border border-gray-200"
//                         onChange={e => {
//                             onSearch && onSearch(e.target.value);
//                         }}
//                     />
//                 )}
//                 renderOption={(props, opt) => {
//                     return (
//                         <>
//                             <li {...props}>
//                                 {opt.label}
//                             </li>
//                         </>
//                     )
//                 }}
//                 className="flex-1"
//             />
//         </div>
//     )
// }

// export default OptionFilter

"use client";

import React, { useEffect, useState } from 'react'

import { Autocomplete, Divider, Typography } from '@mui/material';

import classNames from 'classnames';

import { useQueryParams } from '@/@pv/hooks/use-query-params';
import BorderlessTextField from './BorderlessInput';

type TOptionFilter = {
    label: string;
    valueKey: string;
    options: { label: string; value: string }[];
    loading?: boolean;
    useServerSearchOnly?: boolean;
    onSearch?: (value?: string) => void;
    optionMessage?: string;
};

function OptionFilter({ label, options, valueKey, loading, useServerSearchOnly, onSearch, optionMessage }: TOptionFilter) {
    const [value, setValue] = useState<{
        label: string;
        value: string;
    } | null>(null);

    const [isTypingSearch, setIsTypingSearch] = useState(false);

    const { addParam, removeParam, getParam, hasParam } = useQueryParams();

    useEffect(() => {
        if (!value?.value) {
            removeParam(valueKey);
        } else {
            addParam(valueKey, value.value);
        }
    }, [value]);

    useEffect(() => {
        if (!isTypingSearch) {
            if (hasParam(valueKey)) {
                const tempValueSelected = getParam(valueKey);

                if (options && tempValueSelected) {
                    const selected = options.find(opt => opt.value === tempValueSelected);

                    if (selected) {
                        setValue(selected);
                    }
                }
            } else {
                setValue(null)
            }
        }
    }, [options, isTypingSearch]);

    return (
        <div className={classNames("flex items-center gap-2 shadow-xs p-2 rounded-xl border", {
            "border-gray-200": !value?.value,
            "border-gray-500": !!value?.value
        })}>
            <Typography className="text-black font-semibold">{label}</Typography>
            <div className='border-l h-full w-1' />
            <Autocomplete
                options={[
                    ...options
                ]}
                size="small"
                loading={loading}
                getOptionLabel={(opt) => opt.label}
                isOptionEqualToValue={(opt, value) => opt.value === value.value}
                value={value}
                filterOptions={useServerSearchOnly ? (x => x) : undefined}
                onBlur={() => {
                    setIsTypingSearch(false)
                }}
                onInputChange={(_, value, reason) => {
                    if (onSearch && (reason === 'input' || reason === 'clear')) {
                        setIsTypingSearch(true);

                        onSearch(value);
                    }
                }}
                onChange={(_, _value) => {
                    setValue(_value);
                }}
                renderInput={(props) => (
                    <BorderlessTextField
                        {...props}
                        onChange={e => {
                            onSearch && onSearch(e.target.value);
                        }}
                    />

                    // <CustomTextField
                    //     {...props}
                    //     size='small'
                    //     className="border border-gray-200"
                    //     onChange={e => {
                    //         onSearch && onSearch(e.target.value);
                    //     }}
                    // />
                )}
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
                className="flex-1"
            />
        </div>
    )
}

export default OptionFilter
