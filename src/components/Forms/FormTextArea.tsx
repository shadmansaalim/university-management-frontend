// Imports
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  required,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col  w-full`}>
      {label && <p style={{ marginBottom: "4px" }}>{label}</p>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
            required={required}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
