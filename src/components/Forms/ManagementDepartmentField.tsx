// Imports
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ManagementDepartmentFieldProps = {
  name: string;
  label?: string;
};

const ManagementDepartmentField = ({
  name,
  label,
}: ManagementDepartmentFieldProps) => {
  const { data, isLoading } = useDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const departments = data?.departments;
  const departmentOptions = departments?.map((department) => {
    return {
      label: department?.title,
      value: department?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={departmentOptions as SelectOptions[]}
    />
  );
};

export default ManagementDepartmentField;
