"use client";

// Imports
import { Button, Col, Empty, Row } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormSelectField from "../Forms/FormSelectField";
import { daysOptions } from "@/constants/global";
import FormTimePicker from "../Forms/FormTimePicker";
import BuildingField from "../Forms/BuildingField";
import RoomField from "../Forms/RoomField";
import FacultyField from "../Forms/FacultyField";

const FormDynamicFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classSchedules",
  });

  return (
    <>
      <div>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: "5px",
                  padding: "20px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                }}
              >
                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                  <Col span={8}>
                    <FormSelectField
                      options={daysOptions}
                      name={`classSchedules.${index}.dayOfWeek`}
                      label="Day of week"
                    />
                  </Col>
                  <Col span={8}>
                    <div>
                      <FormTimePicker
                        name={`classSchedules.${index}.startTime`}
                        label="Start time"
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <FormTimePicker
                        name={`classSchedules.${index}.endTime`}
                        label="End time"
                      />
                    </div>
                  </Col>
                  <Col span={8} style={{ margin: "10px 0px" }}>
                    <BuildingField />
                  </Col>
                  <Col span={8} style={{ margin: "10px 0px" }}>
                    <RoomField name={`classSchedules.${index}.roomId`} />
                  </Col>
                  <Col span={8} style={{ margin: "10px 0px" }}>
                    <FacultyField name={`classSchedules.${index}.facultyId`} />
                  </Col>
                </Row>

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                >
                  Delete
                </Button>
              </div>
            );
          })
        ) : (
          <Empty description="No class schedule found" />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button type="primary" onClick={() => append(undefined)}>
          Add Schedule
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
