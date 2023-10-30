"use client";

// Imports
import { Layout } from "antd";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return <Content style={{ color: "black" }}>{children}</Content>;
};

export default Contents;
