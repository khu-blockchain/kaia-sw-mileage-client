type APIResponse<T> = {
	data: T;
	meta: any;
};

export type APIPromise<T> = Promise<APIResponse<T>>;
