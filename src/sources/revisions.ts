import {
    WordPressAuthenticatedUrl,
    Authentication,
    GetRevisionRequestArgs,
    GetRevisionsRequestArgs,
    PostId,
    RevisionResponse,
    RevisionsResponse
} from "../@types";
import {wpFetchGet} from "./base";

const defaultFetchRevisionsArgs: GetRevisionsRequestArgs = {
    type: "posts",
    page: 1,
    per_page: 10,
}
export const wpFetchRevisions = async <T extends RevisionResponse>(
    wordpressUrl: WordPressAuthenticatedUrl,
    post: PostId,
    requestArgs: GetRevisionsRequestArgs = {},
) : Promise<RevisionsResponse<T>> => {

    const args = {
        ...defaultFetchRevisionsArgs,
        ...requestArgs,
    };

    const type = args.type;
    delete args.type;

    const response = await wpFetchGet<T[]>({
        wordpressUrl: wordpressUrl,
        path: `/wp/v2/${type}/${post}/revisions`,
        args: requestArgs,
    });

    if (response == null || !Array.isArray(response?.data)) {
        return {
            revisions: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        revisions: response.data as T[],
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}

export const wpFetchRevision = async <T extends RevisionResponse>(
    wordpressUrl: WordPressAuthenticatedUrl,
    requestArgs: GetRevisionRequestArgs
): Promise<T | null> => {
    const {
        post,
        revision,
        type = "posts",
    } = requestArgs;
    const response = await wpFetchGet<T>({
        wordpressUrl,
        path: `/wp/v2/${type}/${post}/revisions/${revision}`,
    });

    return (response?.data as T ) ?? null;
}