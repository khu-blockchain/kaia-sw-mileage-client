import {
  DefaultError,
  UseMutationResult,
  UseQueryResult,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type API<T, D> = (request: T) => Promise<D>;

type MutationProps<TResponse> = {
  onSuccess?: (arg: TResponse) => any;
  onError?: <E extends Error>(arg: E) => any;
};

type Query<TRequest, TResponse> = (
  args: TRequest
) => UseQueryResult<TResponse, DefaultError>;

type SuspenseQuery<TRequest, TResponse> = (
  args: TRequest
) => UseSuspenseQueryResult<TResponse, DefaultError>;

type Mutation<TRequest, TResponse> = (
  args: MutationProps<TResponse>
) => UseMutationResult<TResponse, DefaultError, TRequest, unknown>;

export type { API, Mutation, Query, SuspenseQuery };
