import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRegisterDocumentForm, registerDocumentSchema } from "./form";
import { useStudentStore } from "@/features/student";
import { useEffect } from "react";
import { useGetActivityField } from "@/features/document/queries";

const useRegisterDocumentForm = () => {
  const student = useStudentStore((state) => state.actions).getStudent();
  const { data: activityField } = useGetActivityField();

  const methods = useForm<IRegisterDocumentForm>({
    resolver: zodResolver(registerDocumentSchema),
    defaultValues: {
      studentId: student.student_id,
      name: student.name,
      department: student.department,
      email: student.email,
      phoneNumber: student.phone_number,
      walletAddress: student.wallet_address,
      content: "",
      academicField: "",
      extracurricularActivity: "",
      extracurricularActivityClassification: "",
    },
  });

  const { watch, setValue } = methods;

  const parseExtracurricularActivityClassification = (object: any) => {
    if (
      !object ||
      object.hasOwnProperty("default") ||
      object.hasOwnProperty("description") ||
      object.hasOwnProperty("optional")
    ) {
      return [];
    }
    return Object.keys(object);
  };

  const hasClassification = (
    academicField: string,
    extracurricularActivity: string
  ) => {
    if (academicField === "" || extracurricularActivity === "") {
      return false;
    }
    return (
      parseExtracurricularActivityClassification(
        activityField[academicField][extracurricularActivity]
      ).length > 0
    );
  };

  useEffect(() => {
    if (watch("academicField")) {
      setValue(
        "extracurricularActivity",
        Object.keys(activityField[watch("academicField")])[0]
      );
    }
  }, [watch("academicField")]);

  useEffect(() => {
    if (
      watch("extracurricularActivity") &&
      hasClassification(
        watch("academicField"),
        watch("extracurricularActivity")
      )
    ) {
      setValue(
        "extracurricularActivityClassification",
        Object.keys(
          activityField[watch("academicField")][
            watch("extracurricularActivity")
          ]
        )[0]
      );
    } else {
      setValue("extracurricularActivityClassification", "");
    }
  }, [watch("academicField"), watch("extracurricularActivity")]);

  return {
    methods,
    activityField,
    hasClassification,
    parseExtracurricularActivityClassification,
  };
};

export { useRegisterDocumentForm };
