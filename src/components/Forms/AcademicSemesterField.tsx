// Imports
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";

type AcademicSemesterFieldProps = {
  name: string;
  label: string;
};

const AcademicSemesterField = ({ name, label }: AcademicSemesterFieldProps) => {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });
  const academicSemesters = data?.academicSemesters;
  const academicSemesterOptions = academicSemesters?.map((semester) => {
    return {
      label: semester?.title + "-" + semester?.year,
      value: semester?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={academicSemesterOptions as SelectOptions[]}
    />
  );
};

export default AcademicSemesterField;
