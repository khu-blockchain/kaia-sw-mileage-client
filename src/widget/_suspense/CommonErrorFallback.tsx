import { Button } from "@/shared/ui";
import { FallbackProps } from "react-error-boundary";

const CommonErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <p className="text-black text-4xl font-bold mb-2">문제가 발생했어요</p>
      <p className="text-gray-500 text-sm mb-8">잠시 후 다시 시도해주세요</p>
      <Button onClick={() => resetErrorBoundary()}>새로고침</Button>
    </div>
  )
};

export default CommonErrorFallback;