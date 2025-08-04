# FSD Features Layer 마이그레이션 가이드

## 현재 구조 분석

현재 프로젝트의 features 구조는 대부분 FSD 표준을 따르고 있지만, 일부 개선이 필요한 부분이 있습니다.

### 현재 Features 구조

```
src/features/
├── auth/                    # 인증 관련 기능
│   ├── api/                 # API 함수들
│   ├── lib/                 # 비즈니스 로직 및 유틸리티
│   ├── model/               # 상태 관리 및 타입
│   └── ui/                  # UI 컴포넌트
├── document/                # SW 마일리지 문서 관리
│   ├── api/
│   ├── model/
│   ├── queries/
│   ├── hooks.ts
│   ├── form.ts
│   └── ui/
├── student/                 # 학생 관리
│   ├── api/
│   ├── lib/
│   └── model/
├── token/                   # 토큰 관리
│   ├── api/
│   └── queries/
├── wallet/                  # 지갑 관리
│   ├── api/
│   └── queries/
├── wallet-management/       # 지갑 관리 UI
│   ├── model/
│   └── ui/
└── rank/                    # 랭킹 조회
    └── queries/
```

### FSD 표준과의 비교

#### ✅ 잘 구현된 부분

1. **features layer 사용**: 사용자 인터랙션에 초점을 맞춘 올바른 feature 분리
2. **표준 segment 사용**: `api`, `model`, `ui` 등 표준 segment 활용
3. **Public API 정의**: index.ts를 통한 명확한 외부 인터페이스
4. **비즈니스 도메인별 분리**: auth, document, student 등 명확한 도메인 분리

#### ⚠️ 개선이 필요한 부분

1. **Segment 일관성**: 일부 feature에서 `queries/`, `hooks.ts`, `form.ts` 같은 파일들이 혼재
2. **Feature 중복**: `wallet`과 `wallet-management`의 분리 모호
3. **API와 Queries 분리**: TanStack Query 사용 시 적절한 구조 필요
4. **Model 구조**: 상태 관리와 타입 정의가 혼재

## FSD 표준에 맞는 Features 구조 설계

### 1. 표준 Feature Segment 구조

FSD 문서에 따른 표준 Feature segment:

```
features/{feature-name}/
├── api/                     # Backend 통신
│   ├── {action}.ts         # 구체적인 API 함수들
│   ├── types.ts            # API 관련 타입
│   └── index.ts            # Public API
├── model/                   # 데이터 모델 및 비즈니스 로직
│   ├── store.ts            # 상태 관리 (필요시)
│   ├── types.ts            # 도메인 타입
│   ├── validation.ts       # 검증 로직
│   ├── queries.ts          # TanStack Query 훅
│   └── index.ts            # Public API
├── ui/                      # UI 컴포넌트
│   ├── {component}.tsx     # 구체적인 컴포넌트들
│   └── index.ts            # Public API
├── lib/                     # Feature 내부 라이브러리 (필요시)
│   ├── utils.ts
│   ├── constants.ts
│   └── index.ts
├── config/                  # Feature Flag 및 설정 (필요시)
│   └── index.ts
└── index.ts                 # Feature Public API
```

### 2. 각 Feature별 최적화된 구조

#### 2.1 Auth Feature (인증)

```
features/auth/
├── api/
│   ├── sign-in.ts          # 로그인 API
│   ├── sign-up.ts          # 회원가입 API
│   ├── refresh-token.ts    # 토큰 갱신 API
│   ├── sign-out.ts         # 로그아웃 API
│   ├── types.ts            # API 요청/응답 타입
│   └── index.ts
├── model/
│   ├── store.ts            # 인증 상태 관리
│   ├── types.ts            # 인증 도메인 타입
│   ├── validation.ts       # 폼 검증 스키마
│   ├── queries.ts          # 인증 관련 TanStack Query 훅
│   └── index.ts
├── ui/
│   ├── sign-in-form.tsx    # 로그인 폼
│   ├── sign-up-form.tsx    # 회원가입 폼
│   ├── auth-guard.tsx      # 인증 가드 컴포넌트
│   └── index.ts
├── lib/
│   ├── token-utils.ts      # 토큰 관련 유틸리티
│   ├── validation-rules.ts # 검증 규칙
│   └── index.ts
└── index.ts
```

#### 2.2 Document Feature (SW 마일리지 문서 관리)

```
features/document/
├── api/
│   ├── create-document.ts      # 문서 생성
│   ├── get-documents.ts        # 문서 조회
│   ├── update-document.ts      # 문서 수정
│   ├── upload-file.ts          # 파일 업로드
│   ├── types.ts                # API 타입
│   └── index.ts
├── model/
│   ├── types.ts                # 문서 도메인 타입
│   ├── validation.ts           # 문서 검증 스키마
│   ├── queries.ts              # 문서 관련 쿼리 훅
│   ├── mutations.ts            # 문서 관련 뮤테이션 훅
│   └── index.ts
├── ui/
│   ├── document-form.tsx       # 문서 작성 폼
│   ├── document-list.tsx       # 문서 목록
│   ├── file-upload.tsx         # 파일 업로드 컴포넌트
│   ├── document-preview.tsx    # 문서 미리보기
│   └── index.ts
├── lib/
│   ├── file-utils.ts           # 파일 처리 유틸리티
│   ├── form-utils.ts           # 폼 관련 유틸리티
│   └── index.ts
└── index.ts
```

#### 2.3 Wallet Feature (지갑 관리 통합)

```
features/wallet/
├── api/
│   ├── get-wallet-info.ts      # 지갑 정보 조회
│   ├── get-wallet-history.ts   # 지갑 히스토리 조회
│   ├── change-wallet.ts        # 지갑 변경
│   ├── types.ts
│   └── index.ts
├── model/
│   ├── types.ts                # 지갑 도메인 타입
│   ├── queries.ts              # 지갑 관련 쿼리
│   ├── mutations.ts            # 지갑 관련 뮤테이션
│   └── index.ts
├── ui/
│   ├── wallet-info.tsx         # 지갑 정보 표시
│   ├── wallet-history.tsx      # 지갑 히스토리
│   ├── wallet-change-dialog.tsx # 지갑 변경 다이얼로그
│   ├── wallet-lost-dialog.tsx   # 지갑 분실 다이얼로그
│   ├── confirm-change-dialog.tsx # 변경 확인 다이얼로그
│   └── index.ts
├── lib/
│   ├── wallet-utils.ts         # 지갑 관련 유틸리티
│   ├── blockchain-utils.ts     # 블록체인 유틸리티
│   └── index.ts
└── index.ts
```

#### 2.4 Student Profile Feature (학생 프로필 관리)

```
features/student-profile/
├── api/
│   ├── get-profile.ts          # 프로필 조회
│   ├── update-profile.ts       # 프로필 수정
│   ├── types.ts
│   └── index.ts
├── model/
│   ├── types.ts                # 프로필 타입
│   ├── validation.ts           # 프로필 검증
│   ├── queries.ts              # 프로필 쿼리
│   └── index.ts
├── ui/
│   ├── profile-form.tsx        # 프로필 수정 폼
│   ├── profile-view.tsx        # 프로필 보기
│   └── index.ts
└── index.ts
```

#### 2.5 Token Management Feature (토큰 관리)

```
features/token-management/
├── api/
│   ├── get-token-balance.ts    # 토큰 잔액 조회
│   ├── get-token-history.ts    # 토큰 히스토리
│   ├── types.ts
│   └── index.ts
├── model/
│   ├── types.ts                # 토큰 타입
│   ├── queries.ts              # 토큰 쿼리
│   └── index.ts
├── ui/
│   ├── token-balance.tsx       # 토큰 잔액 표시
│   ├── token-history.tsx       # 토큰 히스토리
│   └── index.ts
└── index.ts
```

#### 2.6 Ranking Feature (랭킹 조회)

```
features/ranking/
├── api/
│   ├── get-rankings.ts         # 랭킹 조회
│   ├── types.ts
│   └── index.ts
├── model/
│   ├── types.ts                # 랭킹 타입
│   ├── queries.ts              # 랭킹 쿼리
│   └── index.ts
├── ui/
│   ├── ranking-list.tsx        # 랭킹 목록
│   ├── ranking-card.tsx        # 랭킹 카드
│   └── index.ts
└── index.ts
```

## 구체적인 마이그레이션 예시

### 1. Auth Feature 마이그레이션

#### 현재 구조 → 목표 구조

**Before (현재)**:

```
features/auth/
├── api/
│   ├── index.ts
│   └── type.ts
├── lib/
│   ├── business.ts
│   ├── hooks.ts
│   ├── index.ts
│   └── validation.ts
├── model/
│   ├── business.ts
│   ├── effects.ts
│   ├── hooks.ts
│   ├── index.ts
│   ├── queries/
│   │   ├── index.ts
│   │   └── type.ts
│   ├── type.ts
│   └── validation.ts
└── ui/
    ├── index.ts
    ├── sign-in-form.tsx
    └── ...
```

**After (목표)**:

```
features/auth/
├── api/
│   ├── sign-in.ts              # 로그인 API 함수
│   ├── sign-up.ts              # 회원가입 API 함수
│   ├── refresh-token.ts        # 토큰 갱신 API 함수
│   ├── types.ts                # API 관련 타입
│   └── index.ts                # API Public API
├── model/
│   ├── store.ts                # 인증 상태 관리 (Zustand)
│   ├── types.ts                # 도메인 타입
│   ├── validation.ts           # 검증 스키마 (Zod)
│   ├── queries.ts              # TanStack Query 훅들
│   └── index.ts                # Model Public API
├── ui/
│   ├── sign-in-form.tsx        # 로그인 폼 컴포넌트
│   ├── sign-up-form.tsx        # 회원가입 폼 컴포넌트
│   ├── auth-guard.tsx          # 인증 가드 컴포넌트
│   └── index.ts                # UI Public API
├── lib/
│   ├── token-utils.ts          # 토큰 관련 유틸리티
│   ├── validation-rules.ts     # 검증 규칙
│   └── index.ts                # Lib Public API
└── index.ts                    # Feature Public API
```

#### 구체적인 파일 구현 예시

##### features/auth/api/sign-in.ts

```typescript
import type { SignInRequest, SignInResponse } from "@/entities/auth/api/dtos";

import { authAPI } from "@/entities/auth";

export const signIn = async (
	credentials: SignInRequest,
): Promise<SignInResponse> => {
	return authAPI.signIn(credentials);
};
```

##### features/auth/api/types.ts

```typescript
// Feature 레벨에서 필요한 추가 타입들
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
}

// API 응답을 UI에서 사용하기 위한 변환된 타입
export interface AuthUser {
	id: string;
	name: string;
	email: string;
	role: string;
	department?: string;
}
```

##### features/auth/model/queries.ts

```typescript
import type { SignInFormData, SignUpFormData } from "../api/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentQueries } from "@/entities/student";

import { refreshToken, signIn, signOut, signUp } from "../api";
import { useAuthStore } from "./store";

export const useSignIn = () => {
	const queryClient = useQueryClient();
	const { setAuth, clearAuth } = useAuthStore();

	return useMutation({
		mutationFn: (data: SignInFormData) =>
			signIn({
				id: data.id,
				password: data.password,
			}),
		onSuccess: (response) => {
			// 인증 상태 업데이트
			setAuth({
				user: response.user,
				tokens: {
					accessToken: response.accessToken,
					refreshToken: response.refreshToken,
				},
				isAuthenticated: true,
			});

			// 관련 쿼리 무효화
			queryClient.invalidateQueries({
				queryKey: studentQueries.all(),
			});
		},
		onError: (error) => {
			clearAuth();
			console.error("Sign in failed:", error);
		},
	});
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: (data: SignUpFormData) =>
			signUp({
				id: data.id,
				name: data.name,
				email: data.email,
				password: data.password,
				department: data.department,
				phoneNumber: data.phoneNumber,
			}),
		onError: (error) => {
			console.error("Sign up failed:", error);
		},
	});
};

export const useSignOut = () => {
	const queryClient = useQueryClient();
	const { clearAuth, tokens } = useAuthStore();

	return useMutation({
		mutationFn: () => signOut({ refreshToken: tokens?.refreshToken || "" }),
		onSuccess: () => {
			clearAuth();
			queryClient.clear(); // 모든 쿼리 캐시 정리
		},
		onError: () => {
			// 에러가 발생해도 로컬 상태는 정리
			clearAuth();
			queryClient.clear();
		},
	});
};
```

##### features/auth/model/store.ts

```typescript
import type { AuthUser } from "../api/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

interface AuthState {
	user: AuthUser | null;
	tokens: AuthTokens | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthActions {
	setAuth: (auth: {
		user: AuthUser;
		tokens: AuthTokens;
		isAuthenticated: boolean;
	}) => void;
	clearAuth: () => void;
	setLoading: (loading: boolean) => void;
	updateTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			// State
			user: null,
			tokens: null,
			isAuthenticated: false,
			isLoading: false,

			// Actions
			setAuth: (auth) =>
				set({
					user: auth.user,
					tokens: auth.tokens,
					isAuthenticated: auth.isAuthenticated,
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

##### features/auth/model/validation.ts

```typescript
import { z } from "zod";

export const signInSchema = z.object({
	id: z.string().min(1, "아이디를 입력해주세요"),
	password: z.string().min(1, "비밀번호를 입력해주세요"),
	rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
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
			.max(10, "이름은 10자 이하여야 합니다"),

		email: z
			.string()
			.email("올바른 이메일 형식이 아닙니다")
			.endsWith("@khu.ac.kr", "경희대학교 이메일만 사용 가능합니다"),

		password: z
			.string()
			.min(8, "비밀번호는 8자 이상이어야 합니다")
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
			.optional(),

		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: "이용약관에 동의해야 합니다",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["confirmPassword"],
	});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
```

##### features/auth/ui/sign-in-form.tsx

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../model/queries";
import { signInSchema, type SignInFormData } from "../model/validation";
import { Button, Input, Checkbox } from "@/shared/ui";

export const SignInForm = () => {
  const { mutate: signIn, isPending, error } = useSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      id: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signIn(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...form.register("id")}
        placeholder="아이디"
        error={form.formState.errors.id?.message}
      />

      <Input
        {...form.register("password")}
        type="password"
        placeholder="비밀번호"
        error={form.formState.errors.password?.message}
      />

      <Checkbox
        {...form.register("rememberMe")}
        label="로그인 상태 유지"
      />

      {error && (
        <div className="text-red-500 text-sm">
          로그인에 실패했습니다: {error.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
};
```

##### features/auth/index.ts (Feature Public API)

```typescript
// Queries and Mutations
export { useSignIn, useSignUp, useSignOut } from "./model/queries";

// Store
export { useAuthStore } from "./model/store";

// Validation
export { signInSchema, signUpSchema } from "./model/validation";
export type { SignInFormData, SignUpFormData } from "./model/validation";

// UI Components
export { SignInForm, SignUpForm, AuthGuard } from "./ui";

// Types
export type { AuthUser } from "./api/types";
```

### 2. Document Feature 마이그레이션

##### features/document/model/queries.ts

```typescript
import type { CreateDocumentData, UpdateDocumentData } from "../api/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { documentQueries } from "@/entities/document";

import {
	createDocument,
	getDocuments,
	updateDocument,
	uploadFile,
} from "../api";

export const useCreateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateDocumentData) => createDocument(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: documentQueries.lists(),
			});
		},
	});
};

export const useDocuments = (filters?: DocumentFilters) => {
	return useQuery(documentQueries.list(filters));
};

export const useDocument = (id: string) => {
	return useQuery(documentQueries.detail(id));
};

export const useUpdateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateDocumentData }) =>
			updateDocument(id, data),
		onSuccess: (updatedDoc) => {
			queryClient.invalidateQueries({
				queryKey: documentQueries.lists(),
			});
			queryClient.setQueryData(
				documentQueries.detail(updatedDoc.id).queryKey,
				updatedDoc,
			);
		},
	});
};

export const useFileUpload = () => {
	return useMutation({
		mutationFn: (file: File) => uploadFile(file),
	});
};
```

### 3. 통합된 Wallet Feature

##### features/wallet/model/queries.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { walletQueries } from "@/entities/wallet";

import { changeWallet, getWalletHistory, getWalletInfo } from "../api";

export const useWalletInfo = () => {
	return useQuery(walletQueries.info());
};

export const useWalletHistory = (filters?: WalletHistoryFilters) => {
	return useQuery(walletQueries.history(filters));
};

export const useChangeWallet = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newAddress: string) => changeWallet(newAddress),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: walletQueries.all(),
			});
		},
	});
};
```

## 마이그레이션 계획

### Phase 1: 기본 구조 정리 (1-2주)

1. **Segment 표준화**: `queries/`, `hooks.ts`, `form.ts` 등을 표준 segment로 이동
2. **중복 제거**: `wallet`과 `wallet-management` 통합
3. **Public API 정리**: 각 feature의 index.ts 최적화

### Phase 2: TanStack Query 최적화 (1주)

1. **Query 통합**: model/queries.ts로 모든 쿼리 훅 통합
2. **API 분리**: 순수 API 함수와 React 훅 분리
3. **캐싱 전략**: 적절한 staleTime과 invalidation 로직 적용

### Phase 3: 타입 시스템 개선 (1주)

1. **타입 분리**: API 타입과 UI 타입 명확히 구분
2. **검증 스키마**: Zod를 활용한 일관된 검증 로직
3. **타입 안정성**: 모든 feature에서 strict type checking

### Phase 4: UI 컴포넌트 최적화 (1주)

1. **컴포넌트 분리**: 재사용 가능한 부분과 feature 특화 부분 구분
2. **Props 인터페이스**: 명확한 컴포넌트 API 정의
3. **성능 최적화**: memo, useCallback 등 적절한 최적화 적용

### Phase 5: 테스트 및 문서화 (1주)

1. **단위 테스트**: 각 API 함수와 훅에 대한 테스트
2. **통합 테스트**: Feature 전체 플로우 테스트
3. **문서화**: README 및 컴포넌트 문서 작성

## 마이그레이션 시 주의사항

### 1. 점진적 마이그레이션

- 한 번에 모든 feature를 변경하지 말고 하나씩 점진적으로 진행
- 기존 코드의 호환성을 유지하면서 새로운 구조로 이전
- 각 단계별로 충분한 테스트 수행

### 2. Import 경로 관리

```typescript
// 기존
import { useSignIn } from "@/features/auth/model/hooks";

// 마이그레이션 후
import { useSignIn } from "@/features/auth";
```

### 3. 타입 호환성

- 기존 타입과 새로운 타입 간의 호환성 보장
- 점진적으로 타입을 개선하되 breaking change 최소화

### 4. 성능 영향 최소화

- 기존 쿼리 키와의 호환성 유지
- 캐시 무효화 로직 신중하게 검토

## 기대 효과

### 1. 코드 품질 향상

- **일관된 구조**: 모든 feature가 동일한 패턴을 따름
- **타입 안정성**: 명확한 타입 정의로 런타임 에러 감소
- **테스트 용이성**: 표준화된 구조로 테스트 작성 용이

### 2. 개발 효율성 증대

- **코드 탐색**: 표준 구조로 코드 찾기 쉬움
- **재사용성**: 명확한 Public API로 재사용 용이
- **유지보수**: 일관된 패턴으로 유지보수 비용 감소

### 3. 팀 협업 개선

- **학습 곡선**: 새로운 팀원의 적응 시간 단축
- **코드 리뷰**: 표준화된 구조로 리뷰 품질 향상
- **지식 공유**: 일관된 패턴으로 지식 전파 용이

이 가이드를 통해 현재 프로젝트의 features layer를 FSD 표준에 맞게 체계적으로 개선할 수 있습니다.
