// Imports
import Login from "@/components/ui/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Management-Login",
  description: "University Management Login Page.",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
