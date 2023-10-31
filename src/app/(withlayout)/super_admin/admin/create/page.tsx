// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const CreateAdminPage = () => {
  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "admin", link: `/${base}/admin` },
        ]}
      />
      <h1>Create Admin Page</h1>
    </div>
  );
};

export default CreateAdminPage;
