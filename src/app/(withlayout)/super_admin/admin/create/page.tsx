"use client";

// Imports
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Form from "@/components/Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "../../../../../components/Forms/FormSelectField";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import UploadImage from "@/components/ui/UploadImage";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormTextArea from "@/components/Forms/FormTextArea";
import { createAdminSchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import ManagementDepartmentField from "@/components/Forms/ManagementDepartmentField";

const CreateAdminPage = () => {
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();

  const handleCreateAdmin = async (values: any) => {
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
      const res = await addAdminWithFormData(formData);
      if (!!res) {
        message.success("Admin created successfully.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: "super_admin", link: "/super_admin" },
          { label: "admin", link: "/super_admin/admin" },
        ]}
      />

      <h1 style={{ margin: "12px 0px" }}>Create Admin</h1>
      <div>
        <Form
          submitHandler={handleCreateAdmin}
          resolver={zodResolver(createAdminSchema)}
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
                marginBottom: "10px",
              }}
            >
              Admin Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.name.firstName"
                  size="large"
                  label="First Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.name.middleName"
                  size="large"
                  label="Middle Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.name.lastName"
                  size="large"
                  label="Last Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="admin.gender"
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ManagementDepartmentField
                  name="admin.managementDepartment"
                  label="Department"
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "10px",
                }}
              >
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
                marginBottom: "10px",
              }}
            >
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="admin.email"
                  size="large"
                  label="Email address"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.contactNo"
                  size="large"
                  label="Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.emergencyContactNo"
                  size="large"
                  label="Emergency Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="admin.dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="admin.bloodGroup"
                  options={bloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="admin.designation"
                  size="large"
                  label="Designation"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="admin.presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="admin.permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateAdminPage;
