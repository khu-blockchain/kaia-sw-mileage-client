# FSD 아키텍처 분석 결과 (Updated)

## 현재 프로젝트 FSD 구조 만족도 분석

### ✅ 잘 준수하고 있는 부분

1. **기본 레이어 구조**
   - `app/`, `pages/`, `features/`, `entities/`, `shared/` 레이어가 모두 존재
   - 표준 FSD 레이어 명명 규칙 준수

2. **적절한 Import 방향**
   - 상위 레이어가 하위 레이어만 import하는 규칙 준수
   - `pages/sign-up/models/queries.ts`에서 `@entities/student`, `@/shared/api/student` import

3. **올바른 Features vs Pages 분류** ⭐
   - `features/connect-wallet`: 재사용 가능한 지갑 연결 기능 (여러 페이지에서 사용)
   - `pages/sign-in`, `pages/sign-up`: 페이지별 특화 기능 (재사용되지 않음)
   - **Auth 기능이 Pages에 위치한 것이 올바른 설계** - 로그인/회원가입은 해당 페이지에서만 사용되는 기능

4. **실용적 API 관리 구조 적용**
   - `shared/api/auth/`, `shared/api/student/`로 도메인별 API 중앙집중
   - PRAGMATIC_API_MANAGEMENT_GUIDE.md의 하이브리드 아키텍처 원칙 준수

5. **세그먼트 구조**
   - `ui/`, `models/`, `lib/` 등 표준 세그먼트 사용
   - 적절한 책임 분리

### ✅ 새롭게 발견한 잘 구현된 부분

6. **Pages 내 비즈니스 로직 정리**
   - `pages/sign-up/models/queries.ts`: 페이지 특화 비즈니스 로직 (`useStudentSignUp`)
   - entities와 shared/api를 적절히 조합하여 사용

7. **Entities Layer 활용**
   - `studentQueries.all()`을 통한 캐시 무효화 전략
   - Entity와 API의 적절한 분리

### ⚠️ 개선이 필요한 부분

1. **Entity Layer 미완성**
   - `entities/student/model/types.ts`만 존재
   - `lib/queries.ts`에 Query Factory 패턴 누락

2. **API Interface 패턴 미적용**
   - `shared/api/auth/`, `shared/api/student/`에서 순수 함수형 API만 존재
   - Interface 기반 Mock 테스트 불가능

## ✅ 재평가된 현재 아키텍처 적절성

### 1. Auth 기능의 올바른 위치 설정 ⭐

**현재 상태 (재평가 결과: 적절함):**
- 로그인 API: `shared/api/auth/` (중앙집중 관리)
- 로그인 상태: `shared/models/auth-store.ts` (전역 상태)  
- 로그인 로직: `pages/sign-in/` (페이지별 특화)
- 회원가입 로직: `pages/sign-up/models/queries.ts` (페이지별 특화)

**기존 평가 수정:**
- ❌ 기존: "Auth를 Features로 이전 필요"
- ✅ 현재: **"Auth가 Pages에 위치한 것이 올바른 FSD 원칙 준수"**

**근거:**
- 로그인/회원가입은 해당 페이지에서만 사용되는 기능 (재사용되지 않음)
- FSD 원칙: "모든 것을 Feature로 만들 필요는 없음"
- PRAGMATIC_API_MANAGEMENT_GUIDE.md 원칙 준수: API는 중앙집중, 비즈니스 로직은 분산

### 2. 실제 개선이 필요한 부분 (우선순위 재조정)

#### 🔥 최우선: Entity Layer 완성

**현재 상태:**
- `entities/student/model/types.ts`만 존재
- Query Factory 패턴 미구현

**개선 방향:**
```
entities/student/
├── lib/
│   └── queries.ts        # Query Factory 패턴 구현
├── model/
│   └── types.ts          # 이미 존재
└── index.ts
```

**구체적 구현:**
```typescript
// entities/student/lib/queries.ts
export const studentQueries = {
  all: () => ['students'] as const,
  detail: (id: string) => [...studentQueries.all(), 'detail', id] as const,
  profile: (id: string) => [...studentQueries.all(), 'profile', id] as const,
}

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: studentQueries.detail(id),
    queryFn: () => studentApi.getStudent(id),
    enabled: !!id,
  })
}
```

#### 🔸 차선: API Interface 패턴 적용 (선택사항)

**현재 상태:**
- `shared/api/*`에서 순수 함수형 API 사용
- 테스트를 위한 Mock 구현 어려움

**개선 방향 (PRAGMATIC_API_MANAGEMENT_GUIDE.md 기준):**
- 현재 구조 유지하되, 필요시 Interface 패턴 점진적 도입
- 테스트 필요성이 높아질 때 적용 고려

## 점수 평가 (재평가)

### FSD 준수도: **85/100** (⬆️ +15점 상향 조정)

- **레이어 구조**: 95/100 (기본 구조 우수)
- **Import 규칙**: 90/100 (올바른 방향성 준수)
- **Features vs Pages 분류**: 95/100 (⭐ 재사용성 기준으로 올바른 분류)
- **API 관리 패턴**: 80/100 (실용적 하이브리드 구조 적용)
- **Entity 완성도**: 60/100 (기본 구조 + Query 활용, Query Factory 패턴 미구현)

### 재평가 후 개선 우선순위

1. **Entity Layer Query Factory 패턴 구현** (완성도 향상)
2. **API Interface 패턴 적용** (선택사항, 테스트 필요시)

## 구체적인 개선 로드맵 (수정)

### Phase 1: Entity Layer 완성하기 (3일)
1. `entities/student/lib/queries.ts` 구현
   - Query Factory 패턴 적용
   - 기본 CRUD hooks 구현
2. `entities/student/index.ts` Public API 정리

**구현 예시:**
```typescript
// entities/student/lib/queries.ts 신규 생성
import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/shared/api/student'

export const studentQueries = {
  all: () => ['students'] as const,
  detail: (id: string) => [...studentQueries.all(), 'detail', id] as const,
  profile: (id: string) => [...studentQueries.all(), 'profile', id] as const,
}

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: studentQueries.detail(id),
    queryFn: () => studentApi.getStudent(id),
    enabled: !!id,
  })
}
```

### Phase 2: API Interface 패턴 검토 (선택사항)
- 테스트 필요성이 높아질 때만 적용
- 현재 구조로도 충분히 효율적임

## 최종 결론 ⭐

현재 프로젝트는 **FSD 원칙을 매우 잘 준수하고 있는 우수한 아키텍처**입니다.

### 🎯 주요 강점

1. **올바른 Features vs Pages 분류**
   - `features/connect-wallet`: 재사용 가능한 기능
   - `pages/sign-in`, `pages/sign-up`: 페이지별 특화 기능
   - FSD 원칙 "모든 것을 Feature로 만들 필요는 없다" 완벽 준수

2. **실용적 API 관리**
   - `shared/api/*` 도메인별 중앙집중
   - PRAGMATIC_API_MANAGEMENT_GUIDE.md 하이브리드 아키텍처 적용
   - 협업 효율성과 기술적 제약 해결

3. **적절한 Import 방향성**
   - Pages → Entities → Shared/API 흐름 준수
   - 레이어 간 의존성 관리 우수

### 🔧 미미한 개선사항

- **Entity Layer Query Factory 패턴 추가**: 캐시 관리 최적화
- **API Interface 패턴**: 필요시 점진적 도입

### 📊 종합 평가

**"현재 프로젝트는 FSD 아키텍처의 핵심 가치를 잘 구현한 모범 사례"**

- ✅ 명시성: 구조가 직관적이고 이해하기 쉬움
- ✅ 제어: 적절한 레이어 분리와 의존성 관리
- ✅ 적응성: 실용적 해결책과 FSD 원칙의 균형점 확보

기존 분석에서 "Features로 이전 필요"라고 평가했던 Auth 기능이 실제로는 **올바른 위치에 구현**되어 있었으며, 이는 FSD의 핵심 원칙인 **"재사용성 기준 분류"**를 정확히 따른 결과입니다.