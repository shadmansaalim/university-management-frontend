"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddBuildingMutation } from "@/redux/api/buildingApi";
import { Button, Col, Row, message } from "antd";

const CreateBuildingPage = () => {
  const [addBuilding] = useAddBuildingMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating ...");
    try {
      const res = await addBuilding(data).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Building added successfully");
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
          { label: "building", link: `/admin/building` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Building</h1>
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

export default CreateBuildingPage;
