import { Outlet } from "react-router";

export default function InitGuard() {
	//로그인이 완료된 사용자는 진입 할 수 없음.
	//TODO: 의도한대로 동작하지 않음
	// const { getStudent } = useStudentStore((state) => state.actions);
	// if (getStudent().student_id !== "") {
	//   return <Navigate to={"/"} />;
	// }
	return <Outlet />;
}
