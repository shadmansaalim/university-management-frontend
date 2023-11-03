"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { IMeta } from "@/types";
import { Button, Input, message } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  useAcademicDepartmentsQuery,
  useDeleteAcademicDepartmentMutation,
} from "@/redux/api/academic/departmentApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";

const AcademicDepartmentPage = () => {
  // States
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();

  // API call query
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

  // Getting all academic departments
  const { data, isLoading } = useAcademicDepartmentsQuery({ ...query });

  const academicDepartments = data?.academicDepartments;
  const meta = data?.meta as IMeta;

  // Function to delete academic department
  const deleteHandler = async (id: string) => {
    message.loading("Deleting ...");
    try {
      const res = await deleteAcademicDepartment(id);
      if (res) {
        message.success("Academic Department Deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
      key: "createdAt",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/academic/department/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
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
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="Academic Department List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href="/admin/academic/department/create">
            <Button type="primary">Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={academicDepartments}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
      />
    </div>
  );
};

export default AcademicDepartmentPage;
