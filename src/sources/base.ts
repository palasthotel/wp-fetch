import axios from "axios";

import {GetRequestArgs, GetResponse} from "../@types";

export const wordPressGetJsonUrl = (request: GetRequestArgs): string => {
    const {wordpressUrl, path} = request;
    return `${wordpressUrl}/wp-json${path}`;
}

export const wpFetchGet = async (request: GetRequestArgs) => {
    try {
        const url = wordPressGetJsonUrl(request);
        const response = await axios({
            method: "GET",
            url,
            params: request.args,
        });
        const result: GetResponse = {
            data: response.data,
        };
        if (response.headers["x-wp-total"] != undefined) {
            result.xWPTotal = parseInt(response.headers["x-wp-total"]);
            result.xWPTotalPages = parseInt(response.headers["x-wp-totalpages"]);
        }

        return result;
    } catch (e) {
        console.error(e);
        return false;
    }
}