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
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="13">학술 분야</td>
								<td rowspan="2" class="w-[400px] whitespace-pre-wrap text-center border border-gray-300 px-4 py-2">국내 학술회의 논문 발표\n(사사문구 필요)</td>
								<td class="text-center border border-gray-300 px-4 py-2">주저자 (100%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">50</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">공동저자 (50%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">25</td>
							</tr>
							<tr>
								<td rowspan="2" class="w-[400px] whitespace-pre-wrap text-center border border-gray-300 px-4 py-2">국내 학술지 논문 게재\n(사사문구 필요)</td>
								<td class="text-center border border-gray-300 px-4 py-2">주저자 (100%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">공동저자 (70%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">70</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">오픈소스 코드기여 (기여도에 다른 차등지급)</td>
								<td class="text-center border border-gray-300 px-4 py-2">최대 200</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">교내 경진대회 및 공모전 수상 (운영위원회)</td>
								<td class="text-center border border-gray-300 px-4 py-2">최대 100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">교외 경진대회 및 공모전 수상 (운영위원회)</td>
								<td class="text-center border border-gray-300 px-4 py-2">최대 200</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">교내 행사 기획 및 운영</td>
								<td class="text-center border border-gray-300 px-4 py-2">최대 100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">국내 특허 출원 (사사문구 필요)</td>
								<td class="text-center border border-gray-300 px-4 py-2">150</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2" rowspan="4">SW중심대학 사업단\n진행행사 참여</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">SW페스티벌, Khuthon, Starup Dream2.0,\n학생회 주관 공모 행사 참여 (수상자 제외)</td>
								<td class="text-center border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">IITP 교육만족도 설문 및\n전공/기초/융합 교육 만족도 설문조사 등 참가</td>
								<td class="text-center border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">IITP 행사 참가\n(SW인재 페스티벌, 공동 해커톤, AI경진대회 등)</td>
								<td class="text-center border border-gray-300 px-4 py-2">50</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">IITP, 협의회 및 타대학과의\n공동추진 행사 참관(1건당)\n(사업단에서 사전홍보된 행사에 한함)</td>
								<td class="text-center border border-gray-300 px-4 py-2">50</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="6">국제분야</td>
								<td rowspan="2" class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">국외 학술회의 논문 발표\n(사사문구 필요)</td>
								<td class="text-center border border-gray-300 px-4 py-2">주저자 (100%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">공동저자 (70%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">70</td>
							</tr>
							<tr>
								<td rowspan="2" class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">국외 학술지 논문 게재\n(사사문구 필요)</td>
								<td class="text-center border border-gray-300 px-4 py-2">주저자 (100%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">250</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">공동저자 (70%)</td>
								<td class="text-center border border-gray-300 px-4 py-2">175</td>
							</tr>
							<tr>
								<td rowspan="2" class="text-center border border-gray-300 px-4 py-2">영어 봉사활동 실적</td>
								<td class="text-center border border-gray-300 px-4 py-2">해외 IT 봉사단 등</td>
								<td class="text-center border border-gray-300 px-4 py-2">100</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">국내 봉사활동 등</td>
								<td class="text-center border border-gray-300 px-4 py-2">50</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">창업분야</td>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">전공 관련 창업 (사업자등록증 제출)</td>
								<td class="text-center border border-gray-300 px-4 py-2">250</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" colspan="2">창업 공모전 수상</td>
								<td class="text-center border border-gray-300 px-4 py-2">150</td>
							</tr>
							<tr>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2" colspan="2">앱스토어 소프트웨어 등록\n(단위점수:1점)</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">다운로드 수\n*단위점수\n(최대 250)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="4">봉사분야</td>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="3">SW 아너십</td>
								<td class="text-center border border-gray-300 px-4 py-2">강의(1회차 1시간 이상)</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">50\n(2회차부터는 10)</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">멘토보고서 (건당)</td>
								<td class="text-center border border-gray-300 px-4 py-2">15</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">그 외 활동 (건당)</td>
								<td class="text-center border border-gray-300 px-4 py-2">10</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">SW 나눔봉사단</td>
								<td class="text-center border border-gray-300 px-4 py-2">학기당</td>
								<td class="text-center border border-gray-300 px-4 py-2">10</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="2">기타활동</td>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="2">사업단장 인정 기타활동</td>
								<td class="text-center whitespace-pre-wrap border border-gray-300 px-4 py-2">사업단 주관 프로그램 참가\n(특별 프로그램에 한함)</td>
								<td class="text-center border border-gray-300 px-4 py-2" rowspan="2">별도 책정</td>
							</tr>
							<tr>
								<td class="text-center border border-gray-300 px-4 py-2">기타</td>
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
