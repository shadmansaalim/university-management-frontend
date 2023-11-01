"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { IMeta, IUserDecodedTokenData } from "@/types";
import { Button, Input } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

const ManageDepartmentPage = () => {
  // User Role
  const { role } = getUserInfo() as IUserDecodedTokenData;

  // States
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // API call departments query
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  // Optimizing API call for user search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // Getting all departments
  const { data, isLoading } = useDepartmentsQuery({ ...query });

  const departments = data?.departments;
  const meta = data?.meta as IMeta;

  // Table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      sorter: true,
      key: "createdAt",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/department/edit/${data?.id}`}>
              <Button
                style={{
                  marginRight: "5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
      key: "action",
    },
  ];

  // Function that triggers when pagination related anything changes
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  // Function that triggers when something on table changes
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { field, order } = sorter;

    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  // Function to reset user search and filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

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
      <ActionBar title="Department List">
        <Input
          type="text"
          size="large"
          placeholder="Search Department"
          style={{
            width: "20%",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href="/super_admin/department/create">
            <Button type="primary">Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button onClick={resetFilters} style={{ margin: "0px 5px" }}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={departments}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
      />
    </div>
  );
};

export default ManageDepartmentPage;
