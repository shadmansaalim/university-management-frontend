"use client";

// Imports
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import { IMeta } from "@/types";
import { useFacultyCourseStudentsQuery } from "@/redux/api/facultyApi";
import Link from "next/link";

const FacultyCoursesStudentsPage = ({
  searchParams,
}: {
  searchParams: {
    courseId: string;
    courseTitle: string;
    courseSection: string;
    offeredCourseSectionId: string;
  };
}) => {
  const { courseId, courseTitle, courseSection, offeredCourseSectionId } =
    searchParams;

  // States
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // API call query
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (!!courseId) {
    query["courseId"] = courseId;
  }
  if (!!offeredCourseSectionId) {
    query["offeredCourseSectionId"] = offeredCourseSectionId;
  }

  // Optimizing API call for user search
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // Getting all data
  const { data, isLoading } = useFacultyCourseStudentsQuery({ ...query });

  const myCourseStudents = data?.myCourseStudents;
  const meta = data?.meta as IMeta;

  // Table columns
  const columns = [
    {
      title: "Student Name",
      render: function (data: any) {
        const fullName = `${data?.firstName} ${data?.middleName || ""} ${
          data?.lastName
        }`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      render: function (data: any) {
        console.log(data);
        return (
          <div key="1" style={{ margin: "20px 0px" }}>
            <Link
              href={`/faculty/student-result?studentId=${data.id}&courseId=${courseId}&courseTitle=${courseTitle}&courseSection=${courseSection}&offeredCourseSectionId=${offeredCourseSectionId}`}
            >
              <Button type="primary">View Marks</Button>
            </Link>
          </div>
        );
      },
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
            label: "faculty",
            link: "/faculty",
          },
          {
            label: "courses",
            link: "/faculty/courses",
          },
        ]}
      />
      <ActionBar
        title={courseTitle}
        subTitle={`Section ${courseSection} Students`}
      >
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={myCourseStudents}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default FacultyCoursesStudentsPage;
