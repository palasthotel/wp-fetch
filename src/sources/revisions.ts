import {
    GetRevisionRequestArgs,
    GetRevisionsRequestArgs,
    RevisionResponse,
    RevisionsResponse
} from "../@types/RevisionRequest";
import {Authentication, PostId} from "../@types";
import {wpFetchGet} from "./base";

const defaultFetchRevisionsArgs: GetRevisionsRequestArgs = {
    type: "posts",
    page: 1,
    per_page: 10,
}
export const wpFetchRevisions = async <T extends RevisionResponse>(
    wordpressUrl: string,
    auth: Authentication,
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
        wordpressUrl,
        path: `/wp/v2/${type}/${post}/revisions`,
        auth,
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
    wordpressUrl: string,
    auth: Authentication,
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
        auth,
    });

    return (response?.data as T ) ?? null;
}