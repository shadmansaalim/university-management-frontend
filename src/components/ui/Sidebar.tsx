"use client";

// Imports
import { Layout, Menu } from "antd";
import { useState } from "react";
const { Sider } = Layout;
import { sidebarItems } from "@/constants/sidebarItems";
import { ENUM_USER_ROLES } from "@/constants/role";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = ENUM_USER_ROLES.ADMIN;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          margin: "1rem 0 1rem 0",
        }}
      >
        UM Portal
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
