import {GetTermRequestArgs, GetTermsRequestArgs, TermResponse, TermsResponse} from "../@types";
import {isArrayOfTermResponse, isTermResponse} from "../type-guard";
import {wpFetchGet} from "./base";

export const wpFetchTerms = async (
    wordpressUrl: string,
    args: GetTermsRequestArgs = {}
): Promise<TermsResponse> => {
    const {
        taxonomy = "categories",
        search,
        include = [],
        exclude = [],
        hide_empty = true,
        page = 1,
        per_page = 100,
        order = "asc",
        orderby = "name",
        post,
        slug,
    } = args;
    const query = [
        "hide_empty=" + (hide_empty ? "1" : "0"),
        `per_page=${per_page}`,
        `page=${page}`,
        `order=${order}`,
        `orderby=${orderby}`,
    ];
    if (Array.isArray(include) && include.length > 0) {
        query.push(`include=${include.join(",")}`);
    }
    if (Array.isArray(exclude) && exclude.length > 0) {
        query.push(`exclude=${exclude.join(",")}`);
    }
    if(typeof search == "string" && search.length > 0){
        query.push(`search=${search}`);
    }
    if(post !=  undefined){
        query.push(`post=${post}`);
    }
    if(slug != undefined){
        query.push(`slug=${slug}`);
    }
    const basePath = `/wp/v2/${taxonomy}`;
    const queryString = query.length > 0 ? "?" + query.join("&") : "";
    const response = await wpFetchGet<TermResponse[]>({
        wordpressUrl,
        path: `${basePath}${queryString}`
    });

    if(response == null || !isArrayOfTermResponse(response?.data) ){
        return {
            terms: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        terms: response.data,
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0,
    };
}

export const wpFetchTerm = async (
    wordpressUrl: string,
    args: GetTermRequestArgs
): Promise<TermResponse | null> => {
    const {
        id,
        taxonomy = "categories",
    } = args;
    const response = await wpFetchGet({
        wordpressUrl,
        path: `/wp/v2/${taxonomy}/${id}`,
    });

    return response !== null && isTermResponse(response.data) ? response.data : null;
}