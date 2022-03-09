import {GetTermRequestArgs, GetTermsRequestArgs, TermResponse} from "../@types";
import {isArrayOfTermResponse, isTermResponse} from "../@types/type-guard";
import {wpFetchGet} from "./base";

export const wpFetchTerms = async (
    args: GetTermsRequestArgs
): Promise<TermResponse[]> => {
    const {
        wordpressUrl,
        path = `/wp/v2/{taxonomy}`,
        args: {
            taxonomy,
            include,
            hide_empty = true,
            per_page = 100,
        }
    } = args;
    const query = [
        "hide_empty=" + (hide_empty ? "1" : "0"),
        "per_page=" + per_page
    ];
    if (Array.isArray(include) && include.length > 0) {
        query.push(`include=${include.join(",")}`);
    }
    const basePath = path.replace("{taxonomy}", taxonomy);
    const queryString = query.length > 0 ? "?" + query.join("&") : "";
    const response = await wpFetchGet({
        wordpressUrl,
        path: `${basePath}${queryString}`
    });

    if(response === false || !isArrayOfTermResponse(response.data) ){
        return [];
    }

    return response.data;
}

export const wpFetchTerm = async (args: GetTermRequestArgs): Promise<TermResponse | false> => {
    const {
        wordpressUrl,
        path = `/wp/v2/{taxonomy}/{id}`,
        args: {
            taxonomy,
            id,
        }
    } = args;
    const response = await wpFetchGet({
        wordpressUrl,
        path: path
            .replace("{taxonomy}", taxonomy)
            .replace("{id}", String(id))
    });

    return response !== false && isTermResponse(response.data) ? response.data : false;
}