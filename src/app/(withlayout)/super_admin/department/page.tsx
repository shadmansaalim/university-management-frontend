"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { IUserDecodedTokenData } from "@/types";
import { Button } from "antd";
import Link from "next/link";

const ManageDepartmentPage = () => {
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
      <h1>Department List</h1>
      <Link href="/super_admin/department/create">
        <Button type="primary">Create Department</Button>
      </Link>
    </div>
  );
};

export default ManageDepartmentPage;
