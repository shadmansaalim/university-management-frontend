"use client";

// Imports
import AcademicDepartmentField from "@/components/Forms/AcademicDepartmentField";
import Form from "@/components/Forms/Form";
import OfferedCoursesField from "@/components/Forms/OfferedCoursesField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import { Button, Col, Row, message } from "antd";
import SemesterRegistrationField from "@/components/Forms/SemesterRegistrationField";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const onSubmit = async (data: any) => {
    console.log(data);

    message.loading("Creating ...");
    try {
      const res = await addOfferedCourse(data);
      if (!!res) {
        message.success("Offered Course created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `admin`, link: `/admin` },
          { label: "offered-course", link: `/admin/offered-course` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Offered Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <SemesterRegistrationField
                name="semesterRegistrationId"
                label="Semester registration"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <OfferedCoursesField name="courseIds" label="Courses" />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <AcademicDepartmentField
                name="academicDepartmentId"
                label="Academic department"
              />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateOfferedCoursePage;
