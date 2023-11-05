"use client";

// Imports
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { Button, Col, Row, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFacultySchema } from "../../../../../schemas/faculty";
import { useAddFacultyWithFormDataMutation } from "@/redux/api/facultyApi";
import AcademicFacultyField from "@/components/Forms/AcademicFacultyField";
import AcademicDepartmentField from "@/components/Forms/AcademicDepartmentField";

const CreateFacultyPage = () => {
  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();

  const handleCreateFaculty = async (values: any) => {
    // Destructuring
    const obj = { ...values };
    // Getting the file and storing and then deleting from obj
    const file = obj["file"];
    delete obj["file"];
    // Stringify JSON object
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating ...");
    try {
      const res = await addFacultyWithFormData(formData);
      if (!!res) {
        message.success("Faculty created successfully.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: "admin", link: "/admin" },
          { label: "manage-faculty", link: "/admin/manage-faculty" },
        ]}
      />
      <h1 style={{ margin: "12px 0px" }}>Create Faculty</h1>
      <Form
        submitHandler={handleCreateFaculty}
        resolver={zodResolver(createFacultySchema)}
      >
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              margin: "5px 0px",
            }}
          >
            Faculty information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.name.firstName"
                label="First name"
                size="large"
              />
            </Col>

            <Col span={6} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.name.middleName"
                label="Middle name"
                size="large"
              />
            </Col>

            <Col span={6} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.name.lastName"
                label="Last name"
                size="large"
              />
            </Col>

            <Col span={6} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="password"
                label="Password"
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="faculty.gender"
                label="Gender"
                options={genderOptions}
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <AcademicFacultyField
                name="faculty.academicFaculty"
                label="Academic Faculty"
              />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <AcademicDepartmentField
                name="faculty.academicDepartment"
                label="Academic Department"
              />
            </Col>

            <Col span={24} style={{ margin: "10px 0" }}>
              <UploadImage name="file" label="Profile Image" />
            </Col>
          </Row>
        </div>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              margin: "5px 0px",
            }}
          >
            Basic information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="email"
                name="faculty.email"
                label="Email address"
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.contactNo"
                label="Contact no."
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.emergencyContactNo"
                label="Emergency contact no."
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormDatePicker
                name="faculty.dateOfBirth"
                label="Date of birth"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="faculty.bloodGroup"
                label="Blood group"
                options={bloodGroupOptions}
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="faculty.designation"
                label="Designation"
                size="large"
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="faculty.presentAddress"
                label="Present address"
                rows={4}
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="faculty.permanentAddress"
                label="Permanent address"
                rows={4}
              />
            </Col>
          </Row>
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

export default CreateFacultyPage;
