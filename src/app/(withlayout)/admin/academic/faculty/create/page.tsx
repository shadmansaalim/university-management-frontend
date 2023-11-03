"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicFacultyMutation } from "@/redux/api/academic/facultyApi";

import { Button, Col, Row, message } from "antd";

const CreateAcademicFacultyPage = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating ...");
    try {
      console.log(data);
      const res = await addAcademicFaculty(data);
      if (!!res) {
        message.success("Academic Faculty Created Successfully");
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
          { label: "academic-faculty", link: `/admin/academic/faculty` },
        ]}
      />
      <h1>Create Academic Faculty</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateAcademicFacultyPage;
