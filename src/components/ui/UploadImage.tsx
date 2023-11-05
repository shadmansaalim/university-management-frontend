// Imports
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = ({ name, label }: { name: string; label?: string }) => {
  const { setValue } = useFormContext();
  const [showUploadButton, setShowUploadButton] = useState(true);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "done") {
      setValue(name, info.file.originFileObj);
      setShowUploadButton(false);
    }
  };

  return (
    <>
      <Upload
        name={name}
        listType="picture"
        action="/api/file"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        onRemove={() => setShowUploadButton(true)}
      >
        {label && <p style={{ marginBottom: "4px" }}>{label}</p>}
        {showUploadButton && <Button icon={<UploadOutlined />}>Upload</Button>}
      </Upload>
    </>
  );
};

export default UploadImage;
