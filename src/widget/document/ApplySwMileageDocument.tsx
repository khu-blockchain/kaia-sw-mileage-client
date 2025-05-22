import {
  useRegisterDocumentForm,
  useApplySwMileage,
  IRegisterDocumentForm,
} from "@/features/document";
import { ErrorMessage } from "@/shared/component";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import {
  Separator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Textarea,
  Button,
  Spinner,
} from "@/shared/ui";
import { useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";
import ApplyMileageFileContainer from "./ApplyMileageFileContainer";

const ApplySwMileageDocument = () => {
  const {
    methods: {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
    },
    activityField,
    hasClassification,
    parseExtracurricularActivityClassification,
  } = useRegisterDocumentForm();

  const [files, setFiles] = useState<Array<File | null>>([null]);

  const { mutate, isPending } = useApplySwMileage({
    onSuccess: (_) => {
      toast("SW 마일리지 신청이 완료되었습니다.");
    },
    onError: () => {},
  });

  const onSubmitDocument: SubmitHandler<IRegisterDocumentForm> = (data) => {
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === "") return;
      formData.append(key, value);
    });

    files
      .filter((file) => !!file)
      .forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

    mutate(formData);
  };

  return (
    <form
      className="flex flex-1 content-container"
      onSubmit={handleSubmit(onSubmitDocument)}
    >
      <div className="grid gap-2">
        <p className="text-xl font-semibold">활동 정보</p>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {
            "활동 분야 및 내용을 입력해 주세요. 내용 증명이 필요한 경우 파일을 첨부해주세요."
          }
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <div className="flex gap-4 w-full">
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-body">학술 분야</Label>
            <Controller
              name="academicField"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="학술 분야" />
                  </SelectTrigger>
                  <SelectContent className="w-[160px]">
                    {Object.entries(ACTIVITY_CATEGORIES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-body">비교과 활동</Label>
            <Controller
              name="extracurricularActivity"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={watch("academicField") === ""}
                >
                  <SelectTrigger className="w-[342px]">
                    <SelectValue placeholder="비교과 활동" />
                  </SelectTrigger>
                  <SelectContent className="w-[342px]">
                    {watch("academicField")
                      ? Object.keys(activityField[watch("academicField")]).map(
                          (key) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          )
                        )
                      : ["-"]}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {hasClassification(
            watch("academicField"),
            watch("extracurricularActivity")
          ) && (
            <div className="flex flex-col w-full gap-2">
              <Label className="text-md font-medium text-body">
                비교과 활동 구분
              </Label>
              <Controller
                name="extracurricularActivityClassification"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={
                      !hasClassification(
                        watch("academicField"),
                        watch("extracurricularActivity")
                      )
                    }
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="비교과 활동 구분 선택" />
                    </SelectTrigger>
                    <SelectContent className="w-[300px]">
                      {watch("extracurricularActivity")
                        ? parseExtracurricularActivityClassification(
                            activityField[watch("academicField")][
                              watch("extracurricularActivity")
                            ]
                          ).map((key) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          ))
                        : []}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-medium text-body">활동 내용</Label>
          <Textarea
            {...register("content")}
            className="h-30"
            placeholder="활동 내용을 입력해주세요."
          />
        </div>
        <div className="grid gap-2">
          <div className="flex w-full justify-between items-center">
            <Label className="text-sm font-medium text-body">활동 증명</Label>
            <Label
              onClick={() => setFiles((prev) => prev.concat(null))}
              className="text-sm font-medium text-index cursor-pointer"
            >
              파일 추가
            </Label>
          </div>
          {files.map((_, index) => (
            <ApplyMileageFileContainer
              key={index}
              index={index}
              files={files}
              setFiles={setFiles}
            />
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex gap-6 items-center">
        <Button type="submit" className="w-min" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-1">
              <Spinner />
              <span>제출중...</span>
            </div>
          ) : (
            "제출하기"
          )}
        </Button>
        {errors?.academicField?.message && (
          <ErrorMessage
            errors={errors}
            fields={[
              { field: "academicField", label: "학술 분야" },
              { field: "content", label: "활동 내용" },
            ]}
          />
        )}
      </div>
    </form>
  );
};

export default ApplySwMileageDocument;
