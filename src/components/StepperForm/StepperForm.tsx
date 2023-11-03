"use client";

// Imports
import React, { useState, useEffect } from "react";
import { Button, message, Steps } from "antd";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { LocalStorageUtils } from "@/utils/local-storage";
import { useRouter } from "next/navigation";

interface IStep {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepperProps {
  steps: IStep[];
  submitHandler: (el: any) => void;
  navigateLink?: string;
  persistKey: string;
}

const StepperForm = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepperProps) => {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(
    !!LocalStorageUtils.get("step")
      ? Number(JSON.parse(LocalStorageUtils.get("step") as string).step)
      : 0
  );

  const [savedValues, setSavedValues] = useState(
    !!LocalStorageUtils.get(persistKey)
      ? JSON.parse(LocalStorageUtils.get(persistKey) as string)
      : {}
  );

  useEffect(() => {
    LocalStorageUtils.set("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods: any = useForm({ defaultValues: savedValues });
  const watch = methods.watch();

  useEffect(() => {
    LocalStorageUtils.set(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    LocalStorageUtils.set("step", JSON.stringify({ step: 0 }));
    LocalStorageUtils.set(persistKey, JSON.stringify({}));
    setSavedValues({});
    navigateLink && router.push(navigateLink);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
