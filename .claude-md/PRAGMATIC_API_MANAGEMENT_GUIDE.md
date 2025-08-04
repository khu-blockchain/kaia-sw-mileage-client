# 실용적 API 관리 가이드: FSD와 협업 효율성의 균형점

## 문제 정의

### 현실적인 협업 요구사항

1. **API 수정사항 발견 시 빠른 대응**: 개발자가 API 문제를 발견했을 때 즉시 찾아서 수정할 수 있어야 함
2. **백엔드 팀과의 원활한 소통**: "users API 수정했어요" → "shared/api/user에서 바로 수정"
3. **토큰 관리의 기술적 제약**: HTTP 인터셉터에서 토큰 접근 필요 → shared 레이어 배치 불가피
4. **신규 개발자 온보딩**: API 구조를 직관적으로 파악 가능해야 함

### FSD 원칙과의 상충점

```
FSD 순수 원칙:
├── entities/user/api/        ← 순수 데이터 레이어
├── features/auth/api/        ← 비즈니스 로직 레이어
└── pages/profile/api/        ← 페이지별 API

vs

실용적 요구사항:
└── shared/api/
    ├── auth/                 ← 모든 인증 관련 API
    ├── user/                 ← 모든 사용자 관련 API
    └── mileage/              ← 모든 마일리지 관련 API
```

## 해결책: 하이브리드 아키텍처

### 핵심 원칙

1. **API 호출은 중앙집중 (shared/api/${domain})**
2. **비즈니스 로직은 분산 (features/entities의 queries/hooks)**
3. **Import 방향성 유지**: features/entities → shared/api

### 구조 설계

```
src/
├── shared/
│   └── api/                          # 🎯 모든 API 호출의 중앙집중점
│       ├── client.ts                 # HTTP 클라이언트 + 토큰 관리
│       ├── auth/index.ts             # 인증 API 함수들
│       ├── user/index.ts             # 사용자 API 함수들
│       ├── mileage/index.ts          # 마일리지 API 함수들
│       └── student/index.ts          # 학생 API 함수들
├── entities/
│   ├── user/
│   │   ├── model/types.ts            # 도메인 모델
│   │   └── lib/queries.ts            # Query hooks (shared/api/user 사용)
│   └── mileage/
│       ├── model/types.ts            # 도메인 모델
│       └── lib/queries.ts            # Query hooks (shared/api/mileage 사용)
└── features/
    └── auth/
        ├── model/
        │   ├── store.ts              # 인증 상태 관리
        │   └── queries.ts            # 인증 비즈니스 로직 (shared/api/auth 사용)
        └── ui/
            ├── SignInForm.tsx        # 로그인 폼 컴포넌트
            └── AuthGuard.tsx         # 인증 가드 컴포넌트
```

## 상세 구현 전략

### 1. shared/api - API 호출 중앙집중

#### 특징

- **서버 API 구조와 1:1 매칭**: `/api/auth/login` → `shared/api/auth/index.ts`
- **HTTP 레이어 통합 관리**: 토큰, 인터셉터, 에러 핸들링 모두 여기서
- **순수 함수형 API**: 비즈니스 로직 없는 단순 HTTP 호출만

```typescript
// shared/api/auth/index.ts
export const authApi = {
	login: (data: LoginRequest): Promise<LoginResponse> =>
		apiClient.post("auth/login", { json: data }).json(),

	logout: (refreshToken: string): Promise<void> =>
		apiClient.post("auth/logout", { json: { refreshToken } }).json(),

	refreshToken: (data: RefreshTokenRequest): Promise<RefreshTokenResponse> =>
		apiClient.post("auth/refresh", { json: data }).json(),
};
```

#### 장점

- ✅ **개발자 경험**: "인증 API 어디있지?" → `shared/api/auth` (3초 내 발견)
- ✅ **백엔드 소통**: 서버 API 구조와 완벽 매칭
- ✅ **기술적 제약 해결**: 토큰 관리가 자연스럽게 shared에 위치
- ✅ **Import 일관성**: 모든 곳에서 `import { authApi } from '@/shared/api'`

#### 한계점

- ⚠️ **FSD 레이어 원칙 일부 위반**: API가 도메인별로 분산되지 않음
- ⚠️ **의존성 관리 복잡성**: shared/api가 많은 책임 보유

### 2. entities - 도메인 모델 + Query Hooks

#### 역할

- **도메인 타입 정의**: 비즈니스 엔티티의 순수한 타입
- **Query Factory**: TanStack Query 최적화를 위한 쿼리 옵션
- **Basic Hooks**: 단순 CRUD 훅들

```typescript
// entities/user/lib/queries.ts
import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/shared/api";

export const userQueries = {
	all: () => ["users"] as const,
	detail: (id: string) => [...userQueries.all(), "detail", id] as const,
	list: (filters: GetUsersRequest) =>
		[...userQueries.all(), "list", filters] as const,
};

export const useUser = (id: string) => {
	return useQuery({
		queryKey: userQueries.detail(id),
		queryFn: () => userApi.getUser(id),
		enabled: !!id,
	});
};

export const useUsers = (filters?: GetUsersRequest) => {
	return useQuery({
		queryKey: userQueries.list(filters || {}),
		queryFn: () => userApi.getUsers(filters),
	});
};
```

#### 장점

- ✅ **FSD 원칙 준수**: 순수한 데이터 레이어 역할
- ✅ **재사용성**: 여러 feature에서 동일한 쿼리 사용 가능
- ✅ **캐시 최적화**: Query key factory로 캐시 관리 최적화

### 3. features - 비즈니스 로직 조합

#### 역할

- **복합 비즈니스 로직**: 여러 API 조합하여 의미있는 기능 구현
- **상태 관리**: Feature별 복잡한 상태 관리
- **UI 컴포넌트**: 재사용 가능한 기능 단위 컴포넌트

```typescript
// features/auth/model/queries.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/entities/user";
import { authApi } from "@/shared/api";

import { useAuthStore } from "./store";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const { setAuth } = useAuthStore();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (response) => {
			// 🎯 비즈니스 로직: 인증 상태 설정
			setAuth(response);

			// 🎯 비즈니스 로직: 사용자 정보 미리 로딩
			queryClient.prefetchQuery({
				queryKey: userQueries.detail(response.user.id),
				queryFn: () => userApi.getUser(response.user.id),
			});

			// 🎯 비즈니스 로직: 관련 캐시 무효화
			queryClient.invalidateQueries({ queryKey: ["user-data"] });
		},
	});
};
```

#### 장점

- ✅ **재사용성**: 여러 페이지에서 동일한 로그인 로직 사용
- ✅ **비즈니스 가치**: 단순 API 호출을 의미있는 기능으로 조합
- ✅ **상태 관리**: 복잡한 인증 상태를 체계적으로 관리

## FSD 원칙과의 조화 방안

### 1. Import 방향성 유지

```typescript
// ✅ 올바른 Import 방향
features/auth/model/queries.ts
└── import { authApi } from '@/shared/api'          // Feature → Shared (OK)
└── import { userQueries } from '@/entities/user'   // Feature → Entity (OK)

entities/user/lib/queries.ts
└── import { userApi } from '@/shared/api'          // Entity → Shared (OK)
```

### 2. 책임 분리 명확화

| 레이어         | 책임                   | shared/api 사용 방식      |
| -------------- | ---------------------- | ------------------------- |
| **shared/api** | HTTP 호출, 토큰 관리   | - (자기 자신)             |
| **entities**   | 도메인 모델, 기본 쿼리 | 순수 API 호출만 사용      |
| **features**   | 비즈니스 로직 조합     | API 조합 + 상태 관리      |
| **pages**      | 페이지별 특화 로직     | features/entities 훅 사용 |

### 3. 레이어 역할 재정의

#### shared/api의 정당성

1. **기술적 제약**: 토큰 관리를 위해 HTTP 인터셉터가 shared에 있어야 함
2. **Infrastructure Layer**: 네트워크 통신은 비즈니스 로직이 아닌 인프라
3. **FSD 공식 허용**: shared는 "특히 프로젝트/비즈니스의 특성과 분리되어 있을 때 (반드시 그럴 필요는 없음)" 라고 명시

#### entities의 역할 강화

- **도메인 모델의 순수성 유지**
- **Query Factory 패턴으로 재사용성 극대화**
- **API 호출은 shared/api에 의존하되, 비즈니스 의미는 entities에서 부여**

#### features의 차별화

- **단순 API 호출이 아닌 의미있는 비즈니스 기능**
- **여러 entities 조합하여 사용자 가치 창출**
- **재사용 가능한 UI 컴포넌트와 상태 관리**

## 구현 가이드라인

### 1. shared/api 작성 원칙

```typescript
// ✅ Good: 순수한 API 호출
export const userApi = {
	getUser: (id: string): Promise<User> => apiClient.get(`users/${id}`).json(),

	updateUser: (id: string, data: UpdateUserRequest): Promise<User> =>
		apiClient.put(`users/${id}`, { json: data }).json(),
};

// ❌ Bad: 비즈니스 로직 포함
export const userApi = {
	getUser: async (id: string): Promise<User> => {
		const user = await apiClient.get(`users/${id}`).json();

		// ❌ 이런 로직은 features나 entities에서
		if (user.role === "admin") {
			// 관리자 전용 로직
		}

		return user;
	},
};
```

### 2. entities 작성 원칙

```typescript
// ✅ Good: 도메인 중심의 쿼리 팩토리
export const userQueries = {
	all: () => ["users"] as const,
	detail: (id: string) => [...userQueries.all(), "detail", id] as const,
	profile: (id: string) => [...userQueries.all(), "profile", id] as const,
};

export const useUserProfile = (id: string) => {
	return useQuery({
		queryKey: userQueries.profile(id),
		queryFn: () => userApi.getUser(id),
		select: (user) => ({
			// 🎯 도메인 특화 데이터 변환
			displayName: user.name,
			departmentInfo: `${user.department} (${user.year}학년)`,
			contactInfo: user.email,
		}),
	});
};
```

### 3. features 작성 원칙

```typescript
// ✅ Good: 의미있는 비즈니스 기능
export const useStudentRegistration = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: StudentRegistrationData) => {
			// 🎯 여러 API 조합
			const user = await authApi.createUser(data.userInfo);
			const student = await studentApi.createStudent({
				userId: user.id,
				...data.studentInfo,
			});

			return { user, student };
		},
		onSuccess: ({ user, student }) => {
			// 🎯 복잡한 캐시 관리
			queryClient.setQueryData(userQueries.detail(user.id), user);
			queryClient.setQueryData(studentQueries.detail(student.id), student);

			// 🎯 관련 목록 무효화
			queryClient.invalidateQueries({
				queryKey: studentQueries.all(),
			});
		},
	});
};
```

## 마이그레이션 전략

### Phase 1: 기반 구조 구축 (1주)

1. **shared/api 구조 완성**

   ```bash
   shared/api/
   ├── client.ts
   ├── auth/index.ts
   ├── user/index.ts
   ├── mileage/index.ts
   └── student/index.ts
   ```

2. **기존 API 호출들을 shared/api로 이동**
   - entities/\*/api/ → shared/api/${domain}/
   - features/\*/api/ → shared/api/${domain}/

### Phase 2: 레이어별 책임 재정의 (2주)

1. **entities 정리**
   - 도메인 모델 타입 정의
   - Query factory 패턴 적용
   - 기본 CRUD hooks 구현

2. **features 비즈니스 로직 집중**
   - 복합 API 조합 로직
   - 상태 관리 로직
   - 재사용 가능한 UI 컴포넌트

### Phase 3: 최적화 및 안정화 (1주)

1. **Import 정리**: 모든 API 호출이 shared/api 경유하도록
2. **타입 안정성 검증**: DTO와 도메인 모델 분리 확인
3. **성능 최적화**: Query key factory 최적화

## 결론: 실용적 균형점

### 이 구조를 선택하는 이유

1. **협업 효율성 극대화**
   - API 수정 시 즉시 위치 파악 가능
   - 백엔드 팀과의 원활한 소통
   - 신규 개발자 빠른 적응

2. **기술적 제약 해결**
   - 토큰 관리 문제 자연스럽게 해결
   - HTTP 인터셉터의 안정적 운영
   - 네트워크 레이어 통합 관리

3. **FSD 핵심 가치 보존**
   - Import 방향성 유지
   - 레이어별 책임 분리
   - 높은 응집도, 낮은 결합도

### 트레이드오프 수용

- **FSD 순수성 일부 포기**: 실용적 이익을 위해 수용
- **shared/api 복잡성 증가**: 명확한 가이드라인으로 관리
- **초기 구조 설계 비용**: 장기적 유지보수 이익으로 상쇄

### 최종 권장사항

**"완벽한 아키텍처보다 팀이 효율적으로 협업할 수 있는 실용적 아키텍처가 더 가치있다"**

현재 프로젝트의 특성(CRUD 중심, API 호출 빈번, 협업 중시)을 고려할 때, `shared/api/${domain}` 구조가 FSD의 핵심 가치는 유지하면서도 실제 개발 효율성을 극대화하는 최적의 선택입니다.

## 참고 자료

- [FSD 공식 문서 - Shared Layer](/.docs/layers.md#shared)
- [FSD 공식 문서 - 점진적 도입](/.docs/overview.md#incremental-adoption)
- [기존 FSD 통합 아키텍처 가이드](./FSD_UNIFIED_ARCHITECTURE_GUIDE.md)
- [API Interface 패턴 가이드](./API_INTERFACE_PATTERN_GUIDE.md)
