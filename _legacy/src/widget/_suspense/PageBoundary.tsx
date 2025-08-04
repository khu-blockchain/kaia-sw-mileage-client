import { CommonErrorFallback } from "@/widget/_suspense";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const PageBoundary = ({children}: {children: React.ReactNode}) => {
  return (
    <ErrorBoundary FallbackComponent={CommonErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}> 
        {children}
      </Suspense>
    </ErrorBoundary>
  )
};

export default PageBoundary;
