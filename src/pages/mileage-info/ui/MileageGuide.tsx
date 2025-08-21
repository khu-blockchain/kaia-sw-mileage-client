export default function MileageGuide() {
	const benefits = [
		"학생들의 비교과 활동을 점수로 평가하여 장학금을 지급하는 제도입니다.",
		"매년 마일리지 점수에 따른 혜택을 제공합니다.",
		"해외인턴십 및 해외교육 등 프로그램에 우선 선발 장학금/인센티브를 제공합니다.",
	];

	const mileageGuideContent = `
		<div class="grid gap-8">
			<!-- 장학금 테이블 -->
			<div class="flex flex-col gap-4">
				<p class="text-lg font-semibold">마일리지 취득 배점에 따라 등급별 장학금 지급</p>
				<div>
					<table class="w-full border-collapse">
						<thead>
							<tr class="bg-gray-100">
								<th class="w-[100px] text-center border border-gray-300 px-4 py-2">구분</th>
								<th class="text-center border border-gray-300 px-4 py-2">지급기준</th>
								<th class="text-center border border-gray-300 px-4 py-2">장학금</th>
								<th class="text-center border border-gray-300 px-4 py-2">비고</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-medium text-center border border-gray-300 px-4 py-2">1등급</td>
								<td class="text-center border border-gray-300 px-4 py-2">마일리지 취득 상위 10%</td>
								<td class="text-center border border-gray-300 px-4 py-2">100만원</td>
								<td class="text-center border border-gray-300 px-4 py-2"></td>
							</tr>
							<tr>
								<td class="font-medium text-center border border-gray-300 px-4 py-2">2등급</td>
								<td class="text-center border border-gray-300 px-4 py-2">마일리지 취득 상위 30%</td>
								<td class="text-center border border-gray-300 px-4 py-2">70만원</td>
								<td class="text-center border border-gray-300 px-4 py-2"></td>
							</tr>
							<tr>
								<td class="font-medium text-center border border-gray-300 px-4 py-2">3등급</td>
								<td class="text-center border border-gray-300 px-4 py-2">마일리지 취득 상위 50%</td>
								<td class="text-center border border-gray-300 px-4 py-2">50만원</td>
								<td class="text-center border border-gray-300 px-4 py-2"></td>
							</tr>
							<tr>
								<td class="font-medium text-center border border-gray-300 px-4 py-2">4등급</td>
								<td class="text-center border border-gray-300 px-4 py-2">마일리지 취득 상위 70%</td>
								<td class="text-center border border-gray-300 px-4 py-2">30만원</td>
								<td class="text-center border border-gray-300 px-4 py-2"></td>
							</tr>
							<tr>
								<td class="font-medium text-center border border-gray-300 px-4 py-2">5등급</td>
								<td class="text-center border border-gray-300 px-4 py-2">마일리지 100점 이상 취득자 전원</td>
								<td class="text-center border border-gray-300 px-4 py-2">20만원</td>
								<td class="text-center border border-gray-300 px-4 py-2">상위등급과 중복 배제</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- 배점표 -->
			<div class="flex flex-col gap-4">
				<div class="grid gap-2">
					<p class="text-lg font-semibold">SW 마일리지 배점표</p>
					<ul class="list-disc">
						<li class="ml-4">
							<p class="text-body">사업단에서 운영한 프로그램에서 입상하여 상금을 수상한 학생들에게는 마일리지 점수를 부여하지 않습니다.</p>
						</li>
						<li class="ml-4">
							<p class="text-body">사업단에서 운영한 프로그램이 아니더라도, 같은 내용으로 타 행사에 참여하여 수상한 경우 마일리지 점수를 부여하지 않습니다.</p>
						</li>
					</ul>
				</div>
				<div>
					<table class="w-full border-collapse">
						<thead>
							<tr class="bg-gray-100">
								<th class="w-[160px] text-center border border-gray-300 px-4 py-2">분야</th>
								<th colspan="2" class="text-center border border-gray-300 px-4 py-2">비교과 활동</th>
								<th class="w-[160px] text-center border border-gray-300 px-4 py-2">배점</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="4">학술분야</td>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">오픈소스 코드기여 (기여도에 다른 차등지급)</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 10<br/>(최대 100)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">교내 경진대회 및 공모전 수상<br/>(사내회 또는 장관상)</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 50<br/>(최대 200)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">교외 행사기획 및 운영 (양식에 역할 명시)</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 20<br/>(최대 100)</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">SW중심대학 사업단<br/>진행행사 참여</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">IITP, 협의회 및 타대학과의 공동추진<br/>행사 참관 (1건당)<br/>(사업단에서 사전 홍보된 행사에 한함)</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 20<br/>(최대 100)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">창업분야</td>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">전공 관련 창업 (사업자등록증 제출)</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 100<br/>(최대 400)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">창업 공모전 수상</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 40<br/>(최대 100)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">앱스토어 소프트웨어 등록<br/>(증빙자료에 링 명단 및 역할 필요)</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">클릭당 1건<br/>(최대 200/<br/>타입수수 동일 분배)</td>
							</tr>
              
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">인턴십</td>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">자율현장실습</td>
								<td class="text-center border border-gray-300 px-4 py-2">100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">ICPC현장실습</td>
								<td class="text-center border border-gray-300 px-4 py-2">200</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">취업연계 인턴십</td>
								<td class="text-center border border-gray-300 px-4 py-2">200</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">기타활동</td>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">사업단장 인정 기타활동</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">사업단 주관 프로그램 참가<br/>(특별 프로그램에 한함)</td>
								<td class="text-center border border-gray-300 px-4 py-2">별도 책정</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">기타</td>
								<td class="text-center border border-gray-300 px-4 py-2">별도 책정</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">비전공자를 위한 신문고 활용</td>
								<td class="text-center border border-gray-300 px-4 py-2">1건당 10<br/>(최대 100)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	`;

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
			<div dangerouslySetInnerHTML={{ __html: mileageGuideContent }} />
		</div>
	);
}
