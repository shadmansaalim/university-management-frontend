"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { IUserDecodedTokenData } from "@/types";
import { Button } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";

const ManageFacultyPage = () => {
  const { role } = getUserInfo() as IUserDecodedTokenData;

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
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
