"use client";

// Imports
import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const FormMultiSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "Select",
  options,
  label,
  defaultValue,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label && <p style={{ marginBottom: "4px" }}>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={onChange}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear
            mode="multiple"
          />
        )}
      />
    </>
  );
};

export default FormMultiSelectField;
