// Imports
import { DatePicker, DatePickerProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type UMDatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = "large",
}: UMDatePikerProps) => {
  const { control, setValue, reset } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    if (date) {
      setValue(name, dateString);
    } else {
      reset();
    }
  };

  return (
    <div>
      {label && <p style={{ marginBottom: "4px" }}>{label}</p>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={dayjs(field.value) || ""}
            size={size}
            onChange={handleOnChange}
            style={{ width: "100%" }}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
