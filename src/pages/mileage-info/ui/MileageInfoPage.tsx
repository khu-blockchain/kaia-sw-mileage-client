import { PageBoundary } from "@widgets/page-boundary";
import MileageGuide from "./MileageGuide";

export default function MileageInfoPage() {
	return (
    <PageBoundary>
    <div className="grid gap-8 w-full">
      <MileageGuide />
    </div>
  </PageBoundary>
  )
}
