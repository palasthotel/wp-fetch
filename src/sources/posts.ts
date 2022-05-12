import {
    GetPostByIdRequestArgs,
    GetPostBySlugRequestArgs,
    GetPostsRequestArgs,
    PostResponse,
    PostsResponse
} from "../@types";

import {wpFetchGet} from "./base";

// --------------------------------------------------------------------------------
// posts
// --------------------------------------------------------------------------------
export const wpFetchPosts = async (
    wordpressUrl: string,
    requestArgs: GetPostsRequestArgs = {}
): Promise<PostsResponse> => {

    const {
        type = "posts",
        page = 1,
        limit = 10,
    } = requestArgs;

    const baseUrl = "/wp/v2/"+type;
    const queryString = `?page=${page}&posts_per_page=${limit}`;

    const response = await wpFetchGet<PostResponse[]>({
        wordpressUrl,
        path: `${baseUrl}${queryString}`,
    });
    if (response == null || !Array.isArray(response?.data)) {
        return {
            posts: [],
            total: 0,
            totalPages: 0,
        } as PostsResponse;
    }

    return {
        posts: response.data,
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}

export const wpFetchPostById = async (
    wordpressUrl: string,
    requestArgs: GetPostByIdRequestArgs
): Promise<PostResponse | null> => {
    const {
        id,
        type = "posts",
    } = requestArgs;
    const response = await wpFetchGet<PostResponse>({
        wordpressUrl,
        path: `/wp/v2/${type}/${id}`,
    });

    return response?.data ?? null;
}

export const wpFetchPostsBySlug = async (
    wordpressUrl: string,
    args: GetPostBySlugRequestArgs
): Promise<PostsResponse> => {
    const {
        slug,
        type = "posts",
    } = args;
    const response = await wpFetchGet({
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