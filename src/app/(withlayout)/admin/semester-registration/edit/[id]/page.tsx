"use client";

import AcademicSemesterField from "@/components/Forms/AcademicSemesterField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { semesterRegistrationStatus } from "@/constants/global";
import {
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const EditSemesterRegistrationPage = ({ params }: { params: any }) => {
  const { id } = params;
  const router = useRouter();

  const { data, isLoading } = useSemesterRegistrationQuery(id);

  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  const updateOnSubmit = async (values: any) => {
    const payload = { ...values };

    payload["startDate"] = dayjs(payload["startDate"]).toISOString();
    payload["endDate"] = dayjs(payload["endDate"]).toISOString();
    payload["minCredit"] = Number(payload["minCredit"]);
    payload["maxCredit"] = Number(payload["maxCredit"]);

    message.loading("Updating ...");
    try {
      const res = await updateSemesterRegistration({
        id,
        body: payload,
      }).unwrap();
      if (res?.id) {
        router.push("/admin/semester-registration");
        message.success("Semester registration updated successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((el) => {
      if (data?.status === "UPCOMING") {
        if (el.value === "ENDED") {
          el.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (el.value === "UPCOMING") {
          el.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (el.value === "UPCOMING" || el.value === "ONGOING") {
          el.disabled = true;
        }
      }
      return el;
    });

  const defaultValues = {
    startDate: data?.startDate,
    endDate: data?.endDate,
    academicSemesterId: data?.academicSemester?.id,
    minCredit: data?.minCredit,
    maxCredit: data?.maxCredit,
    status: data?.status,
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <UMBreadCrumb
            items={[
              { label: "admin", link: "/admin" },
              {
                label: "semester-registration",
                link: "/admin/semester-registration",
              },
            ]}
          />
          <ActionBar title="Edit semester registration"></ActionBar>
          <Form submitHandler={updateOnSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormDatePicker name="startDate" label="Start Date" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormDatePicker name="endDate" label="End Date" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <AcademicSemesterField
                    name="academicSemesterId"
                    label="Academic semester"
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="number"
                    name="minCredit"
                    label="Min Credit"
                  />
                </div>

                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="number"
                    name="maxCredit"
                    label="Max Credit"
                  />
                </div>

                <div style={{ margin: "10px 0px" }}>
                  <FormSelectField
                    options={statusOptions}
                    name="status"
                    label="Status"
                  />
                </div>
              </Col>
            </Row>
            <Button htmlType="submit">Update</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditSemesterRegistrationPage;
