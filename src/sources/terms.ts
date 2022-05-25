import {GetTermRequestArgs, GetTermsRequestArgs, TermResponse, TermsResponse, WordPressUrl} from "../@types";
import {isArrayOfTermResponse, isTermResponse} from "../type-guard";
import {wpFetchGet} from "./base";

export const wpFetchTerms = async <T extends TermResponse>(
    wordpressUrl: WordPressUrl,
    args: GetTermsRequestArgs = {}
): Promise<TermsResponse<T>> => {

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
        terms: response.data as T[],
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0,
    };
}

export const wpFetchTerm = async <T extends TermResponse>(
    wordpressUrl: WordPressUrl,
    args: GetTermRequestArgs
): Promise<T | null> => {
    const {
        id,
        taxonomy = "categories",
    } = args;
    const response = await wpFetchGet({
        wordpressUrl,
        path: `/wp/v2/${taxonomy}/${id}`,
    });

    return response !== null && isTermResponse(response.data) ? response.data as T : null;
}