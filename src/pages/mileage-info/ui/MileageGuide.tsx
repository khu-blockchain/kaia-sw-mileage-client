export default function MileageGuide() {
	const benefits = [
		"학생들의 비교과 활동을 점수로 평가하여 장학금을 지급하는 제도입니다.",
		"매년 마일리지 점수에 따른 혜택을 제공합니다.",
		"해외인턴십 및 해외교육 등 프로그램에 우선 선발 장학금/인센티브를 제공합니다.",
	];
	return (
		<div className="grid gap-8">
			<div className="flex flex-col gap-4">
				<p className="text-2xl font-semibold">SW 마일리지 제도란?</p>
				<ul className="list-disc ml-4">
					{benefits.map((benefit) => (
						<li key={benefit}>
							<p className="text-body">{benefit}</p>
						</li>
					))}
				</ul>
			</div>
			<iframe
				src="/src/pages/mileage-info/ui/mileage-guide.html"
				className="w-full border-0"
				style={{ height: "2000px" }}
				title="마일리지 가이드"
			/>
		</div>
	);
}
