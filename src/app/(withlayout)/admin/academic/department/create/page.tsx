"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import { Button, Col, Row, message } from "antd";
import AcademicFacultyField from "@/components/Forms/AcademicFacultyField";

const CreateAcademicDepartmentPage = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating ...");
    try {
      // console.log(data);
      const res = await addAcademicDepartment(data);
      if (!!res) {
        message.success("Academic Department created successfully.");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `admin`, link: `/admin` },
          {
            label: "academic-department",
            link: `/admin/academic/department`,
          },
        ]}
      />
      <h1>Create Academic Department</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Academic Department Title" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <AcademicFacultyField
              name="academicFacultyId"
              label="Academic Faculty"
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

export default CreateAcademicDepartmentPage;
