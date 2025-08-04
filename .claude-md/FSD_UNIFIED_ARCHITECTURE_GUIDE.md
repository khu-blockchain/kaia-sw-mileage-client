# FSD 통합 아키텍처 가이드

## 개요

두 가이드(`FSD_FEATURES_MIGRATION_GUIDE.md`와 `ENTITIES_API_MIGRATION_GUIDE.md`)를 병합하여 **완전한 FSD 아키텍처**를 구현하는 통합 가이드입니다.

### 핵심 원칙

1. **Entities는 순수한 데이터 레이어, Features는 비즈니스 로직 조합 레이어**
2. **Features vs Pages 구분 기준: 재사용성**
   - **Features**: 여러 페이지에서 재사용되는 기능들 (예: 인증, 댓글 시스템, 검색)
   - **Pages**: 단일 페이지에서만 사용되는 기능들 (예: 특정 페이지 전용 폼, 페이지별 UI 블록)
3. **모든 것을 Feature로 만들 필요는 없음** - 재사용되지 않는 UI/로직은 Pages에 보관

## 통합 아키텍처 구조

### 1. 전체 레이어 구조

```
src/
├── app/                        # 애플리케이션 전역 설정
├── pages/                      # 페이지 컴포넌트
├── widgets/                    # 독립적인 대형 UI 블록
├── features/                   # 사용자 인터랙션 & 비즈니스 로직
├── entities/                   # 비즈니스 엔티티 & 순수 데이터
└── shared/                     # 공통 코드 & 인프라
```

### 2. 역할별 책임 분리

#### Entities Layer (데이터 레이어)

- **순수 API 함수들**: CRUD 연산
- **Query Factory**: TanStack Query 최적화
- **도메인 모델**: 비즈니스 엔티티 타입
- **기본 검증**: 엔티티 수준 검증

#### Features Layer (재사용 가능한 비즈니스 기능)

- **여러 페이지에서 재사용되는 기능**: 인증, 검색, 댓글 시스템 등
- **복합 비즈니스 로직**: 여러 엔티티 조합
- **UI 인터랙션**: 재사용 가능한 사용자 경험 컴포넌트
- **폼 검증**: 공통으로 사용되는 UI 레벨 검증
- **상태 관리**: Feature 특화 상태

#### Pages Layer (페이지별 특화 기능)

- **단일 페이지 전용 기능**: 재사용되지 않는 페이지별 로직
- **페이지 특화 UI**: 해당 페이지에서만 사용되는 UI 블록
- **페이지별 폼**: 특정 페이지에서만 사용되는 폼 로직
- **페이지 상태 관리**: 작은 규모의 페이지 내부 상태

## 구체적인 통합 구조

### 1. Auth 기능 완전 통합 구조 (Feature 중심)

#### 📋 Auth를 Features로 분류하는 이유

- **재사용성**: 로그인, 회원가입, 로그아웃은 여러 페이지에서 사용됨
  - 로그인 페이지, 헤더의 로그인 버튼, 모달 로그인 등
- **독립성**: 인증 로직은 다른 페이지 기능과 독립적으로 작동
- **비즈니스 가치**: 사용자에게 실질적인 비즈니스 가치를 제공하는 핵심 기능
- **복잡성**: 토큰 관리, 세션 처리, 검증 등 복합적인 로직을 포함

#### Entities Layer: 순수 사용자 도메인

```
entities/user/
├── api/
│   ├── dtos/
│   │   └── index.ts            # User API 계약 (DTO) 정의
│   ├── interface.ts            # User API Interface 정의
│   ├── implementation.ts       # User API 구현체
│   ├── user.queries.ts         # User Query Factory
│   └── index.ts                # User API Public API
├── model/
│   ├── types.ts                # User 도메인 모델
│   └── index.ts
└── index.ts
```

#### Features Layer: 완전한 인증 기능

```
features/auth/
├── api/
│   ├── dtos/
│   │   └── index.ts            # 인증 API 계약 (DTO) 정의
│   ├── interface.ts            # Auth API Interface 정의
│   ├── implementation.ts       # Auth API 구현체
│   ├── auth.queries.ts         # Auth Query Factory
│   └── index.ts                # Auth API Public API
├── model/
│   ├── store.ts                # 인증 상태 관리
│   ├── queries.ts              # 인증 비즈니스 로직 훅
│   ├── validation.ts           # UI 폼 검증
│   ├── types.ts                # 인증 도메인 타입
│   └── index.ts
├── ui/
│   ├── sign-in-form.tsx        # 로그인 폼
│   ├── sign-up-form.tsx        # 회원가입 폼
│   ├── auth-guard.tsx          # 인증 가드
│   └── index.ts
├── lib/
│   ├── token-utils.ts          # 토큰 관련 유틸리티
│   ├── session-utils.ts        # 세션 관련 유틸리티
│   └── index.ts
└── index.ts
```

### 2. 구체적인 구현 예시

#### entities/user/api/dtos/index.ts

```typescript
// User API 계약 정의 (백엔드와의 계약)
export interface GetUserDTO {
	id: string;
}

export interface GetUserResponseDTO {
	id: string;
	name: string;
	email: string;
	role: string;
	department?: string;
	phoneNumber?: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
}

export interface GetUsersDTO {
	page?: number;
	limit?: number;
	search?: string;
	role?: string;
	department?: string;
}

export interface GetUsersResponseDTO {
	users: GetUserResponseDTO[];
	total: number;
	page: number;
	totalPages: number;
}

export interface UpdateUserDTO {
	id: string;
	name?: string;
	email?: string;
	department?: string;
	phoneNumber?: string;
}

export interface UpdateUserResponseDTO extends GetUserResponseDTO {}
```

#### entities/user/api/interface.ts

```typescript
import {
	GetUserDTO,
	GetUserResponseDTO,
	GetUsersDTO,
	GetUsersResponseDTO,
	UpdateUserDTO,
	UpdateUserResponseDTO,
} from "./dtos";

export interface UserAPI {
	// 사용자 조회
	getUser(params: GetUserDTO): Promise<GetUserResponseDTO>;
	getUsers(params?: GetUsersDTO): Promise<GetUsersResponseDTO>;

	// 사용자 수정
	updateUser(params: UpdateUserDTO): Promise<UpdateUserResponseDTO>;

	// 사용자 검증
	checkUserExists(id: string): Promise<boolean>;
}
```

#### entities/user/api/implementation.ts

```typescript
import { UserServer } from "@/shared/api";

import {
	GetUserDTO,
	GetUserResponseDTO,
	GetUsersDTO,
	GetUsersResponseDTO,
	UpdateUserDTO,
	UpdateUserResponseDTO,
} from "./dtos";
import { UserAPI } from "./interface";

export class UserAPIImpl implements UserAPI {
	async getUser(params: GetUserDTO): Promise<GetUserResponseDTO> {
		try {
			const result = await UserServer.get(
				`users/${params.id}`,
			).json<GetUserResponseDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to get user: ${error}`);
		}
	}

	async getUsers(params: GetUsersDTO = {}): Promise<GetUsersResponseDTO> {
		try {
			const searchParams = new URLSearchParams();

			if (params.page) searchParams.set("page", params.page.toString());
			if (params.limit) searchParams.set("limit", params.limit.toString());
			if (params.search) searchParams.set("search", params.search);
			if (params.role) searchParams.set("role", params.role);
			if (params.department) searchParams.set("department", params.department);

			const result = await UserServer.get(
				`users?${searchParams.toString()}`,
			).json<GetUsersResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Failed to get users: ${error}`);
		}
	}

	async updateUser(params: UpdateUserDTO): Promise<UpdateUserResponseDTO> {
		try {
			const { id, ...updateData } = params;
			const result = await UserServer.put(`users/${id}`, {
				json: updateData,
			}).json<UpdateUserResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Failed to update user: ${error}`);
		}
	}

	async checkUserExists(id: string): Promise<boolean> {
		try {
			await UserServer.head(`users/${id}`);
			return true;
		} catch {
			return false;
		}
	}
}

// 싱글톤 인스턴스
export const userAPI = new UserAPIImpl();
```

#### entities/user/api/user.queries.ts

```typescript
import type { GetUsersDTO } from "./dtos";

import { queryOptions } from "@tanstack/react-query";

import { userAPI } from "./implementation";

export const userQueries = {
	all: () => ["users"] as const,

	lists: () => [...userQueries.all(), "list"] as const,
	list: (filters?: GetUsersDTO) =>
		queryOptions({
			queryKey: [...userQueries.lists(), filters],
			queryFn: () => userAPI.getUsers(filters),
			staleTime: 5 * 60 * 1000,
		}),

	details: () => [...userQueries.all(), "detail"] as const,
	detail: (id: string) =>
		queryOptions({
			queryKey: [...userQueries.details(), id],
			queryFn: () => userAPI.getUser({ id }),
			staleTime: 5 * 60 * 1000,
			enabled: !!id,
		}),

	profile: (id?: string) =>
		queryOptions({
			queryKey: [...userQueries.details(), "profile", id],
			queryFn: () => userAPI.getUser({ id: id! }),
			staleTime: 2 * 60 * 1000,
			enabled: !!id,
		}),
};
```

#### entities/user/api/index.ts

```typescript
// Public API
export { userAPI } from "./implementation";
export { userQueries } from "./user.queries";
export type { UserAPI } from "./interface";
export type {
	GetUserDTO,
	GetUserResponseDTO,
	GetUsersDTO,
	GetUsersResponseDTO,
	UpdateUserDTO,
	UpdateUserResponseDTO,
} from "./dtos";
```

#### entities/user/model/types.ts

```typescript
// 순수한 사용자 도메인 모델
export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	department?: string;
	phoneNumber?: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
}

export enum UserRole {
	STUDENT = "student",
	ADMIN = "admin",
	PROFESSOR = "professor",
}

export interface UserProfile extends User {
	profileImage?: string;
	bio?: string;
	skills?: string[];
	interests?: string[];
}
```

#### features/auth/api/dtos/index.ts

```typescript
// API 계약 정의 (백엔드와의 계약)
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

export interface CreateUserDTO {
	id: string;
	name: string;
	email: string;
	password: string;
	department: string;
}

export interface CreateUserResponseDTO {
	id: string;
	name: string;
	email: string;
	department: string;
	createdAt: string;
}
```

#### features/auth/api/interface.ts

```typescript
import {
	CreateUserDTO,
	CreateUserResponseDTO,
	RefreshTokenDTO,
	RefreshTokenResponseDTO,
	SignInDTO,
	SignInResponseDTO,
} from "./dtos";

export interface AuthAPI {
	// 인증
	signIn(credentials: SignInDTO): Promise<SignInResponseDTO>;
	signOut(refreshToken: string): Promise<void>;
	refreshToken(data: RefreshTokenDTO): Promise<RefreshTokenResponseDTO>;

	// 사용자 생성 (회원가입)
	createUser(userData: CreateUserDTO): Promise<CreateUserResponseDTO>;

	// 검증
	verifyToken(token: string): Promise<boolean>;
	checkEmailExists(email: string): Promise<boolean>;
	checkIdExists(id: string): Promise<boolean>;
}
```

#### features/auth/api/implementation.ts

```typescript
import { AuthServer } from "@/shared/api";

import {
	CreateUserDTO,
	CreateUserResponseDTO,
	RefreshTokenDTO,
	RefreshTokenResponseDTO,
	SignInDTO,
	SignInResponseDTO,
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

	async signOut(refreshToken: string): Promise<void> {
		try {
			await AuthServer.post("logout", {
				credentials: "include",
				json: { refreshToken },
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

	async createUser(userData: CreateUserDTO): Promise<CreateUserResponseDTO> {
		try {
			const result = await AuthServer.post("register", {
				json: userData,
			}).json<CreateUserResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`User creation failed: ${error}`);
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

	async checkEmailExists(email: string): Promise<boolean> {
		try {
			const result = await AuthServer.get(
				`check-email?email=${encodeURIComponent(email)}`,
			);
			return result.status === 200;
		} catch {
			return false;
		}
	}

	async checkIdExists(id: string): Promise<boolean> {
		try {
			const result = await AuthServer.get(
				`check-id?id=${encodeURIComponent(id)}`,
			);
			return result.status === 200;
		} catch {
			return false;
		}
	}
}

// 싱글톤 인스턴스
export const authAPI = new AuthAPIImpl();
```

#### features/auth/api/auth.queries.ts

```typescript
import { queryOptions } from "@tanstack/react-query";

import { authAPI } from "./implementation";

export const authQueries = {
	all: () => ["auth"] as const,

	// 토큰 검증
	tokenVerification: (token: string) =>
		queryOptions({
			queryKey: [...authQueries.all(), "verify", token],
			queryFn: () => authAPI.verifyToken(token),
			enabled: !!token,
			staleTime: 5 * 60 * 1000, // 5분
		}),

	// 이메일 중복 체크
	emailCheck: (email: string) =>
		queryOptions({
			queryKey: [...authQueries.all(), "check-email", email],
			queryFn: () => authAPI.checkEmailExists(email),
			enabled: !!email && email.includes("@"),
			staleTime: 30 * 1000, // 30초
		}),

	// 아이디 중복 체크
	idCheck: (id: string) =>
		queryOptions({
			queryKey: [...authQueries.all(), "check-id", id],
			queryFn: () => authAPI.checkIdExists(id),
			enabled: !!id && id.length >= 4,
			staleTime: 30 * 1000, // 30초
		}),
};
```

#### features/auth/model/types.ts

```typescript
import type { User } from "@/entities/user";

// 인증 관련 도메인 타입
export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresAt?: Date;
}

export interface AuthSession {
	user: User | null;
	tokens: AuthTokens | null;
	isAuthenticated: boolean;
}

// 인증 컨텍스트 타입
export interface AuthContext extends AuthSession {
	isLoading: boolean;
	error: string | null;
}

// 인증 폼 데이터 타입 (UI 레벨)
export interface SignInFormData {
	id: string;
	password: string;
	rememberMe?: boolean;
}

export interface SignUpFormData {
	id: string;
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	department: string;
	phoneNumber?: string;
	agreeToTerms: boolean;
	agreeToPrivacy: boolean;
}
```

#### features/auth/model/store.ts

```typescript
import type { User } from "@/entities/user";
import type { AuthSession, AuthTokens } from "./types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState extends AuthSession {
	isLoading: boolean;
}

interface AuthActions {
	setAuth: (session: Omit<AuthSession, "isAuthenticated">) => void;
	clearAuth: () => void;
	setLoading: (loading: boolean) => void;
	updateTokens: (tokens: AuthTokens) => void;
	updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set, get) => ({
			// State
			user: null,
			tokens: null,
			isAuthenticated: false,
			isLoading: false,

			// Actions
			setAuth: (session) =>
				set({
					user: session.user,
					tokens: session.tokens,
					isAuthenticated: true,
					isLoading: false,
				}),

			clearAuth: () =>
				set({
					user: null,
					tokens: null,
					isAuthenticated: false,
					isLoading: false,
				}),

			setLoading: (loading) => set({ isLoading: loading }),

			updateTokens: (tokens) => set({ tokens }),

			updateUser: (userData) => {
				const currentUser = get().user;
				if (currentUser) {
					set({ user: { ...currentUser, ...userData } });
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				tokens: state.tokens,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
```

#### features/auth/model/queries.ts

```typescript
import type { CreateUserDTO, SignInDTO } from "../api/dtos";
import type { SignInFormData } from "./types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/entities/user";

import { authAPI, authQueries } from "../api";
import { useAuthStore } from "./store";

// 로그인 비즈니스 로직
export const useSignIn = () => {
	const queryClient = useQueryClient();
	const { setAuth, clearAuth, setLoading } = useAuthStore();

	return useMutation({
		mutationFn: (credentials: SignInFormData) => {
			setLoading(true);
			return authAPI.signIn({
				id: credentials.id,
				password: credentials.password,
			});
		},
		onSuccess: (response) => {
			// 인증 세션 설정
			setAuth({
				user: {
					id: response.user.id,
					name: response.user.name,
					email: response.user.email,
					role: response.user.role as any,
					department: undefined, // API 응답에 따라 조정
					phoneNumber: undefined,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isActive: true,
				},
				tokens: {
					accessToken: response.accessToken,
					refreshToken: response.refreshToken,
				},
			});

			// 사용자 정보 미리 로딩
			queryClient.prefetchQuery(userQueries.profile(response.user.id));

			// 전역 쿼리 무효화
			queryClient.invalidateQueries({
				queryKey: ["user-data"],
			});
		},
		onError: (error) => {
			clearAuth();
			console.error("Sign in failed:", error);
		},
		onSettled: () => {
			setLoading(false);
		},
	});
};

// 회원가입 비즈니스 로직
export const useSignUp = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: CreateUserDTO) => authAPI.createUser(userData),
		onSuccess: (newUser) => {
			// 사용자 데이터 캐시 업데이트
			queryClient.setQueryData(userQueries.detail(newUser.id).queryKey, {
				...newUser,
				role: newUser.role || "student",
				phoneNumber: undefined,
				isActive: true,
			});

			// 사용자 목록 무효화
			queryClient.invalidateQueries({
				queryKey: userQueries.lists(),
			});
		},
	});
};

// 로그아웃 비즈니스 로직
export const useSignOut = () => {
	const queryClient = useQueryClient();
	const { clearAuth, tokens } = useAuthStore();

	return useMutation({
		mutationFn: () => {
			if (!tokens?.refreshToken) {
				throw new Error("No refresh token available");
			}
			return authAPI.signOut(tokens.refreshToken);
		},
		onSuccess: () => {
			clearAuth();
			queryClient.clear(); // 모든 쿼리 캐시 정리

			// 홈페이지로 리다이렉트 (필요시)
			window.location.href = "/";
		},
		onError: (error) => {
			// 서버 로그아웃 실패해도 로컬 상태는 정리
			console.error("Server sign out failed:", error);
			clearAuth();
			queryClient.clear();
		},
	});
};

// 토큰 갱신 비즈니스 로직
export const useTokenRefresh = () => {
	const { updateTokens, clearAuth, tokens } = useAuthStore();

	return useMutation({
		mutationFn: () => {
			if (!tokens?.refreshToken) {
				throw new Error("No refresh token available");
			}
			return authAPI.refreshToken({ refreshToken: tokens.refreshToken });
		},
		onSuccess: (response) => {
			updateTokens({
				accessToken: response.accessToken,
				refreshToken: response.refreshToken,
			});
		},
		onError: () => {
			// 토큰 갱신 실패 시 로그아웃
			clearAuth();
		},
	});
};

// 실시간 검증 훅들
export const useEmailValidation = (email: string) => {
	return useQuery({
		...authQueries.emailCheck(email),
		select: (exists) => ({
			isValid: !exists, // 중복되지 않으면 유효
			message: exists ? "이미 사용 중인 이메일입니다" : undefined,
		}),
	});
};

export const useIdValidation = (id: string) => {
	return useQuery({
		...authQueries.idCheck(id),
		select: (exists) => ({
			isValid: !exists, // 중복되지 않으면 유효
			message: exists ? "이미 사용 중인 아이디입니다" : undefined,
		}),
	});
};
```

#### features/auth/model/validation.ts

```typescript
import { z } from "zod";

// UI 폼 검증 스키마
export const signInFormSchema = z.object({
	id: z.string().min(1, "아이디를 입력해주세요"),
	password: z.string().min(1, "비밀번호를 입력해주세요"),
	rememberMe: z.boolean().optional(),
});

export const signUpFormSchema = z
	.object({
		id: z
			.string()
			.min(4, "아이디는 4자 이상이어야 합니다")
			.max(20, "아이디는 20자 이하여야 합니다")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"아이디는 영문, 숫자, 언더스코어만 사용 가능합니다",
			),

		name: z
			.string()
			.min(2, "이름은 2자 이상이어야 합니다")
			.max(10, "이름은 10자 이하여야 합니다")
			.regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글, 영문만 사용 가능합니다"),

		email: z
			.string()
			.email("올바른 이메일 형식이 아닙니다")
			.endsWith("@khu.ac.kr", "경희대학교 이메일만 사용 가능합니다"),

		password: z
			.string()
			.min(8, "비밀번호는 8자 이상이어야 합니다")
			.max(50, "비밀번호는 50자 이하여야 합니다")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
				"비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다",
			),

		confirmPassword: z.string(),

		department: z.string().min(1, "학과를 선택해주세요"),

		phoneNumber: z
			.string()
			.regex(
				/^010-\d{4}-\d{4}$/,
				"올바른 전화번호 형식이 아닙니다 (010-0000-0000)",
			)
			.optional()
			.or(z.literal("")),

		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: "이용약관에 동의해야 합니다",
		}),

		agreeToPrivacy: z.boolean().refine((val) => val === true, {
			message: "개인정보 처리방침에 동의해야 합니다",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["confirmPassword"],
	});

// 타입 추론 (types.ts에서 이미 정의했으므로 제거)
// export type SignInFormData = z.infer<typeof signInFormSchema>;
// export type SignUpFormData = z.infer<typeof signUpFormSchema>;

// 검증 헬퍼 함수들
export const validatePasswordStrength = (password: string) => {
	const checks = {
		length: password.length >= 8,
		lowercase: /[a-z]/.test(password),
		uppercase: /[A-Z]/.test(password),
		number: /\d/.test(password),
		special: /[@$!%*?&]/.test(password),
	};

	const score = Object.values(checks).filter(Boolean).length;

	return {
		score,
		strength: score < 3 ? "weak" : score < 5 ? "medium" : "strong",
		checks,
	};
};
```

#### features/auth/ui/sign-up-form.tsx

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp, useEmailValidation, useIdValidation } from "../model/queries";
import { signUpFormSchema, validatePasswordStrength } from "../model/validation";
import type { SignUpFormData } from "../model/types";
import { Button, Input, Select, Checkbox, PasswordStrengthMeter } from "@/shared/ui";
import { useDepartments } from "@/entities/academic";
import { useDebounce } from "@/shared/lib/hooks";

export const SignUpForm = () => {
  const { mutate: signUp, isPending, error } = useSignUp();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      phoneNumber: "",
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
    mode: "onChange", // 실시간 검증
  });

  // 실시간 검증을 위한 디바운스
  const debouncedEmail = useDebounce(form.watch("email"), 500);
  const debouncedId = useDebounce(form.watch("id"), 500);
  const currentPassword = form.watch("password");

  // 실시간 중복 검사
  const { data: emailValidation, isLoading: emailChecking } = useEmailValidation(debouncedEmail);
  const { data: idValidation, isLoading: idChecking } = useIdValidation(debouncedId);

  // 학과 목록 조회
  const { data: departments = [] } = useDepartments();

  // 비밀번호 강도 검사
  const passwordStrength = currentPassword ? validatePasswordStrength(currentPassword) : null;

  const onSubmit = (data: SignUpFormData) => {
    // DTO로 변환하여 전송
    signUp({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      department: data.department,
    });
  };

  const isFormValid = form.formState.isValid &&
    emailValidation?.isValid &&
    idValidation?.isValid;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* 아이디 */}
      <Input
        {...form.register("id")}
        placeholder="아이디 (4-20자, 영문/숫자/언더스코어)"
        error={form.formState.errors.id?.message || (!idValidation?.isValid ? idValidation?.message : undefined)}
        success={idValidation?.isValid ? "사용 가능한 아이디입니다" : undefined}
        loading={idChecking}
      />

      {/* 이름 */}
      <Input
        {...form.register("name")}
        placeholder="이름"
        error={form.formState.errors.name?.message}
      />

      {/* 이메일 */}
      <Input
        {...form.register("email")}
        type="email"
        placeholder="이메일 (@khu.ac.kr)"
        error={form.formState.errors.email?.message || (!emailValidation?.isValid ? emailValidation?.message : undefined)}
        success={emailValidation?.isValid ? "사용 가능한 이메일입니다" : undefined}
        loading={emailChecking}
      />

      {/* 비밀번호 */}
      <div className="space-y-2">
        <Input
          {...form.register("password")}
          type="password"
          placeholder="비밀번호 (8자 이상, 대소문자/숫자/특수문자 포함)"
          error={form.formState.errors.password?.message}
        />
        {passwordStrength && (
          <PasswordStrengthMeter
            strength={passwordStrength.strength}
            checks={passwordStrength.checks}
          />
        )}
      </div>

      {/* 비밀번호 확인 */}
      <Input
        {...form.register("confirmPassword")}
        type="password"
        placeholder="비밀번호 확인"
        error={form.formState.errors.confirmPassword?.message}
      />

      {/* 학과 */}
      <Select
        {...form.register("department")}
        placeholder="학과 선택"
        options={departments.map(dept => ({ value: dept.id, label: dept.name }))}
        error={form.formState.errors.department?.message}
      />

      {/* 전화번호 (선택) */}
      <Input
        {...form.register("phoneNumber")}
        placeholder="전화번호 (선택, 010-0000-0000)"
        error={form.formState.errors.phoneNumber?.message}
      />

      {/* 약관 동의 */}
      <div className="space-y-2">
        <Checkbox
          {...form.register("agreeToTerms")}
          label="이용약관에 동의합니다"
          error={form.formState.errors.agreeToTerms?.message}
        />
        <Checkbox
          {...form.register("agreeToPrivacy")}
          label="개인정보 처리방침에 동의합니다"
          error={form.formState.errors.agreeToPrivacy?.message}
        />
      </div>

      {/* 전역 에러 */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
          회원가입에 실패했습니다: {error.message}
        </div>
      )}

      {/* 제출 버튼 */}
      <Button
        type="submit"
        disabled={isPending || !isFormValid}
        loading={isPending}
        className="w-full"
      >
        {isPending ? "가입 처리 중..." : "회원가입"}
      </Button>

      {/* 진행 상태 표시 */}
      {isPending && (
        <div className="text-center text-sm text-gray-500">
          계정을 생성하고 있습니다. 잠시만 기다려주세요...
        </div>
      )}
    </form>
  );
};
```

## 주요 개선점

### 1. 명확한 책임 분리

- **Entities**: 순수 데이터 & API 계약
- **Features**: 비즈니스 로직 & UI 인터랙션

### 2. API Interface 패턴 적용

- 타입 안정성과 테스트 용이성 극대화
- Mock 구현을 통한 독립적 개발

### 3. 고급 폼 검증

- 실시간 서버 검증 (이메일/아이디 중복)
- 비밀번호 강도 표시
- 디바운스를 통한 성능 최적화

### 4. 상태 관리 최적화

- Zustand persist로 인증 상태 유지
- TanStack Query로 서버 상태 캐싱
- 적절한 쿼리 무효화 전략

### 5. UX 개선

- 로딩 상태 표시
- 실시간 피드백
- 명확한 에러 메시지
- 접근성 고려

## 다른 Feature 적용 예시

### Student Profile Feature (사용자 프로필 관리)

#### entities/student/api/dtos/index.ts

```typescript
// Student API 계약 정의
export interface GetStudentDTO {
	id: string;
}

export interface GetStudentsDTO {
	page?: number;
	limit?: number;
	search?: string;
	major?: string;
	year?: number;
}

export interface StudentResponseDTO {
	id: string;
	userId: string;
	studentId: string;
	major: string;
	year: number;
	gpa?: number;
	enrolledCourses: string[];
	createdAt: string;
	updatedAt: string;
}

export interface StudentsResponseDTO {
	students: StudentResponseDTO[];
	total: number;
	page: number;
	totalPages: number;
}

export interface AcademicRecordDTO {
	studentId: string;
	semester: string;
	courses: CourseRecordDTO[];
	gpa: number;
}

export interface CourseRecordDTO {
	courseId: string;
	courseName: string;
	credits: number;
	grade: string;
	points: number;
}

export interface UpdateAcademicInfoDTO {
	id: string;
	major?: string;
	year?: number;
}
```

#### entities/student/api/interface.ts

```typescript
import {
	AcademicRecordDTO,
	GetStudentDTO,
	GetStudentsDTO,
	StudentResponseDTO,
	StudentsResponseDTO,
	UpdateAcademicInfoDTO,
} from "./dtos";

export interface StudentAPI {
	// 학생 조회
	getStudents(params?: GetStudentsDTO): Promise<StudentsResponseDTO>;
	getStudent(params: GetStudentDTO): Promise<StudentResponseDTO>;

	// 학업 정보
	getAcademicRecord(id: string): Promise<AcademicRecordDTO>;
	updateAcademicInfo(
		params: UpdateAcademicInfoDTO,
	): Promise<StudentResponseDTO>;

	// 검증
	checkStudentExists(studentId: string): Promise<boolean>;
}
```

#### entities/student/api/implementation.ts

```typescript
import { StudentServer } from "@/shared/api";

import {
	AcademicRecordDTO,
	GetStudentDTO,
	GetStudentsDTO,
	StudentResponseDTO,
	StudentsResponseDTO,
	UpdateAcademicInfoDTO,
} from "./dtos";
import { StudentAPI } from "./interface";

export class StudentAPIImpl implements StudentAPI {
	async getStudents(params: GetStudentsDTO = {}): Promise<StudentsResponseDTO> {
		try {
			const searchParams = new URLSearchParams();

			if (params.page) searchParams.set("page", params.page.toString());
			if (params.limit) searchParams.set("limit", params.limit.toString());
			if (params.search) searchParams.set("search", params.search);
			if (params.major) searchParams.set("major", params.major);
			if (params.year) searchParams.set("year", params.year.toString());

			const result = await StudentServer.get(
				`students?${searchParams.toString()}`,
			).json<StudentsResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Failed to get students: ${error}`);
		}
	}

	async getStudent(params: GetStudentDTO): Promise<StudentResponseDTO> {
		try {
			const result = await StudentServer.get(
				`students/${params.id}`,
			).json<StudentResponseDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to get student: ${error}`);
		}
	}

	async getAcademicRecord(id: string): Promise<AcademicRecordDTO> {
		try {
			const result = await StudentServer.get(
				`students/${id}/academic-record`,
			).json<AcademicRecordDTO>();
			return result;
		} catch (error) {
			throw new Error(`Failed to get academic record: ${error}`);
		}
	}

	async updateAcademicInfo(
		params: UpdateAcademicInfoDTO,
	): Promise<StudentResponseDTO> {
		try {
			const { id, ...updateData } = params;
			const result = await StudentServer.put(`students/${id}/academic-info`, {
				json: updateData,
			}).json<StudentResponseDTO>();

			return result;
		} catch (error) {
			throw new Error(`Failed to update academic info: ${error}`);
		}
	}

	async checkStudentExists(studentId: string): Promise<boolean> {
		try {
			await StudentServer.head(`students/check/${studentId}`);
			return true;
		} catch {
			return false;
		}
	}
}

// 싱글톤 인스턴스
export const studentAPI = new StudentAPIImpl();
```

#### features/student-profile/api/interface.ts

```typescript
// 프로필 관리 특화 API
export interface ProfileAPI {
	updateProfile(id: string, data: UpdateProfileDTO): Promise<UserResponseDTO>;
	updateProfileImage(id: string, image: File): Promise<{ imageUrl: string }>;
	changePassword(id: string, data: ChangePasswordDTO): Promise<void>;
	deactivateAccount(id: string): Promise<void>;
}
```

#### features/student-profile/model/queries.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { studentQueries } from "@/entities/student";
import { userQueries } from "@/entities/user";

import { profileAPI } from "../api";

export const useUserProfile = (id: string) => {
	return useQuery(userQueries.profile(id));
};

export const useStudentAcademicRecord = (id: string) => {
	return useQuery(studentQueries.academicRecord(id));
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateProfileDTO }) =>
			profileAPI.updateProfile(id, data),
		onSuccess: (updatedUser) => {
			// 사용자 캐시 업데이트
			queryClient.setQueryData(
				userQueries.detail(updatedUser.id).queryKey,
				updatedUser,
			);

			// 프로필 캐시 업데이트
			queryClient.setQueryData(
				userQueries.profile(updatedUser.id).queryKey,
				updatedUser,
			);

			// 관련 목록 무효화
			queryClient.invalidateQueries({
				queryKey: userQueries.lists(),
			});
		},
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ChangePasswordDTO }) =>
			profileAPI.changePassword(id, data),
		onSuccess: () => {
			// 보안상 토큰 갱신이나 재로그인 유도
			window.alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
		},
	});
};
```

## 현재 프로젝트 기능 분류 가이드

### 📋 Features로 분류할 기능들 (재사용성 기준)

#### ✅ Features에 적합한 기능들

1. **Auth (인증)** - 로그인, 회원가입, 로그아웃
   - 재사용: 로그인 페이지, 헤더, 모달, 라우트 가드 등
2. **Document (문서 관리)** - 파일 업로드, 문서 검증
   - 재사용: 지원서 페이지, 마이페이지, 관리자 페이지 등
3. **Wallet Management (지갑 관리)** - 지갑 연결, 변경, 분실 처리
   - 재사용: 설정 페이지, 대시보드, 모달 등

4. **Student Profile (학생 프로필)** - 프로필 조회, 수정
   - 재사용: 대시보드, 설정 페이지, 관리자 페이지 등

#### ❌ Pages에 유지할 기능들 (단일 페이지 전용)

1. **Dashboard** - 메인 대시보드의 전용 위젯들
   - 사용: 대시보드 페이지에서만 사용되는 전용 UI
2. **History Detail** - SW 마일리지 상세 내역
   - 사용: 히스토리 상세 페이지에서만 사용
3. **Apply SW Mileage** - SW 마일리지 지원서 작성
   - 사용: 지원서 작성 페이지에서만 사용 (복잡하지만 재사용되지 않음)

4. **Rank Page** - 순위 조회 페이지
   - 사용: 순위 페이지에서만 사용되는 전용 로직

### 📋 판단 기준 체크리스트

기능을 Features vs Pages로 분류할 때 다음 질문들을 확인하세요:

1. **재사용성**
   - ✅ 이 기능이 2개 이상의 페이지에서 사용되나요?
   - ✅ 모달, 사이드바, 헤더 등 다양한 위치에서 사용되나요?

2. **독립성**
   - ✅ 이 기능이 특정 페이지와 관계없이 독립적으로 작동하나요?
   - ✅ 다른 페이지 기능에 의존하지 않나요?

3. **비즈니스 가치**
   - ✅ 사용자에게 명확한 비즈니스 가치를 제공하나요?
   - ✅ 핵심 사용자 상호작용을 포함하나요?

**모든 질문에 "예"라면 Features로, 하나라도 "아니오"라면 Pages에 유지하세요.**

## 마이그레이션 로드맵

### Phase 1: 기반 구조 재정비 + Features/Pages 분류 (2주)

1. **shared/api 정비**: API Interface 패턴 적용, 공통 인프라 구축
2. **entities 분리**: User, Student, Document 등 순수 도메인 모델 구축
3. **Features vs Pages 분류**: 재사용성 기준으로 기능들을 올바른 레이어에 배치
   - **Features로 이동**: Auth, Document Management, Wallet Management
   - **Pages에 유지**: Dashboard widgets, History detail, Apply form

### Phase 2: 재사용 가능한 Features 완전 구현 (2주)

1. **Auth Feature**: features/auth에 모든 인증 API 통합, 실시간 검증, 상태 관리
2. **Document Feature**: 파일 업로드, 검증, 상태 관리를 재사용 가능한 컴포넌트로 구현
3. **Wallet Management Feature**: 지갑 연결, 변경, 분실 처리 통합

### Phase 3: Pages 최적화 및 Features 활용 (3주)

1. **Pages 리팩토링**: Pages에서 Features의 재사용 가능한 컴포넌트들을 적극 활용
2. **페이지별 특화 로직 정리**: 재사용되지 않는 UI/로직은 Pages에 명확히 정리
3. **Student Profile 검토**: 재사용성에 따라 Features 또는 Pages 배치 결정

### Phase 4: 고급 기능 및 최적화 (2주)

1. **실시간 검증 통합**: 서버 사이드 검증과 클라이언트 검증 조화
2. **전역 에러 처리**: Error Boundary 및 에러 상태 관리
3. **성능 최적화**: 코드 스플리팅, 메모이제이션, 지연 로딩

### Phase 5: 테스트 및 문서화 (1주)

1. **단위/통합 테스트**: 각 Feature별 테스트 구축
2. **API Interface Mock**: 개발 및 테스트용 Mock 구현
3. **문서화**: 개발 가이드 및 API 문서 작성

## 핵심 개선 효과

### 1. Features vs Pages 올바른 분류의 장점

- **재사용성 극대화**: 공통 기능은 Features에서 여러 페이지가 재사용
- **코드 중복 방지**: 인증, 문서 관리 등 재사용 기능의 중복 제거
- **개발 효율성**: 새로운 페이지 개발 시 기존 Features 활용
- **유지보수 용이성**: 재사용 기능의 수정이 모든 사용처에 자동 반영

### 2. Auth Feature 중심 접근의 장점

- **명확한 책임**: 인증 로직이 features/auth에 집중
- **완전한 자율성**: API, 상태, UI 모든 것이 하나의 Feature 내부
- **테스트 용이성**: Mock API로 독립적 테스트 가능
- **팀 협업**: 인증 기능을 하나의 팀이 완전히 담당

### 3. 타입 관리 최적화

- **명확한 분리**: API DTO vs UI 폼 타입 vs 도메인 모델
- **중복 제거**: User 타입은 entities/user에 단일 정의
- **타입 안정성**: 계층 간 타입 변환 명시적 처리

### 4. 확장 가능한 아키텍처

- **일관된 패턴**: 모든 Feature가 동일한 구조 패턴
- **독립성**: Feature 간 의존성 최소화
- **재사용성**: entities의 순수 API를 여러 Feature에서 재사용

## Cross-Import 관리 및 Entity 간 관계

### 1. FSD Layer Import Rule 준수

현재 가이드는 올바른 Import 방향을 따릅니다:

- ✅ **Features → Entities**: `features/auth` → `entities/user`
- ✅ **Pages → Features**: `pages/auth` → `features/auth`
- ❌ **Entity ↔ Entity**: 같은 레이어 간 직접 Import 금지

### 2. Entity 간 관계가 필요한 경우: @x 패턴 적용

실제 프로젝트에서 Entity 간 관계가 필요한 경우 `@x` 표기법을 사용합니다.

#### 예시: User와 Student 관계

```
entities/
├── user/
│   ├── @x/
│   │   └── student.ts          # student entity를 위한 특별 export
│   ├── model/
│   │   └── types.ts
│   └── index.ts
└── student/
    ├── model/
    │   └── types.ts
    └── index.ts
```

#### entities/user/@x/student.ts

```typescript
// Student entity가 필요로 하는 User 타입만 선별적으로 export
export type { User, UserRole } from "../model/types";
export type { GetUserResponse } from "../api/types";

// Student 전용 User 관련 유틸리티
export const createUserFromStudent = (studentData: any) => {
	// User 생성 로직
};
```

#### entities/student/model/types.ts

```typescript
import type { User, UserRole } from "entities/user/@x/student";

export interface Student {
	user: User; // User 정보 포함
	studentId: string;
	major: string;
	year: number;
	gpa?: number;
}

export interface StudentProfile extends Student {
	academicRecords: AcademicRecord[];
	enrolledCourses: Course[];
}
```

### 3. 복잡한 Entity 관계 처리 패턴

#### Document와 User 관계 예시

```
entities/
├── document/
│   ├── @x/
│   │   └── user.ts             # user entity 관련 document 타입
│   ├── model/
│   │   └── types.ts
│   └── index.ts
└── user/
    ├── @x/
    │   └── document.ts         # document entity 관련 user 타입
    ├── model/
    │   └── types.ts
    └── index.ts
```

#### entities/document/@x/user.ts

```typescript
export type { User } from "entities/user/@x/document";

export interface DocumentOwner {
	userId: string;
	name: string;
	email: string;
}
```

#### entities/user/@x/document.ts

```typescript
export type { User, UserRole } from "../model/types";

// Document 관련 User 확장
export interface UserWithDocuments extends User {
	documentCount?: number;
	lastDocumentCreated?: string;
}
```

### 4. Features에서 Multiple Entities 사용

#### features/document/model/queries.ts

```typescript
import type { CreateDocumentDTO } from "@/entities/document/api/dtos";
import type { User } from "entities/user/@x/document";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { documentQueries } from "@/entities/document";
import { userQueries } from "@/entities/user";

export const useCreateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateDocumentDTO & { owner: User }) => {
			// Document 생성 시 User 정보도 함께 처리
			return documentAPI.createDocument({
				...data,
				ownerId: data.owner.id,
				ownerName: data.owner.name,
			});
		},
		onSuccess: (newDocument) => {
			// Document와 User 관련 캐시 모두 무효화
			queryClient.invalidateQueries({
				queryKey: documentQueries.lists(),
			});

			queryClient.invalidateQueries({
				queryKey: userQueries.profile(newDocument.ownerId),
			});
		},
	});
};
```

### 5. Cross-Import 사용 시 주의사항

#### ✅ 권장 사항

- **Entity Layer에서만 사용**: Feature나 다른 레이어에서는 사용 금지
- **최소한의 노출**: 필요한 타입과 함수만 선별적으로 export
- **명확한 명명**: `@x/{entity-name}.ts` 형식 준수
- **문서화**: 각 cross-import의 이유와 용도 명시

#### ❌ 피해야 할 패턴

```typescript
// 잘못된 예시 - 모든 것을 re-export
export * from "../model/types"; // 금지
export * from "../api"; // 금지

// 올바른 예시 - 선별적 export
export type { User, UserRole } from "../model/types";
export { validateUser } from "../lib/validation";
```

### 6. 실제 프로젝트 적용 예시

현재 프로젝트에서 예상되는 Entity 관계:

```
entities/
├── user/
│   ├── @x/
│   │   ├── student.ts    # Student가 필요한 User 타입
│   │   └── document.ts   # Document가 필요한 User 타입
├── student/
│   ├── @x/
│   │   └── document.ts   # Document가 필요한 Student 타입
├── document/
│   ├── @x/
│   │   ├── user.ts       # User가 필요한 Document 타입
│   │   └── student.ts    # Student가 필요한 Document 타입
└── token/
    ├── @x/
    │   └── user.ts       # User가 필요한 Token 타입
```

이 패턴을 통해 **Entity 간 결합도를 최소화**하면서도 **필요한 관계는 명확히 표현**할 수 있습니다.

## 📋 가이드 개선 요약

### 주요 개선사항

1. **Features vs Pages 분류 기준 명확화**: 재사용성을 핵심 판단 기준으로 설정
2. **현재 프로젝트 기능 분류 가이드 추가**: 실제 프로젝트의 각 기능을 어느 레이어에 배치할지 구체적 가이드 제공
3. **판단 기준 체크리스트 제공**: 향후 새로운 기능 개발 시 올바른 레이어 선택을 위한 체크리스트
4. **API 구조 통일**: Entities와 Features 모든 API가 동일한 Interface 패턴 사용
5. **마이그레이션 로드맵 업데이트**: Features vs Pages 분류를 반영한 단계별 마이그레이션 계획

### API 구조 통일의 장점

1. **일관성**: 모든 레이어에서 동일한 패턴으로 학습 비용 감소
   - `dtos/` - API 계약 정의
   - `interface.ts` - API Interface 정의
   - `implementation.ts` - 구현체
   - `*.queries.ts` - Query Factory
   - `index.ts` - Public API
2. **테스트 용이성**: 모든 API가 Interface로 Mock 가능

   ```typescript
   // 테스트에서 쉽게 Mock 가능
   const mockUserAPI: UserAPI = {
   	getUser: jest.fn(),
   	getUsers: jest.fn(),
   	updateUser: jest.fn(),
   	checkUserExists: jest.fn(),
   };
   ```

3. **타입 안정성**: DTO와 도메인 모델 분리로 계약 명확화
   - **DTO**: 백엔드와의 계약 (API 응답 형태)
   - **Domain Model**: 프론트엔드 내부 데이터 구조
4. **확장성**: 새로운 API 추가 시 동일한 패턴으로 일관된 구현

### 핵심 원칙 재정립

- **모든 것을 Feature로 만들 필요는 없음** (FSD 공식 문서 원칙)
- **재사용되지 않는 기능은 Pages에 보관** (코드 탐색성 및 유지보수성 향상)
- **재사용 가능한 기능만 Features로 분리** (진정한 비즈니스 가치 제공)

이 통합 아키텍처를 통해 **올바른 FSD 분류 원칙을 준수**하면서 **Auth는 Feature, User는 Entity**라는 명확한 분리를 달성하고, 확장 가능하고 유지보수하기 쉬운 애플리케이션을 구축할 수 있습니다.
