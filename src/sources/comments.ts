import {WordPressUrl} from "../@types";
import {wpFetchGet} from "./base";
import {CommentResponse, CommentsResponse, GetCommentRequestArgs, GetCommentsRequestArgs} from "../@types/Comments";

export const wpFetchComments = async <T extends CommentResponse>(
    wordpressUrl: WordPressUrl,
    requestArgs: GetCommentsRequestArgs
): Promise<CommentsResponse<T>> => {

    const response = await wpFetchGet<T[]>({
        wordpressUrl,
        path: `/wp/v2/comments`,
        args: requestArgs,
    });
    if (response == null || !Array.isArray(response?.data)) {
        return {
            comments: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        comments: response.data as T[],
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}

export const wpFetchComment = async <T extends CommentResponse>(
    wordpressUrl: WordPressUrl,
    requestArgs: GetCommentRequestArgs,
) => {
    const {
        id,
        ...args
    } = requestArgs;
    const response = await wpFetchGet<T>(
        {
            wordpressUrl,
            path: `/wp/v2/comments/${requestArgs.id}`,
            args: {
                ...args,
            },
        }
    )
}