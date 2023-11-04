"use client";
// Imports
import AcademicSemesterField from "@/components/Forms/AcademicSemesterField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddSemesterRegistrationMutation } from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateSemesterRegistrationPage = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data?.minCredit);
    data.maxCredit = parseInt(data?.maxCredit);

    // console.log(data);
    message.loading("Creating ...");
    try {
      const res = await addSemesterRegistration(data).unwrap();
      if (res?.id) {
        message.success("Semester registration successfully added.");
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
          {
            label: "semester-registration",
            link: `/admin/semester-registration`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Semester Registration</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker
                name="startDate"
                label="Start Date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="endDate" label="End Date" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <AcademicSemesterField
                name="academicSemesterId"
                label="Academic Semester"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="minCredit" label="Min Credit" type="number" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="maxCredit" label="Max Credit" type="number" />
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

export default CreateSemesterRegistrationPage;
