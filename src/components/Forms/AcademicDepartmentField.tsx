// Imports
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type AcademicDepartmentFieldProps = {
  name: string;
  label?: string;
  onChange?: (value: any) => void;
};

const AcademicDepartmentField = ({
  name,
  label,
  onChange,
}: AcademicDepartmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment) => {
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
      handleChange={onChange ? (e) => onChange(e) : undefined}
    />
  );
};

export default AcademicDepartmentField;
