"use client";

// Imports
import Image from "next/image";
import errorImage from "../assets/error-image.png";

const ErrorPage = () => {
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
          <Image src={errorImage} width={500} alt="404 image" />
        </div>
        <div style={{ margin: "16px 0px" }}>
          <h2 style={{ color: "#e76f51" }}>Something Went Wrong!</h2>
          <p style={{ marginTop: "6px" }}>
            We are sorry, something went wrong in the website. Please try again
            later or report it to our team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
