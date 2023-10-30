import { Layout } from "antd";
import Sidebar from "../../components/ui/Sidebar";
import Contents from "@/components/ui/Contents";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
