import {
    GetPostByIdRequestArgs,
    GetPostBySlugRequestArgs,
    GetPostsRequestArgs,
    PostResponse,
    PostsResponse, WordPressUrl
} from "../@types";

import {wpFetchGet} from "./base";

// --------------------------------------------------------------------------------
// posts
// --------------------------------------------------------------------------------
const defaultFetchPostsArgs: GetPostsRequestArgs = {
    type: "posts",
    page: 1,
    per_page: 10,
}
export const wpFetchPosts = async <T extends PostResponse>(
    wordpressUrl: WordPressUrl,
    requestArgs: GetPostsRequestArgs = {}
): Promise<PostsResponse<T>> => {

    const args = {
        ...defaultFetchPostsArgs,
        ...requestArgs,
    };
    const type = args.type;
    delete args.type;

    const response = await wpFetchGet<T[]>({
        wordpressUrl,
        path: `/wp/v2/${type}`,
        args,
    });
    if (response == null || !Array.isArray(response?.data)) {
        return {
            posts: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        posts: response.data as T[],
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}

export const wpFetchPostById = async <T extends PostResponse | null>(
    wordpressUrl: WordPressUrl,
    requestArgs: GetPostByIdRequestArgs
): Promise<T | null> => {
    const {
        id,
        type = "posts",
    } = requestArgs;
    const response = await wpFetchGet<PostResponse>({
        wordpressUrl,
        path: `/wp/v2/${type}/${id}`,
    });

    return (response?.data as T ) ?? null;
}

export const wpFetchPostsBySlug = async <T extends PostResponse>(
    wordpressUrl: WordPressUrl,
    args: GetPostBySlugRequestArgs
): Promise<PostsResponse<T>> => {
    const {
        slug,
        type = "posts",
    } = args;
    const response = await wpFetchGet<T>({
        wordpressUrl,
        path: `/wp/v2/${type}`,
        args: {
            slug: slug,
        }
    });

    if (response == null || !Array.isArray(response.data)) {
        return {
            posts: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        posts: response.data,
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}