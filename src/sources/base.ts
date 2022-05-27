import axios, {AxiosRequestConfig} from "axios";

import {WPConnection, GetRequest, GetResponse, WPRequestConfig, WPResponse} from "../@types";
import {isAuthenticatedUrl} from "../type-guard";

let instance: WPConnection | null = null;

const getConnection = (newConnection: boolean = false): WPConnection => {
    if (instance == null || newConnection) {
        instance = axios.create();
    }
    return instance;
};

export const onRequest = (fn: (config: WPRequestConfig) => WPRequestConfig) => {
    return getConnection().interceptors.request.use(fn);
}
export const ejectRequest = (id: number) => {
    return getConnection().interceptors.request.eject(id);
}

export const onResponse = (fn: (response: WPResponse) => WPResponse | Promise<WPResponse>) => {
    return getConnection().interceptors.response.use(fn);
}
export const ejectResponse = (id: number) => {
    return getConnection().interceptors.response.eject(id);
}

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