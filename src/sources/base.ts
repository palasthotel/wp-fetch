import axios from "axios";

import {GetRequest, GetResponse} from "../@types";

export const wordPressGetJsonUrl = (request: GetRequest): string => {
    const {wordpressUrl, path} = request;
    return `${wordpressUrl}/wp-json${path}`;
}

export const wpFetchGet = async <T>(request: GetRequest): Promise<GetResponse<T>|null> => {
    try {
        const url = wordPressGetJsonUrl(request);
        const response = await axios({
            method: "GET",
            url,
            params: request.args,
        });
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