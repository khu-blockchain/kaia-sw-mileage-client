# QueryClient 사용 패턴 가이드

## 개요

이 가이드는 현재 프로젝트에서 사용되고 있는 TanStack Query (React Query)의 queryClient 패턴들을 분석하고, 실전 활용 방법을 제시합니다.

## 현재 프로젝트의 queryClient 사용 패턴

### 1. QueryProvider 설정 (전역 설정)

```typescript
// src/app/providers/QueryProvider.tsx
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,    // 창 포커스 시 재요청 비활성화
			refetchOnMount: false,          // 컴포넌트 마운트 시 재요청 비활성화  
			refetchOnReconnect: false,      // 재연결 시 재요청 비활성화
			throwOnError: true,             // 에러 발생 시 throw
			staleTime: 1000 * 60 * 5,      // 5분간 fresh 상태 유지
		},
	},
});
```

**특징:**
- **보수적 설정**: 불필요한 재요청을 최소화
- **긴 staleTime**: 5분간 캐시된 데이터를 fresh로 간주
- **에러 처리**: throwOnError로 Error Boundary에서 처리 가능

### 2. 회원가입에서 invalidateQueries 사용

```typescript
// src/pages/sign-up/api/queries.ts
export const useStudentSignUp = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: SignUpRequest) => await studentApi.signUp(data),
		onSuccess: () => {
			// 학생 관련 모든 쿼리 무효화
			queryClient.invalidateQueries({ queryKey: studentQueries.all() });
		},
	});
};
```

**패턴 상세:**
- **invalidateQueries**: 캐시된 데이터를 무효화하여 다음 요청 시 새로 가져오도록 함
- **studentQueries.all()**: `["student"]` 키로 시작하는 모든 쿼리 무효화
- **타이밍**: 회원가입 성공 후 학생 목록이 변경되었을 가능성이 있으므로 무효화

### 3. 로그인에서 queryClient 미사용 패턴

```typescript
// src/pages/sign-in/api/queries.ts
export const useStudentSignIn = () => {
	const { actions } = useStudentStore();  // Zustand store 사용

	return useMutation({
		mutationFn: async (data: SignInRequest) => await authApi.signIn(data),
		onSuccess: (response: SignInResponse) => {
			const student = mapStudent(response);
			actions.setStudent(student);  // 로컬 상태만 업데이트
		},
	});
};
```

**특징:**
- **로컬 상태 우선**: queryClient 대신 Zustand store 사용
- **즉시 반영**: API 응답을 바로 로컬 상태에 저장
- **단순함**: 복잡한 캐시 관리 없이 직접적인 상태 관리

### 4. Query Factory 패턴

```typescript
// src/entities/student/api/queries.ts
export const studentQueries = {
	all: () => ["student"] as const,
	me: () => [...studentQueries.all(), "me"] as const,
};
```

**장점:**
- **타입 안전성**: `as const`로 literal 타입 보장
- **계층적 구조**: 상위 키(`all`)를 하위 키(`me`)에서 재사용
- **무효화 용이성**: `studentQueries.all()`로 모든 student 쿼리 무효화 가능

## queryClient 메서드별 상세 사용법

### 1. invalidateQueries (현재 사용 중)

```typescript
// 특정 키 무효화
queryClient.invalidateQueries({ queryKey: ["users"] });

// 조건부 무효화
queryClient.invalidateQueries({ 
  queryKey: ["users"], 
  predicate: (query) => query.state.data?.length > 10 
});

// 즉시 재요청
queryClient.invalidateQueries({ 
  queryKey: ["users"], 
  refetchType: "active" // 현재 활성화된 쿼리만 재요청
});
```

**언제 사용:**
- 데이터가 변경되었을 가능성이 있을 때
- 서버의 최신 데이터가 필요할 때
- 부정확한 캐시를 정리하고 싶을 때

### 2. setQueryData (캐시 직접 업데이트)

```typescript
// 단일 데이터 업데이트
queryClient.setQueryData(["user", userId], updatedUser);

// 함수형 업데이트
queryClient.setQueryData(["users"], (oldUsers) => 
  oldUsers?.map(user => user.id === userId ? updatedUser : user)
);

// 조건부 업데이트
queryClient.setQueryData(["user", userId], (oldUser) => {
  if (!oldUser) return undefined;
  return { ...oldUser, ...updates };
});
```

**언제 사용:**
- mutation 결과를 즉시 UI에 반영하고 싶을 때
- 서버 요청 없이 로컬 캐시만 업데이트하고 싶을 때
- optimistic update (낙관적 업데이트)를 구현할 때

### 3. prefetchQuery (사전 로딩)

```typescript
// 조건부 사전 로딩
const prefetchUserProfile = async (userId: string) => {
  await queryClient.prefetchQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 호버 시 사전 로딩
const onUserHover = (userId: string) => {
  queryClient.prefetchQuery(userQueries.detail(userId));
};
```

**언제 사용:**
- 사용자가 곧 필요할 데이터를 미리 로딩
- 페이지 전환 전에 데이터 준비
- 마우스 호버 등 인터랙션 시 미리 로딩

### 4. removeQueries (캐시 제거)

```typescript
// 특정 쿼리 완전 제거
queryClient.removeQueries({ queryKey: ["user", userId] });

// 조건부 제거
queryClient.removeQueries({ 
  predicate: (query) => query.state.status === "error" 
});
```

**언제 사용:**
- 메모리 절약이 필요할 때
- 민감한 데이터를 완전히 제거하고 싶을 때
- 에러 상태의 쿼리들을 정리할 때

### 5. clear (전체 캐시 정리)

```typescript
// 모든 쿼리 캐시 정리
queryClient.clear();
```

**언제 사용:**
- 로그아웃 시 모든 사용자 데이터 정리
- 앱 초기화가 필요할 때
- 메모리 누수 방지를 위한 완전 정리

## 실전 활용 권장사항

### 1. 현재 프로젝트에 추가하면 좋은 패턴

#### 로그인 성공 시 사용자 정보 미리 로딩

```typescript
export const useStudentSignIn = () => {
	const queryClient = useQueryClient();
	const { actions } = useStudentStore();

	return useMutation({
		mutationFn: async (data: SignInRequest) => await authApi.signIn(data),
		onSuccess: (response: SignInResponse) => {
			const student = mapStudent(response);
			actions.setStudent(student);
			
			// 추가: 자주 사용될 데이터 미리 로딩
			queryClient.prefetchQuery(studentQueries.me());
		},
	});
};
```

#### 로그아웃 시 캐시 정리

```typescript
export const useSignOut = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: signOutApi,
		onSuccess: () => {
			// 민감한 데이터 완전 제거
			queryClient.clear();
			// 또는 특정 데이터만 제거
			queryClient.removeQueries({ queryKey: ["student"] });
		},
	});
};
```

### 2. Optimistic Update 패턴

```typescript
export const useUpdateStudent = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: updateStudentApi,
		onMutate: async (newData) => {
			// 낙관적 업데이트
			await queryClient.cancelQueries({ queryKey: studentQueries.me() });
			const previousData = queryClient.getQueryData(studentQueries.me());
			
			queryClient.setQueryData(studentQueries.me(), newData);
			
			return { previousData };
		},
		onError: (err, newData, context) => {
			// 실패 시 이전 데이터로 롤백
			if (context?.previousData) {
				queryClient.setQueryData(studentQueries.me(), context.previousData);
			}
		},
		onSettled: () => {
			// 최종적으로 서버 데이터로 동기화
			queryClient.invalidateQueries({ queryKey: studentQueries.me() });
		},
	});
};
```

### 3. 복합 데이터 관리 패턴

```typescript
export const useCreateMileage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createMileageApi,
		onSuccess: (newMileage) => {
			// 여러 관련 쿼리 동시 무효화
			queryClient.invalidateQueries({ queryKey: ["mileage"] });
			queryClient.invalidateQueries({ queryKey: ["student", "me"] });
			queryClient.invalidateQueries({ queryKey: ["ranking"] });
			
			// 새 데이터를 캐시에 즉시 반영
			queryClient.setQueryData(
				["mileage", newMileage.id], 
				newMileage
			);
		},
	});
};
```

## 프로젝트에서 사용하지 않는 고급 패턴들

### 1. setQueryData (캐시 직접 업데이트)
- **현재 상태**: 미사용
- **권장 활용**: mutation 후 즉시 UI 반영이 필요한 경우

### 2. prefetchQuery (사전 로딩)
- **현재 상태**: 미사용  
- **권장 활용**: 페이지 전환이나 호버 시 미리 데이터 로딩

### 3. clear (전체 캐시 정리)
- **현재 상태**: 미사용
- **권장 활용**: 로그아웃 시 보안상 중요한 데이터 완전 제거

## 베스트 프랙티스

### 1. Query Key 관리
```typescript
// ✅ 좋은 예시: 계층적 구조
export const mileageQueries = {
	all: () => ["mileage"] as const,
	lists: () => [...mileageQueries.all(), "list"] as const,
	list: (filters: string) => [...mileageQueries.lists(), filters] as const,
	details: () => [...mileageQueries.all(), "detail"] as const,
	detail: (id: string) => [...mileageQueries.details(), id] as const,
};

// ❌ 나쁜 예시: 평면적 구조
export const badQueries = {
	allMileage: ["mileage"],
	mileageList: ["mileage", "list"],
	mileageDetail: (id: string) => ["mileage", "detail", id],
};
```

### 2. Mutation 후 캐시 관리 전략

```typescript
// 1. 작은 변경: setQueryData 사용
onSuccess: (updatedItem) => {
	queryClient.setQueryData(
		itemQueries.detail(updatedItem.id),
		updatedItem
	);
}

// 2. 큰 변경: invalidateQueries 사용
onSuccess: () => {
	queryClient.invalidateQueries({ 
		queryKey: itemQueries.lists() 
	});
}

// 3. 복합 변경: 조합 사용
onSuccess: (newItem) => {
	// 새 데이터 즉시 반영
	queryClient.setQueryData(
		itemQueries.detail(newItem.id),
		newItem
	);
	
	// 목록은 서버에서 최신 데이터 가져오기
	queryClient.invalidateQueries({ 
		queryKey: itemQueries.lists() 
	});
}
```

### 3. 에러 처리 패턴

```typescript
export const useUpdateData = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateDataApi,
		onError: (error, variables, context) => {
			// 롤백이 필요한 경우
			if (context?.previousData) {
				queryClient.setQueryData(
					dataQueries.detail(variables.id),
					context.previousData
				);
			}
			
			// 에러 상태의 쿼리 정리
			queryClient.removeQueries({
				predicate: (query) => query.state.status === "error"
			});
		},
	});
};
```

## 성능 최적화 팁

### 1. 적절한 staleTime 설정
```typescript
// 자주 변경되지 않는 데이터: 긴 staleTime
const userProfileQuery = {
	queryKey: ["user", "profile"],
	queryFn: fetchUserProfile,
	staleTime: 10 * 60 * 1000, // 10분
};

// 실시간성이 중요한 데이터: 짧은 staleTime
const notificationQuery = {
	queryKey: ["notifications"],
	queryFn: fetchNotifications,
	staleTime: 30 * 1000, // 30초
};
```

### 2. 조건부 prefetch
```typescript
const useSmartPrefetch = (userId: string, shouldPrefetch: boolean) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (shouldPrefetch) {
			queryClient.prefetchQuery(userQueries.detail(userId));
		}
	}, [userId, shouldPrefetch]);
};
```

### 3. 메모리 관리
```typescript
// 컴포넌트 언마운트 시 불필요한 캐시 정리
useEffect(() => {
	return () => {
		// 임시 데이터 정리
		queryClient.removeQueries({
			queryKey: ["temp"],
			exact: true
		});
	};
}, []);
```

## 마무리

queryClient는 **서버 상태와 클라이언트 캐시를 효율적으로 관리**하는 강력한 도구입니다. 현재 프로젝트에서는 `invalidateQueries`만 사용하고 있지만, 필요에 따라 `setQueryData`, `prefetchQuery`, `clear` 등의 메서드를 추가로 활용하면 더욱 향상된 사용자 경험을 제공할 수 있습니다.

핵심은 **각 상황에 맞는 적절한 패턴을 선택**하는 것이며, 성능과 사용자 경험의 균형을 맞추는 것입니다.