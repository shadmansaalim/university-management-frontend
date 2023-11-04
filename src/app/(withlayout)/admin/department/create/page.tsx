"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Col, message, Row } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createManagementDepartmentSchema } from "@/schemas/department";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";

const CreateDepartmentPage = () => {
  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating ...");
    try {
      await addDepartment(data);
      message.success("Department added successfully.");
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
          { label: "department", link: `/admin/department` },
        ]}
      />
      <h1>Create Department</h1>
      <Form
        submitHandler={onSubmit}
        resolver={zodResolver(createManagementDepartmentSchema)}
      >
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

export default CreateDepartmentPage;
