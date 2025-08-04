# FSD 아키텍처 완전 프로젝트 가이드

## 개요

React + TypeScript + Tailwind + Zustand + React Query + React Hook Form을 사용한 완결된 프로젝트의 FSD (Feature-Sliced Design) 아키텍처 가이드입니다.

## 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 진입점 및 글로벌 설정
├── pages/                  # 페이지 컴포넌트 (라우팅)
├── widgets/                # 페이지별 복합 UI 위젯
├── features/               # 비즈니스 기능 모듈
├── entities/               # 비즈니스 엔티티
├── shared/                 # 공통 유틸리티 및 컴포넌트
└── index.tsx              # 앱 진입점
```

## 각 레이어별 상세 구조

### 1. App Layer (`src/app/`)

#### `src/app/App.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/shared/ui/toaster'
import { AppRouter } from './router'
import '@/shared/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
```

#### `src/app/router/index.tsx`

```typescript
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/entities/auth'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'
import { ProfilePage } from '@/pages/profile'
import { ProductsPage } from '@/pages/products'
import { MainLayout } from '@/widgets/layout'

export function AppRouter() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductsPage /> : <Navigate to="/auth/login" />}
        />
      </Route>
    </Routes>
  )
}
```

### 2. Pages Layer (`src/pages/`)

#### `src/pages/auth/login/index.tsx`

```typescript
import { LoginWidget } from '@/widgets/auth/login-widget'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <LoginWidget />
      </div>
    </div>
  )
}
```

#### `src/pages/products/index.tsx`

```typescript
import { ProductListWidget } from '@/widgets/product/product-list-widget'
import { ProductFiltersWidget } from '@/widgets/product/product-filters-widget'

export function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFiltersWidget />
        </aside>
        <main className="lg:col-span-3">
          <ProductListWidget />
        </main>
      </div>
    </div>
  )
}
```

### 3. Widgets Layer (`src/widgets/`)

#### `src/widgets/auth/login-widget/index.tsx`

```typescript
import { LoginForm } from '@/features/auth/ui/login-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function LoginWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
```

#### `src/widgets/layout/main-layout/index.tsx`

```typescript
import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

#### `src/widgets/product/product-list-widget/index.tsx`

```typescript
import { useProducts } from '@/entities/product'
import { ProductCard } from '@/entities/product/ui/product-card'
import { PurchaseProductButton } from '@/features/purchase/ui/purchase-product-button'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

export function ProductListWidget() {
  const { data: products, isLoading } = useProducts()

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <div key={product.id} className="relative">
          <ProductCard product={product} />
          <div className="mt-4">
            <PurchaseProductButton productId={product.id} />
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 4. Features Layer (`src/features/`)

#### `src/features/auth/`

##### `src/features/auth/api/index.ts`

```typescript
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

import { api } from "@/shared/api";

export const authApi = {
	login: (data: LoginRequest): Promise<AuthResponse> =>
		api.post("auth/login", { json: data }).json(),

	register: (data: RegisterRequest): Promise<AuthResponse> =>
		api.post("auth/register", { json: data }).json(),

	refresh: (): Promise<AuthResponse> => api.post("auth/refresh").json(),

	logout: (): Promise<void> => api.post("auth/logout").json(),
};
```

##### `src/features/auth/api/types.ts`

```typescript
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface AuthResponse {
	user: {
		id: string;
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}
```

##### `src/features/auth/model/schema.ts`

```typescript
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("유효한 이메일을 입력해주세요"),
	password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export const registerSchema = z
	.object({
		email: z.string().email("유효한 이메일을 입력해주세요"),
		password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
		confirmPassword: z.string(),
		name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["confirmPassword"],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

##### `src/features/auth/ui/login-form/index.tsx`

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api'
import { loginSchema, type LoginFormData } from '../../model/schema'
import { useAuthStore } from '@/entities/auth'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/shared/ui/form'

export function LoginForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
      navigate('/')
    },
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
```

#### `src/features/purchase/`

##### `src/features/purchase/api/index.ts`

```typescript
import type { PurchaseRequest, PurchaseResponse } from "./types";

import { api } from "@/shared/api";

export const purchaseApi = {
	purchaseProduct: (data: PurchaseRequest): Promise<PurchaseResponse> =>
		api.post("purchases", { json: data }).json(),
};
```

##### `src/features/purchase/ui/purchase-product-button/index.tsx`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchaseApi } from '../../api'
import { Button } from '@/shared/ui/button'
import { useToast } from '@/shared/ui/use-toast'

interface PurchaseProductButtonProps {
  productId: string
}

export function PurchaseProductButton({ productId }: PurchaseProductButtonProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const purchaseMutation = useMutation({
    mutationFn: () => purchaseApi.purchaseProduct({ productId }),
    onSuccess: () => {
      toast({
        title: '구매 완료',
        description: '상품이 성공적으로 구매되었습니다.',
      })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => {
      toast({
        title: '구매 실패',
        description: '상품 구매 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })

  return (
    <Button
      onClick={() => purchaseMutation.mutate()}
      disabled={purchaseMutation.isPending}
      className="w-full"
    >
      {purchaseMutation.isPending ? '구매 중...' : '구매하기'}
    </Button>
  )
}
```

### 5. Entities Layer (`src/entities/`)

#### `src/entities/auth/`

##### `src/entities/auth/model/store.ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	user: User | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	setAuth: (user: User, token: string) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			isAuthenticated: false,
			setAuth: (user, token) =>
				set({ user, accessToken: token, isAuthenticated: true }),
			clearAuth: () =>
				set({ user: null, accessToken: null, isAuthenticated: false }),
		}),
		{
			name: "auth-storage",
		},
	),
);
```

##### `src/entities/auth/index.ts`

```typescript
export { useAuthStore } from "./model/store";
export type { User } from "./model/store";
```

#### `src/entities/product/`

##### `src/entities/product/api/index.ts`

```typescript
import type { Product } from "./types";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/shared/api";

const productApi = {
	getProducts: (): Promise<Product[]> => api.get("products").json(),

	getProduct: (id: string): Promise<Product> =>
		api.get(`products/${id}`).json(),
};

export const useProducts = () =>
	useQuery({
		queryKey: ["products"],
		queryFn: productApi.getProducts,
	});

export const useProduct = (id: string) =>
	useQuery({
		queryKey: ["product", id],
		queryFn: () => productApi.getProduct(id),
		enabled: !!id,
	});
```

##### `src/entities/product/ui/product-card/index.tsx`

```typescript
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import type { Product } from '../../api/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-bold mt-4">{product.price.toLocaleString()}원</p>
      </CardContent>
    </Card>
  )
}
```

#### `src/entities/user/`

##### `src/entities/user/api/index.ts`

```typescript
import type { UserProfile } from "./types";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/shared/api";

const userApi = {
	getProfile: (): Promise<UserProfile> => api.get("user/profile").json(),
};

export const useUserProfile = () =>
	useQuery({
		queryKey: ["user", "profile"],
		queryFn: userApi.getProfile,
	});
```

### 6. Shared Layer (`src/shared/`)

#### `src/shared/api/index.ts`

```typescript
import ky from "ky";

import { useAuthStore } from "@/entities/auth";

const API_BASE_URL = "http://localhost:3000/api";

export const api = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: 10000,
	hooks: {
		beforeRequest: [
			(request) => {
				const { accessToken } = useAuthStore.getState();
				if (accessToken) {
					request.headers.set("Authorization", `Bearer ${accessToken}`);
				}
			},
		],
	},
});
```

#### `src/shared/ui/` (shadcn/ui 컴포넌트들)

```
shared/ui/
├── button.tsx
├── card.tsx
├── form.tsx
├── input.tsx
├── loading-spinner.tsx
├── toaster.tsx
├── use-toast.ts
└── index.ts
```

#### `src/shared/lib/utils.ts`

```typescript
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat("ko-KR", {
		style: "currency",
		currency: "KRW",
	}).format(price);
}
```

## 핵심 설계 원칙

### 1. 의존성 방향

- 상위 레이어는 하위 레이어에만 의존
- 같은 레벨 간 직접 import 금지
- shared는 모든 레이어에서 사용 가능

### 2. 책임 분리

- **app**: 전역 설정, 라우팅
- **pages**: 페이지 조합
- **widgets**: 복합 UI 블록
- **features**: 사용자 시나리오
- **entities**: 비즈니스 모델
- **shared**: 재사용 가능한 코드

### 3. 상태 관리 패턴

- **Zustand**: 클라이언트 전역 상태 (인증, 사용자 설정)
- **React Query**: 서버 상태 관리 및 캐싱
- **React Hook Form**: 폼 상태 관리

### 4. API 설계

- 각 entity별로 API hooks 제공
- features에서 mutation 로직 관리
- 공통 API 클라이언트 설정은 shared에서

### 5. 타입 안전성

- 모든 API 응답/요청에 TypeScript 타입 정의
- Zod를 사용한 런타임 검증
- 엄격한 타입 체크 활성화

이 구조를 따르면 확장 가능하고 유지보수가 용이한 React 애플리케이션을 구축할 수 있습니다.
