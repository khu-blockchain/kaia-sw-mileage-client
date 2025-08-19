import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { IRegisterDocumentForm } from "../model";

import { useMemo, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { encodePacked, keccak256, toHex } from "viem";

import { mileageRubricQueries } from "@entities/mileage-rubric/api";
import { studentQueries } from "@entities/student";
import { STUDENT_MANAGER_ABI } from "@shared/config";
import { encodeContractExecutionABI, kaia, KaiaTxType } from "@shared/lib/web3";
import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Spinner,
	Textarea,
} from "@/shared/ui";

import { useRegisterMileage } from "../api";
import ApplyMileageFileContainer from "./ApplyMileageFileContainer";
import { useSuspenseQueries } from "@tanstack/react-query";

const ApplySwMileageDocument = () => {
	const navigate = useNavigate();
	const [rubricData, studentData] = useSuspenseQueries({
		queries: [
			{
				...mileageRubricQueries.getRubric(),
			},
			{
				...studentQueries.getMe(),
			},
		],
	});

	const rubrics = rubricData.data;
	const student = studentData.data;

	const { register, handleSubmit, watch, control, setValue } =
		useForm<IRegisterDocumentForm>({
			defaultValues: {
				mileageCategoryName: "",
				mileageActivityId: "",
				mileageDescription: "",
			},
		});

	const [files, setFiles] = useState<Array<File | null>>([null]);

	const selectedCategoryName = watch("mileageCategoryName");

	const selectedRubric = useMemo(
		() => rubrics.find((rubric) => rubric.name === selectedCategoryName),
		[rubrics, selectedCategoryName],
	);

	const handleCategoryChange = (categoryName: string) => {
		setValue("mileageCategoryName", categoryName);
		setValue("mileageActivityId", "");
	};

	const { mutateAsync, isPending } = useRegisterMileage();

	const onError = (error: FieldErrors<IRegisterDocumentForm>) => {
		console.log(error);
		toast.error(
			error.mileageCategoryName?.message ||
				error.mileageActivityId?.message ||
				error.mileageDescription?.message,
		);
	};

	const onSubmitDocument: SubmitHandler<IRegisterDocumentForm> = async (
		data,
	) => {
		console.log(student);
		const formData = new FormData();

		formData.append("studentId", student.studentId);

		Object.entries(data).forEach(([key, value]) => {
			if (value === "") return;
			formData.append(key, value);
		});

		files
			.filter((file) => !!file)
			.forEach((file) => {
				formData.append(`mileageFiles`, file as File);
			});

		const getFileHash = async (file: File) => {
			const arrayBuffer = await file.arrayBuffer();
			const hash = keccak256(new Uint8Array(arrayBuffer));
			return hash.slice(2); // '0x' 제거
		};

		const getCombinedFileHash = async (files: File[]) => {
			const today = new Date().toISOString();

			console.log(today);
			console.log(files);

			// 파일이 없는 경우 null hex와 날짜를 조합
			if (files.length === 0) {
				const nullHex = toHex(new Uint8Array(32));
				const finalHash = keccak256(
					encodePacked(["string"], [nullHex + today]),
				);
				return finalHash;
			}

			const fileHashes = await Promise.all(
				files.map(async (file) => {
					return await getFileHash(file);
				}),
			);

			const concatenatedHashes = fileHashes.join("");
			const finalHash = keccak256(
				encodePacked(["string"], [concatenatedHashes + today]),
			);

			return finalHash;
		};

		const fileHash = await getCombinedFileHash(
			files.filter((file) => !!file) as File[],
		);

		formData.append("docHash", fileHash);

		const transaction = encodeContractExecutionABI(
			STUDENT_MANAGER_ABI,
			"submitDocument",
			[fileHash],
		);

		const rawTransaction = await kaia.wallet.signTransaction({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			from: kaia.browserProvider.selectedAddress,
			to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			data: transaction,
			gas: "0x4C4B40",
		});

		formData.append("rawTransaction", rawTransaction);
		try {
			await mutateAsync(formData);
			toast.success(
				"마일리지 신청이 완료되었습니다.",
				{
					description: "블록체인에 기록되는데 시간이 소요될 수 있습니다.",
				},
			);
			navigate("/history");
		} catch (error) {
			console.error(error);
			toast.error("활동 정보 제출에 실패했습니다.");
		}
	};

	return (
		<form
			className="flex flex-1 content-container"
			onSubmit={handleSubmit(onSubmitDocument, onError)}
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
				<div className="grid grid-cols-5 gap-4 w-full">
					<div className="grid gap-2 col-span-2">
						<Label className="text-sm font-medium text-body">활동 분야</Label>
						<Controller
							name="mileageCategoryName"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={handleCategoryChange}
									value={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="활동 분야를 선택해주세요" />
									</SelectTrigger>
									<SelectContent className="w-full">
										{rubrics.map((rubric) => (
											<SelectItem key={rubric.id} value={rubric.name}>
												{rubric.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="grid gap-2 col-span-3">
						<Label className="text-sm font-medium text-body">비교과 활동</Label>
						<Controller
							name="mileageActivityId"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
									disabled={!selectedCategoryName}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder={"비교과 활동을 선택해주세요"} />
									</SelectTrigger>
									<SelectContent className="w-full">
										{selectedRubric?.mileageActivities.map((activity) => (
											<SelectItem
												key={activity.id}
												value={activity.id.toString()}
											>
												{activity.name}
											</SelectItem>
										)) || []}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
				<div className="grid gap-2">
					<Label className="text-sm font-medium text-body">활동 내용</Label>
					<Textarea
						{...register("mileageDescription")}
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
			<div className="flex gap-6 items-center justify-end">
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
			</div>
		</form>
	);
};

export default ApplySwMileageDocument;
