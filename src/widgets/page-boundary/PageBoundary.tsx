import type { FallbackProps } from "react-error-boundary";

import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@shared/ui";

function Loading() {
	return (
		<div className="flex justify-center items-center h-64">
			<div className="text-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
				<p className="text-gray-600">데이터를 불러오는 중...</p>
			</div>
		</div>
	);
};

function CommonErrorFallback({ resetErrorBoundary }: FallbackProps) {
	return (
		<div className="flex flex-col w-full h-full items-center justify-center">
			<p className="text-black text-4xl font-bold mb-2">문제가 발생했어요</p>
			<p className="text-gray-500 text-sm mb-8">잠시 후 다시 시도해주세요</p>
			<Button onClick={() => resetErrorBoundary()}>새로고침</Button>
		</div>
	);
};

export default function PageBoundary({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary FallbackComponent={CommonErrorFallback}>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</ErrorBoundary>
	);
};

