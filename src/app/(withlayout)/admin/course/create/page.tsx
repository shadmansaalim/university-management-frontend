"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import { Button, Col, Row, message } from "antd";

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();

  const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });

  const courses = data?.courses;
  const coursesOptions = courses?.map((course) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });

  const onSubmit = async (data: any) => {
    // Parsing credits to int before sending in backend
    data.credits = parseInt(data?.credits);

    const preRequisiteCourseOptions = data?.preRequisiteCourses?.map(
      (id: string) => {
        return {
          courseId: id,
        };
      }
    );

    data.preRequisiteCourses = preRequisiteCourseOptions;

    message.loading("Creating ...");
    try {
      const res = await addCourse(data).unwrap();
      if (res?.id) {
        message.success("Course created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <UMBreadCrumb
            items={[
              { label: `admin`, link: `/admin` },
              { label: "course", link: `/admin/course` },
            ]}
          />
          <h1 style={{ margin: "10px 0px" }}>Create Course</h1>
          <Form submitHandler={onSubmit}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput name="title" label="Title" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput name="code" label="Course Code" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput name="credits" label="Course Credits" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormMultiSelectField
                    options={coursesOptions as SelectOptions[]}
                    name="preRequisiteCourses"
                    label="Pre Requisite Courses"
                  />
                </div>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default CreateCoursePage;
