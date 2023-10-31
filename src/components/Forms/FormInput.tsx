"use client";

// Imports
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

// Types
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {label && <p style={{ marginBottom: "4px" }}>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              required={required}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              required={required}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
