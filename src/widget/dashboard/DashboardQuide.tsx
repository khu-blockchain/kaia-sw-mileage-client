import {
  Table,
  TableBody,
  TableBorderCell,
  TableBorderHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

const DashboardQuide = () => {
  const benefits = [
    "마일리지 제도는 학생들의 비교과 활동을 점수로 평가하여 장학금을 지급하는 제도입니다.",
    "매년 마일리지 점수에 따른 혜택 제공",
    "해외인턴십 및 해외교육 등 프로그램에 우선 선발 장학금/인센티브 제공",
  ];
  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">마일리지 제도</p>
        <ul className="list-disc ml-4">
          {benefits.map((benefit) => (
            <li key={benefit}>
              <p className="text-body">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
      <Scholarship />
      <Score />
    </div>
  );
};

const Scholarship = () => {
  const scholarships = [
    {
      rate: "1등급",
      criteria: "마일리지 취득 상위 10%",
      amount: "100만원",
      note: "",
    },
    {
      rate: "2등급",
      criteria: "마일리지 취득 상위 30%",
      amount: "70만원",
      note: "",
    },
    {
      rate: "3등급",
      criteria: "마일리지 취득 상위 50%",
      amount: "50만원",
      note: "",
    },
    {
      rate: "4등급",
      criteria: "마일리지 취득 상위 70%",
      amount: "30만원",
      note: "",
    },
    {
      rate: "5등급",
      criteria: "마일리지 100점 이상 취득자 전원 ",
      amount: "20만원",
      note: "상위등급과 중복 배제",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">
        마일리지 취득 배점에 따라 등급별 장학금 지급
      </p>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200">
            <TableBorderHead className="w-[100px] text-center">
              구분
            </TableBorderHead>
            <TableBorderHead className="text-center">지급기준</TableBorderHead>
            <TableBorderHead className="text-center">장학금</TableBorderHead>
            <TableBorderHead className="text-center">비고</TableBorderHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scholarships.map((scholarship) => (
            <TableRow key={scholarship.rate}>
              <TableBorderCell className="font-medium text-center">
                {scholarship.rate}
              </TableBorderCell>
              <TableBorderCell className="text-center">
                {scholarship.criteria}
              </TableBorderCell>
              <TableBorderCell className="text-center">
                {scholarship.amount}
              </TableBorderCell>
              <TableBorderCell className="text-center">
                {scholarship.note}
              </TableBorderCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Score = () => {
  const scoreNote = [
    "사업단에서 운영한 프로그램에서 입상하여 상금을 수상한 학생들에게는 마일리지 점수를 부여하지 않는다.",
    "사업단에서 운영한 프로그램이 아니더라도, 같은 내용으로 타 행사에 참여하여 수상한 경우 마일리지 점수를 부여하지 않는다.",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <p className="text-lg font-bold">SW 마일리지 배점표</p>
        <ul className="list-disc">
          {scoreNote.map((note) => (
            <li className="ml-4">
              <p className="text-body">{note}</p>
            </li>
          ))}
        </ul>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200">
            <TableBorderHead className="w-[160px] text-center">
              분야
            </TableBorderHead>
            <TableBorderHead colSpan={2} className="text-center">
              비교과 활동
            </TableBorderHead>
            <TableBorderHead className="w-[160px] text-center">
              배점
            </TableBorderHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableBorderCell className="text-center" rowSpan={13}>
              학술 분야
            </TableBorderCell>
            <TableBorderCell
              rowSpan={2}
              className="w-[400px] whitespace-pre-wrap text-center"
            >
              {`국내 학술회의 논문 발표\n(사사문구 필요)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">
              주저자 (100%)
            </TableBorderCell>
            <TableBorderCell className="text-center">50</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              공동저자 (50%)
            </TableBorderCell>
            <TableBorderCell className="text-center">25</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell
              rowSpan={2}
              className="w-[400px] whitespace-pre-wrap text-center"
            >
              {`내 학술지 논문 게재\n(사사문구 필요)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">
              주저자 (100%)
            </TableBorderCell>
            <TableBorderCell className="text-center">100</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              공동저자 (70%)
            </TableBorderCell>
            <TableBorderCell className="text-center">70</TableBorderCell>
          </TableRow>

          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              오픈소스 코드기여 (기여도에 다른 차등지급)
            </TableBorderCell>
            <TableBorderCell className="text-center">최대 200</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              교내 경진대회 및 공모전 수상 (운영위원회)
            </TableBorderCell>
            <TableBorderCell className="text-center">최대 100</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              교외 경진대회 및 공모전 수상 (운영위원회)
            </TableBorderCell>
            <TableBorderCell className="text-center">최대 200</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              교내 행사 기획 및 운영
            </TableBorderCell>
            <TableBorderCell className="text-center">최대 100</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              국내 특허 출원 (사사문구 필요)
            </TableBorderCell>
            <TableBorderCell className="text-center">150</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell
              className="text-center whitespace-pre-wrap"
              rowSpan={4}
            >
              {`SW중심대학 사업단\n진행행사 참여`}
            </TableBorderCell>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`SW페스티벌, Khuthon, Starup Dream2.0,\n학생회 주관 공모 행사 참여 (수상자 제외)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">20</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`IITP 교육만족도 설문 및\n전공/기초/융합 교육 만족도 설문조사 등 참가`}
            </TableBorderCell>
            <TableBorderCell className="text-center">20</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`IITP 행사 참가\n(SW인재 페스티벌, 공동 해커톤, AI경진대회 등)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">50</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`IITP, 협의회 및 타대학과의\n공동추진 행사 참관(1건당)\n(사업단에서 사전홍보된 행사에 한함)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">50</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" rowSpan={6}>
              국제분야
            </TableBorderCell>
            <TableBorderCell
              rowSpan={2}
              className="text-center whitespace-pre-wrap"
            >
              {`국외 학술회의 논문 발표\n(사사문구 필요)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">
              주저자 (100%)
            </TableBorderCell>
            <TableBorderCell className="text-center">100</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              공동저자 (70%)
            </TableBorderCell>
            <TableBorderCell className="text-center">70</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell
              rowSpan={2}
              className="text-center whitespace-pre-wrap"
            >
              {`국외 학술지 논문 게재\n(사사문구 필요)`}
            </TableBorderCell>
            <TableBorderCell className="text-center">
              주저자 (100%)
            </TableBorderCell>
            <TableBorderCell className="text-center">250</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              공동저자 (70%)
            </TableBorderCell>
            <TableBorderCell className="text-center">175</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell rowSpan={2} className="text-center">
              영어 봉사활동 실적
            </TableBorderCell>
            <TableBorderCell className="text-center">
              해외 IT 봉사단 등
            </TableBorderCell>
            <TableBorderCell className="text-center">100</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              국내 봉사활동 등
            </TableBorderCell>
            <TableBorderCell className="text-center">50</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" rowSpan={3}>
              창업분야
            </TableBorderCell>
            <TableBorderCell className="text-center" colSpan={2}>
              전공 관련 창업 (사업자등록증 제출)
            </TableBorderCell>
            <TableBorderCell className="text-center">250</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" colSpan={2}>
              창업 공모전 수상
            </TableBorderCell>
            <TableBorderCell className="text-center">150</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell
              className="text-center whitespace-pre-wrap"
              colSpan={2}
            >
              {`앱스토어 소프트웨어 등록\n(단위점수:1점)`}
            </TableBorderCell>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`다운로드 수\n*단위점수\n(최대 250)`}
            </TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" rowSpan={4}>
              봉사분야
            </TableBorderCell>
            <TableBorderCell className="text-center" rowSpan={3}>
              SW 아너십
            </TableBorderCell>
            <TableBorderCell className="text-center">
              강의(1회차 1시간 이상)
            </TableBorderCell>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`50\n(2회차부터는 10)`}
            </TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              멘토보고서 (건당)
            </TableBorderCell>
            <TableBorderCell className="text-center">15</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              그 외 활동 (건당)
            </TableBorderCell>
            <TableBorderCell className="text-center">10</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">
              SW 나눔봉사단
            </TableBorderCell>
            <TableBorderCell className="text-center">학기당</TableBorderCell>
            <TableBorderCell className="text-center">10</TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center" rowSpan={2}>
              기타활동
            </TableBorderCell>
            <TableBorderCell className="text-center" rowSpan={2}>
              사업단장 인정 기타활동
            </TableBorderCell>
            <TableBorderCell className="text-center whitespace-pre-wrap">
              {`사업단 주관 프로그램 참가\n(특별 프로그램에 한함)`}
            </TableBorderCell>
            <TableBorderCell className="text-center" rowSpan={2}>
              별도 책정
            </TableBorderCell>
          </TableRow>
          <TableRow>
            <TableBorderCell className="text-center">기타</TableBorderCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardQuide;
