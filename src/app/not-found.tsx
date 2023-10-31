// Imports
import Image from "next/image";
import notFoundImage from "../assets/not-found-image.png";
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <div>
          <Image src={notFoundImage} width={500} alt="404 image" />
        </div>
        <div style={{ margin: "16px 0px" }}>
          <h2>Page Not Found</h2>
          <p style={{ marginTop: "6px" }}>
            We are sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>
        </div>
        <Button
          type="primary"
          shape="round"
          icon={<HomeOutlined />}
          size="large"
        >
          <Link href="/profile">Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
