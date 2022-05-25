import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

import {GetRequest, GetResponse} from "../@types";
import {isAuthenticatedUrl} from "../type-guard";


let instance:AxiosInstance|null = null;

export const setAxios = (axios: AxiosInstance) => {
    instance = axios;
}

export const getAxios = (): AxiosInstance => {
    if(instance == null){
        instance = axios.create();
    }
    return instance;
};

export const wordPressGetJsonUrl = (request: GetRequest): string => {
    const {wordpressUrl, path} = request;
    return `${isAuthenticatedUrl(wordpressUrl) ? wordpressUrl.url : wordpressUrl}/wp-json${path}`;
}

export const wpFetchGet = async <T>(request: GetRequest): Promise<GetResponse<T>|null> => {
    try {
        const url = wordPressGetJsonUrl(request);
        const config: AxiosRequestConfig = {
            params: request.args,
        }
        if(isAuthenticatedUrl(request.wordpressUrl)) {
            config.auth = request.wordpressUrl.auth;
        }
        const response = await getAxios().get( url, config);
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