"use client";

// Imports
import { Layout } from "antd";
import Sidebar from "../../components/ui/Sidebar";
import Contents from "@/components/ui/Contents";
import { isLoggedIn } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Getting whether user is logged in or not
  const userSession = isLoggedIn();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirecting to login page if user not authenticated
    if (!userSession) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
