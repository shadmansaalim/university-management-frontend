// Imports
import { Row, Space, Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Space>
        <Spin tip="Loading" size="large"></Spin>
      </Space>
    </Row>
  );
};

export default LoadingSpinner;
