export type Path = `/${string}` | '';
export type Headers = { extends?: boolean } & Record<string, string | boolean>;

export const IMETHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
} as const;

export type MethodKeys = (typeof IMETHOD)[keyof typeof IMETHOD];

export interface BaseAPIConfig {
	path?: Path;
	baseUrl?: string;
}

export interface Options {
	method?: MethodKeys;
	headers?: Headers;
	withCredentials?: RequestCredentials;
	signal?: AbortSignal;
	data?: Record<string, unknown> | FormData;
}

export type APIMethod = (
	endpoint: Path | URL,
	options?: Options,
) => Promise<Response>;

export interface Detail {
	ProductName: string;
	Specifications: Record<string, string>;
	Description: string;
}

export interface Product {
	Price: string;
	PK: string;
	ImageURL: string;
	Detail: Detail;
}
