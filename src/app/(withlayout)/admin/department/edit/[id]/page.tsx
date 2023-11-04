"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

const EditDepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading } = useDepartmentQuery(id);
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating ...");
    try {
      await updateDepartment({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || "",
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <UMBreadCrumb
            items={[
              {
                label: "admin",
                link: "/admin",
              },
              {
                label: "department",
                link: "/admin/department",
              },
            ]}
          />
          <ActionBar title="Update Department"> </ActionBar>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="title" label="Title" />
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditDepartmentPage;
