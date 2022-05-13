import {GetTermRequestArgs, GetTermsRequestArgs, TermResponse, TermsResponse} from "../@types";
import {isArrayOfTermResponse, isTermResponse} from "../type-guard";
import {wpFetchGet} from "./base";

export const wpFetchTerms = async (
    wordpressUrl: string,
    args: GetTermsRequestArgs = {}
): Promise<TermsResponse> => {

    const taxonomy = args.taxonomy;
    delete args.taxonomy;

    const response = await wpFetchGet<TermResponse[]>({
        wordpressUrl,
        path: `/wp/v2/${taxonomy}`,
        args
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