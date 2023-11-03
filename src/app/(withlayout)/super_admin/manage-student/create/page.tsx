"use client";

// Imports
import StepperForm from "@/components/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import StudentInfo from "@/components/StudentForms/StudentInfo";
import BasicInfo from "../../../../../components/StudentForms/BasicInfo";
import GuardianInfo from "../../../../../components/StudentForms/GuardianInfo";
import LocalGuardianInfo from "../../../../../components/StudentForms/LocalGuardianInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentSchema } from "../../../../../schemas/student";

const CreateStudentPage = () => {
  // Form steps
  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <BasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];

  const handleCreateStudent = async (data: any) => {
    try {
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `super_admin`, link: `/super_admin` },
          { label: "manage-student", link: `/super_admin/manage-student` },
        ]}
      />

      <h1 style={{ margin: "12px 0px" }}>Create Students</h1>
      <StepperForm
        submitHandler={(value) => {
          handleCreateStudent(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
