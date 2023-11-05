"use client";

// Imports
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  useMyRegistrationQuery,
  useStartRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Alert, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StudentRegistrationPage = () => {
  const { data, isLoading } = useMyRegistrationQuery({});
  console.log(data);
  const [startRegistration] = useStartRegistrationMutation();
  const router = useRouter();

  const goToRegistrationHandler = async () => {
    if (!data?.studentSemesterRegistrationData) {
      try {
        await startRegistration({}).unwrap();
      } catch (error) {}
    }
    router.push("/student/pre-registration");
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div style={{ margin: "10px 0px" }}>
            {data?.semesterRegistrationData &&
            data?.semesterRegistrationData?.status === "ONGOING" &&
            !data?.studentSemesterRegistrationData?.isConfirmed ? (
              <Button type="primary" danger onClick={goToRegistrationHandler}>
                Go to registration
              </Button>
            ) : (
              <>
                <div>
                  You are not allowed to do your registration. Stay tuned.
                </div>
              </>
            )}
          </div>

          {!data?.semesterRegistrationData ||
            (data?.studentSemesterRegistrationData?.isConfirmed && (
              <div>
                <Alert
                  message={
                    <>
                      <span>
                        Your registration has been completed successfully
                      </span>
                      <Link
                        href="/student/courses"
                        style={{ marginLeft: "10px" }}
                      >
                        View Your courses
                      </Link>
                    </>
                  }
                  type="success"
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default StudentRegistrationPage;
