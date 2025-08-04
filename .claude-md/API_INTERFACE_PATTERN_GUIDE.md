# API Interface 패턴 적용 가이드

## 개요

API Interface 패턴을 현재 프로젝트에 적용하여 타입 안정성과 코드 품질을 향상시키는 방법을 제시합니다.

## API Interface 패턴의 장점

1. **명확한 API 계약**: Interface로 API 스펙 명시
2. **타입 안정성**: DTO를 통한 데이터 구조 보장
3. **테스트 용이성**: Mock 구현이 쉬움
4. **의존성 주입**: 구현체 교체 가능
5. **팀 협업**: API 스펙 우선 개발 가능

## 적용 구조

### 1. Entities API Interface 구조

```
src/entities/{entity}/
├── api/
│   ├── dtos/
│   │   ├── index.ts           # DTO 타입 정의
│   │   └── {entity}.dto.ts    # Entity별 DTO
│   ├── interface.ts           # API Interface 정의
│   ├── implementation.ts      # API 구현체
│   ├── {entity}.queries.ts    # Query Factory
│   └── index.ts               # Public API
├── model/
└── index.ts
```

## 구체적인 적용 예시

### 1. Student Entity API

#### entities/student/api/dtos/index.ts

```typescript
// 공통 타입
export type StudentID = string;

// 생성 관련 DTO
export interface CreateStudentDTO {
	id: string;
	name: string;
	email: string;
	password: string;
	department: string;
	phoneNumber?: string;
}

// 조회 관련 DTO
export interface StudentDTO {
	id: StudentID;
	name: string;
	email: string;
	department: string;
	phoneNumber?: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
}

export interface StudentsDTO {
	students: StudentDTO[];
	total: number;
	page: number;
	limit: number;
}

// 수정 관련 DTO
export interface UpdateStudentDTO {
	name?: string;
	email?: string;
	department?: string;
	phoneNumber?: string;
}

// 필터링 DTO
export interface StudentFilterDTO {
	department?: string;
	isActive?: boolean;
	search?: string;
	page?: number;
	limit?: number;
}
```

#### entities/student/api/interface.ts

```typescript
import {
	CreateStudentDTO,
	StudentDTO,
	StudentFilterDTO,
	StudentID,
	StudentsDTO,
	UpdateStudentDTO,
} from "./dtos";

export interface StudentAPI {
	// 조회
	getStudents(filters?: StudentFilterDTO): Promise<StudentsDTO>;
	getStudent(id: StudentID): Promise<StudentDTO>;

	// 생성
	createStudent(student: CreateStudentDTO): Promise<StudentDTO>;

	// 수정
	updateStudent(id: StudentID, updates: UpdateStudentDTO): Promise<StudentDTO>;

	// 삭제
	deleteStudent(id: StudentID): Promise<void>;

	// 검증
	checkStudentExists(id: StudentID): Promise<boolean>;
	validateEmail(email: string): Promise<boolean>;
}
```

#### entities/student/api/implementation.ts

```typescript
import { StudentServer } from "@/shared/api";

import {
	CreateStudentDTO,
	StudentDTO,
	StudentFilterDTO,
	StudentID,
	StudentsDTO,
	UpdateStudentDTO,
} from "./dtos";
import { StudentAPI } from "./interface";

export class StudentAPIImpl implements StudentAPI {
	async getStudents(filters?: StudentFilterDTO): Promise<StudentsDTO> {
		try {
			const searchParams = new URLSearchParams();

			if (filters?.department)
				searchParams.set("department", filters.department);
			if (filters?.isActive !== undefined)
				searchParams.set("isActive", String(filters.isActive));
			if (filters?.search) searchParams.set("search", filters.search);
			if (filters?.page) searchParams.set("page", String(filters.page));
			if (filters?.limit) searchParams.set("limit", String(filters.limit));

			const queryString = searchParams.toString();
			const url = queryString ? `?${queryString}` : "";

			const result = await StudentServer.get(url).json<StudentsDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to fetch students: ${error}`);
		}
	}

	async getStudent(id: StudentID): Promise<StudentDTO> {
		try {
			const result = await StudentServer.get(id).json<StudentDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to fetch student ${id}: ${error}`);
		}
	}

	async createStudent(student: CreateStudentDTO): Promise<StudentDTO> {
		try {
			const result = await StudentServer.post("", {
				json: student,
			}).json<StudentDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to create student: ${error}`);
		}
	}

	async updateStudent(
		id: StudentID,
		updates: UpdateStudentDTO,
	): Promise<StudentDTO> {
		try {
			const result = await StudentServer.patch(id, {
				json: updates,
			}).json<StudentDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to update student ${id}: ${error}`);
		}
	}

	async deleteStudent(id: StudentID): Promise<void> {
		try {
			await StudentServer.delete(id);
		} catch (error) {
			throw new Error(`Failed to delete student ${id}: ${error}`);
		}
	}

	async checkStudentExists(id: StudentID): Promise<boolean> {
		try {
			await this.getStudent(id);
			return true;
		} catch {
			return false;
		}
	}

	async validateEmail(email: string): Promise<boolean> {
		try {
			const result = await StudentServer.get(
				`validate-email?email=${encodeURIComponent(email)}`,
			).json<{ isValid: boolean }>();
			return result.isValid;
		} catch {
			return false;
		}
	}
}

// 싱글톤 인스턴스
export const studentAPI = new StudentAPIImpl();
```

#### entities/student/api/student.queries.ts

```typescript
import { queryOptions } from "@tanstack/react-query";

import { StudentFilterDTO, StudentID } from "./dtos";
import { studentAPI } from "./implementation";

export const studentQueries = {
	all: () => ["students"] as const,

	lists: () => [...studentQueries.all(), "list"] as const,
	list: (filters?: StudentFilterDTO) =>
		queryOptions({
			queryKey: [...studentQueries.lists(), filters],
			queryFn: () => studentAPI.getStudents(filters),
			staleTime: 5 * 60 * 1000, // 5분
		}),

	details: () => [...studentQueries.all(), "detail"] as const,
	detail: (id: StudentID) =>
		queryOptions({
			queryKey: [...studentQueries.details(), id],
			queryFn: () => studentAPI.getStudent(id),
			staleTime: 5 * 60 * 1000, // 5분
			enabled: !!id,
		}),

	validation: () => [...studentQueries.all(), "validation"] as const,
	emailValidation: (email: string) =>
		queryOptions({
			queryKey: [...studentQueries.validation(), "email", email],
			queryFn: () => studentAPI.validateEmail(email),
			enabled: !!email && email.includes("@"),
			staleTime: 30 * 1000, // 30초
		}),
};
```

### 2. Auth Entity API

#### entities/auth/api/dtos/index.ts

```typescript
export interface SignInDTO {
	id: string;
	password: string;
}

export interface SignInResponseDTO {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

export interface RefreshTokenDTO {
	refreshToken: string;
}

export interface RefreshTokenResponseDTO {
	accessToken: string;
	refreshToken: string;
}

export interface SignOutDTO {
	refreshToken: string;
}
```

#### entities/auth/api/interface.ts

```typescript
import {
	RefreshTokenDTO,
	RefreshTokenResponseDTO,
	SignInDTO,
	SignInResponseDTO,
	SignOutDTO,
} from "./dtos";

export interface AuthAPI {
	signIn(credentials: SignInDTO): Promise<SignInResponseDTO>;
	signOut(data: SignOutDTO): Promise<void>;
	refreshToken(data: RefreshTokenDTO): Promise<RefreshTokenResponseDTO>;
	verifyToken(token: string): Promise<boolean>;
}
```

#### entities/auth/api/implementation.ts

```typescript
import { AuthServer } from "@/shared/api";

import {
	RefreshTokenDTO,
	RefreshTokenResponseDTO,
	SignInDTO,
	SignInResponseDTO,
	SignOutDTO,
} from "./dtos";
import { AuthAPI } from "./interface";

export class AuthAPIImpl implements AuthAPI {
	async signIn(credentials: SignInDTO): Promise<SignInResponseDTO> {
		try {
			const result = await AuthServer.post("login", {
				credentials: "include",
				json: credentials,
			}).json<SignInResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Sign in failed: ${error}`);
		}
	}

	async signOut(data: SignOutDTO): Promise<void> {
		try {
			await AuthServer.post("logout", {
				credentials: "include",
				json: data,
			});
		} catch (error) {
			throw new Error(`Sign out failed: ${error}`);
		}
	}

	async refreshToken(data: RefreshTokenDTO): Promise<RefreshTokenResponseDTO> {
		try {
			const result = await AuthServer.post("refresh-token", {
				credentials: "include",
				json: data,
			}).json<RefreshTokenResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Token refresh failed: ${error}`);
		}
	}

	async verifyToken(token: string): Promise<boolean> {
		try {
			await AuthServer.get("verify-token", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return true;
		} catch {
			return false;
		}
	}
}

export const authAPI = new AuthAPIImpl();
```

### 3. Features에서 API Interface 사용

#### features/auth/model/use-sign-in.ts

```typescript
import type { SignInDTO } from "@/entities/auth/api/dtos";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authAPI } from "@/entities/auth/api";
import { useSessionStore } from "@/entities/session";
import { studentQueries } from "@/entities/student/api";

export const useSignIn = () => {
	const queryClient = useQueryClient();
	const { setTokens, setUser } = useSessionStore();

	return useMutation({
		mutationFn: (credentials: SignInDTO) => authAPI.signIn(credentials),
		onSuccess: (data) => {
			// 토큰과 사용자 정보 저장
			setTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			});

			setUser(data.user);

			// 관련 쿼리 무효화
			queryClient.invalidateQueries({
				queryKey: studentQueries.all(),
			});
		},
		onError: (error) => {
			console.error("Sign in failed:", error);
		},
	});
};
```

#### features/student/model/use-student-form.ts

```typescript
import type {
	CreateStudentDTO,
	StudentID,
	UpdateStudentDTO,
} from "@/entities/student/api/dtos";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { studentAPI, studentQueries } from "@/entities/student/api";

export const useCreateStudent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (student: CreateStudentDTO) =>
			studentAPI.createStudent(student),
		onSuccess: (newStudent) => {
			// 목록 쿼리 무효화
			queryClient.invalidateQueries({
				queryKey: studentQueries.lists(),
			});

			// 새 학생 데이터를 캐시에 추가
			queryClient.setQueryData(
				studentQueries.detail(newStudent.id).queryKey,
				newStudent,
			);
		},
	});
};

export const useUpdateStudent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			updates,
		}: {
			id: StudentID;
			updates: UpdateStudentDTO;
		}) => studentAPI.updateStudent(id, updates),
		onSuccess: (updatedStudent) => {
			// 관련 쿼리들 업데이트
			queryClient.invalidateQueries({
				queryKey: studentQueries.lists(),
			});

			queryClient.setQueryData(
				studentQueries.detail(updatedStudent.id).queryKey,
				updatedStudent,
			);
		},
	});
};

// 이메일 유효성 검사 훅
export const useEmailValidation = (email: string) => {
	return useQuery(studentQueries.emailValidation(email));
};
```

### 4. 테스트용 Mock 구현

#### entities/student/api/**mocks**/implementation.ts

```typescript
import {
	CreateStudentDTO,
	StudentDTO,
	StudentFilterDTO,
	StudentID,
	StudentsDTO,
	UpdateStudentDTO,
} from "../dtos";
import { StudentAPI } from "../interface";

export class MockStudentAPI implements StudentAPI {
	private students: StudentDTO[] = [
		{
			id: "1",
			name: "홍길동",
			email: "hong@example.com",
			department: "컴퓨터공학과",
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
			isActive: true,
		},
	];

	async getStudents(filters?: StudentFilterDTO): Promise<StudentsDTO> {
		let filteredStudents = [...this.students];

		if (filters?.department) {
			filteredStudents = filteredStudents.filter(
				(s) => s.department === filters.department,
			);
		}

		if (filters?.search) {
			filteredStudents = filteredStudents.filter(
				(s) =>
					s.name.includes(filters.search!) || s.email.includes(filters.search!),
			);
		}

		return {
			students: filteredStudents,
			total: filteredStudents.length,
			page: filters?.page ?? 1,
			limit: filters?.limit ?? 10,
		};
	}

	async getStudent(id: StudentID): Promise<StudentDTO> {
		const student = this.students.find((s) => s.id === id);
		if (!student) {
			throw new Error(`Student ${id} not found`);
		}
		return student;
	}

	async createStudent(student: CreateStudentDTO): Promise<StudentDTO> {
		const newStudent: StudentDTO = {
			...student,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			isActive: true,
		};

		this.students.push(newStudent);
		return newStudent;
	}

	async updateStudent(
		id: StudentID,
		updates: UpdateStudentDTO,
	): Promise<StudentDTO> {
		const index = this.students.findIndex((s) => s.id === id);
		if (index === -1) {
			throw new Error(`Student ${id} not found`);
		}

		this.students[index] = {
			...this.students[index],
			...updates,
			updatedAt: new Date().toISOString(),
		};

		return this.students[index];
	}

	async deleteStudent(id: StudentID): Promise<void> {
		const index = this.students.findIndex((s) => s.id === id);
		if (index === -1) {
			throw new Error(`Student ${id} not found`);
		}

		this.students.splice(index, 1);
	}

	async checkStudentExists(id: StudentID): Promise<boolean> {
		return this.students.some((s) => s.id === id);
	}

	async validateEmail(email: string): Promise<boolean> {
		return !this.students.some((s) => s.email === email);
	}
}

export const mockStudentAPI = new MockStudentAPI();
```

## 설정 및 의존성 주입

### shared/api/providers.ts

```typescript
import { authAPI } from "@/entities/auth/api";
import { studentAPI } from "@/entities/student/api";
import { mockStudentAPI } from "@/entities/student/api/__mocks__/implementation";

// 환경에 따른 구현체 선택
export const getStudentAPI = () => {
	return process.env.NODE_ENV === "test" ? mockStudentAPI : studentAPI;
};

export const getAuthAPI = () => {
	return authAPI; // 필요시 mock 추가
};
```

## 마이그레이션 장점

1. **타입 안정성**: DTO로 데이터 구조 보장
2. **테스트 용이성**: Mock 구현이 간단함
3. **API 계약 명확화**: Interface로 스펙 정의
4. **의존성 역전**: 구현체 교체 가능
5. **개발 효율성**: API 스펙 우선 개발
6. **코드 품질**: 일관된 에러 핸들링과 타입 체크

## 주의사항

1. **점진적 적용**: 한 번에 모든 API를 변경하지 말고 entity별로 순차 적용
2. **타입 일관성**: DTO와 도메인 모델 간의 변환 로직 필요
3. **번들 크기**: Interface 레이어 추가로 인한 크기 증가 고려
4. **러닝 커브**: 팀원들의 패턴 이해도 확보 필요
