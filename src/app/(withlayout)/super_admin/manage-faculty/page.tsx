"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";

const ManageFacultyPage = () => {
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />

      <ActionBar title="Faculty List">
        <Link href="/super_admin/manage-faculty/create">
          <Button type="primary">Create Faculty</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageFacultyPage;
