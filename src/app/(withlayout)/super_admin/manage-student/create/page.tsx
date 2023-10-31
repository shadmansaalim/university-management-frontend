// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const CreateStudentPage = () => {
  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "manage-student", link: `/${base}/manage-student` },
        ]}
      />
      <h1>Create Students Page</h1>
    </div>
  );
};

export default CreateStudentPage;
