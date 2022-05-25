import {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from "axios";

export type HeadlessConnection = AxiosInstance
export type HeadlessRequestConfig = AxiosRequestConfig & {
    url?: string
    method?: string
    params?: any
    headers?: AxiosRequestHeaders
    auth?: Authentication
};
export type HeadlessResponse = AxiosResponse

export type Authentication = {
    username: string
    password: string
}

export type WordPressAuthenticatedUrl = {
    url: string
    auth: Authentication
}

export type WordPressUrl = string | WordPressAuthenticatedUrl

export type GetRequest = {
    wordpressUrl: WordPressUrl
    path: string
    args?: Record<string, string | string[] | number | number[] | boolean>
}

export type GetResponse<T> = {
    data: T
    xWPTotal?: number
    xWPTotalPages?: number
}