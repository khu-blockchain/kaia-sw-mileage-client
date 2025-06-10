import dayjs from "dayjs";

const getToday = () => dayjs();
const parseToFormattedDate = (date: string) => dayjs(date).format('YYYY년 MM월 DD일');
const parseToFormattedDateTime = (date: string) => dayjs(date).format('YYYY년 MM월 DD일 HH시 mm분');
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export {
  getToday,
  parseToFormattedDate,
  parseToFormattedDateTime,
  wait
}
