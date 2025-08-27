import { ChangeEvent, memo, useState } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  AutocompleteProps,
  IconButton,
  TextField,
  TextFieldProps,
} from "@mui/material";

const textColorClass = "text-grey-500";
export type Radios = {
  label: string | number;
  value: string | number | boolean;
};

type CustomFormFieldType = {
  control: any;
  name: string;
  fieldProps: TextFieldProps;
  rules: RegisterOptions;
  element: "input" | "autocomplete";
};

export type CustomAutocompleteType = CustomFormFieldType & {
  options: any[];
  loading?: boolean;
  autocompleteProps?: Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "renderInput" | "options"
  >;
};

export type TextFieldType = Omit<CustomFormFieldType, "control">;
export type AutocompleteType = Omit<
  CustomAutocompleteType,
  "control" | "options"
>;

export type PropType = CustomFormFieldType | CustomAutocompleteType;
export const maxStringSize = 254;
const types = ["text", "password", "email", "number"];

const CustomFormField = memo((props: PropType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string>("");
  const { control, name, rules, element, fieldProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ ...rules, maxLength: fieldProps?.InputProps?.inputProps?.maxLength || maxStringSize }}
      render={({
        field: { ref, onChange, value = null, ...field },
        fieldState: { error },
      }) => {
        if (element === "input") {
          return (
            <TextField
              {...fieldProps}
              {...field}
              label={
                <span className={textColorClass}>
                  {fieldProps.label}
                  {rules?.required && <span className="text-red-500">*</span>}
                </span>
              }
              error={!!error || Boolean(fieldError)}
              helperText={error?.message || fieldError}
              type={showPassword ? "text" : fieldProps.type}
              value={value || ""}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                onChange(e.target.value);
                value?.length >
                (fieldProps.InputProps?.inputProps?.maxLength || maxStringSize)
                  ? setFieldError(`Maximum characters ${maxStringSize}`)
                  : setFieldError("");
              }}
              InputProps={{
                ...fieldProps.InputProps,
                endAdornment:
                  fieldProps.type === "password" ? (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  ) : (
                    fieldProps.InputProps?.endAdornment || <></>
                  ),
                inputProps: {
                  maxLength: maxStringSize,
                  ...fieldProps.InputProps?.inputProps,
                },
                sx: {
                  height: '40px', // Reduced input height
                  '& .MuiInputBase-input': {
                    padding: '8px 12px', // Reduced padding for smaller height
                    fontSize: '0.875rem', // Smaller font size
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: '0.875rem', // Smaller label font size
                  top: '-4px', // Adjust label position for smaller field
                  '&.Mui-focused, &.MuiFormLabel-filled': {
                    transform: 'translate(14px, -9px) scale(0.75)', // Adjust label transform
                  },
                },
                ...(types.includes(fieldProps.type as string)
                  ? { shrink: true }
                  : {}),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px', // Slightly rounded corners
                  '& fieldset': {
                    borderColor: 'gray.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray.500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue.500',
                  },
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '0.75rem', // Smaller helper text
                  marginTop: '2px',
                },
              }}
            />
          );
        }

        if (element === "autocomplete") {
          return (
            <Autocomplete
              {...field}
              {...(props as CustomAutocompleteType).autocompleteProps}
              options={(props as CustomAutocompleteType).options || []}
              value={value || null}
              onChange={(_, data) => {
                onChange(data || null);
              }}
              loading={(props as CustomAutocompleteType)?.loading}
              renderInput={(params) => (
                <TextField
                  inputRef={ref}
                  {...params}
                  {...fieldProps}
                  label={
                    <span className={textColorClass}>
                      {fieldProps.label}
                      {rules.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </span>
                  }
                  error={!!error}
                  helperText={error?.message || ""}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      height: '40px', // Reduced input height
                      '& .MuiInputBase-input': {
                        padding: '8px 12px', // Reduced padding
                        fontSize: '0.875rem', // Smaller font size
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: '0.875rem', // Smaller label font size
                      top: '-4px',
                      '&.Mui-focused, &.MuiFormLabel-filled': {
                        transform: 'translate(14px, -9px) scale(0.75)',
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'gray.300',
                      },
                      '&:hover fieldset': {
                        borderColor: 'gray.500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'blue.500',
                      },
                    },
                    '& .MuiFormHelperText-root': {
                      fontSize: '0.75rem',
                      marginTop: '2px',
                    },
                  }}
                />
              )}
            />
          );
        }
        return <div></div>;
      }}
    />
  );
});

export { CustomFormField };