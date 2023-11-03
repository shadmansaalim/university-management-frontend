"use client";

import Form from "@/components/Forms/Form";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  academicSemesterTitleCodeMapper,
  monthOptions,
} from "@/constants/global";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";

import { Button, Col, Row, message } from "antd";
import { academicSemesterOptions } from "../../../../../../constants/global";

const CreateAcademicSemesterPage = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: any) => {
    // Assigning the academic semester code based on selected option
    data.code =
      academicSemesterTitleCodeMapper[
        data.title as keyof typeof academicSemesterTitleCodeMapper
      ];

    // Parsing year to integer
    data.year = parseInt(data.year);

    message.loading("Creating ...");
    try {
      const res = addAcademicSemester(data);
      if (!!res) {
        message.success("Academic Semester Created successfully");
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
          { label: "academic-semester", link: `/admin/academic/semester` },
        ]}
      />
      <h1>Create Academic Semester</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="title"
                options={academicSemesterOptions}
                label="Title"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="startMonth"
                options={monthOptions}
                label="Start Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="endMonth"
                options={monthOptions}
                label="End Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormYearPicker name="year" label="Year" picker="year" />
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

export default CreateAcademicSemesterPage;
