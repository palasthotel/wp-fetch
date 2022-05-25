import axios, {AxiosRequestConfig} from "axios";

import {HeadlessConnection, GetRequest, GetResponse, HeadlessRequestConfig, HeadlessResponse} from "../@types";
import {isAuthenticatedUrl} from "../type-guard";

let instance: HeadlessConnection | null = null;

const getConnection = (): HeadlessConnection => {
    if (instance == null) {
        instance = axios.create();
    }
    return instance;
};

export const useRequest = (fn: (config: HeadlessRequestConfig) => HeadlessRequestConfig) => {
    return getConnection().interceptors.request.use(fn);
}
export const ejectRequest = (id: number) => {
    return getConnection().interceptors.request.eject(id);
}

export const useResponse = (fn: (response: HeadlessResponse) => HeadlessResponse | Promise<HeadlessResponse>) => {
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