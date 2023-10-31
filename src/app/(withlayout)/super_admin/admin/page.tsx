"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { IUserDecodedTokenData } from "@/types";
import { Button } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";

const ManageAdminPage = () => {
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
      <ActionBar title="Admin List">
        <Link href="/super_admin/admin/create">
          <Button type="primary">Create Admin</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageAdminPage;
