import axios, {AxiosRequestConfig} from "axios";

import {
    WPConnection,
    GetRequest,
    GetResponse,
    WPRequestConfig,
    WPResponse,
    RequestInterceptor,
    ResponseInterceptor,
    InterceptorId, InterceptorConfig
} from "../@types";
import {isAuthenticatedUrl} from "../type-guard";

let instance: WPConnection | null = null;

const byPriority = (
    a: RequestInterceptor|ResponseInterceptor,
    b: RequestInterceptor|ResponseInterceptor
) => a.priority - b.priority;
let interceptorId: InterceptorId = 1;
let requestInterceptors: RequestInterceptor[] = [];
let responseInterceptors: ResponseInterceptor[] = [];

const getConnection = (newConnection: boolean = false): WPConnection => {
    if (instance == null || newConnection) {
        instance = axios.create();
        instance.interceptors.request.use((config) => {
            requestInterceptors.forEach( ({fn}) => {
                config = fn(config);
            });
            return config;
        });
        instance.interceptors.response.use((response) => {
            responseInterceptors.forEach(({fn})=> {
                response = fn(response);
            })
            return response;
        })
    }
    return instance;
};

export const onRequest = (
    fn: (config: WPRequestConfig) => WPRequestConfig,
    config: InterceptorConfig = {}
): InterceptorId => {
    const {
        priority = 10,
    } = config;
    const id = interceptorId++;
    requestInterceptors.push({id, fn, priority});
    requestInterceptors = requestInterceptors.sort(byPriority);
    return id;
}
export const ejectRequest = (id: InterceptorId) => {
    requestInterceptors = requestInterceptors.filter(i => i.id != id);
}

export const ejectAllRequestInterceptors = () => requestInterceptors = [];

export const onResponse = (
    fn: (response: WPResponse) => WPResponse,
    config: InterceptorConfig = {}
): InterceptorId => {
    const {
        priority = 10,
    } = config;
    const id = interceptorId++;
    responseInterceptors.push({id, fn, priority});
    responseInterceptors = responseInterceptors.sort(byPriority);
    return id;
}
export const ejectResponse = (id: InterceptorId) => {
    responseInterceptors = responseInterceptors.filter(i => i.id != id);
}

export const ejectAllResponseInterceptors = () => responseInterceptors = [];

export const setHeader = (key: string, value: string) => {
    getConnection().defaults.headers.common[key] = value;
}

export const wordPressGetJsonUrl = (request: GetRequest): string => {
    const {wordpressUrl, path} = request;
    return `${isAuthenticatedUrl(wordpressUrl) ? wordpressUrl.url : wordpressUrl}/wp-json${path}`;
}

export const wpFetchGet = async <T>(request: GetRequest): Promise<GetResponse<T> | null> => {
    try {
        const url = wordPressGetJsonUrl(request);
        const config: AxiosRequestConfig = {
            params: request.args,
        };
        if (isAuthenticatedUrl(request.wordpressUrl)) {
            config.auth = request.wordpressUrl.auth;
        }
        const response = await getConnection().get(url, config);
        if (response.status !== 200) return null;
        const result: GetResponse<T> = {
            data: response.data,
        };
        if (response.headers["x-wp-total"] != undefined) {
            result.xWPTotal = parseInt(response.headers["x-wp-total"]);
            result.xWPTotalPages = parseInt(response.headers["x-wp-totalpages"]);
        }

        return result;
    } catch (e) {
        return null;
    }
}