import dayjs from "dayjs";

const getToday = () => dayjs();
const parseToFormattedDate = (date: string) => dayjs(date).format('YYYY년 MM월 DD일');
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export {
  getToday,
  parseToFormattedDate,
  wait
}
