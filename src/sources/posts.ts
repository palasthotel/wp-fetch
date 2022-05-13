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
const defaultFetchPostsArgs: GetPostsRequestArgs = {
    type: "posts",
    page: 1,
    per_page: 10,
}
export const wpFetchPosts = async (
    wordpressUrl: string,
    requestArgs: GetPostsRequestArgs = {}
): Promise<PostsResponse> => {

    const args = {
        ...defaultFetchPostsArgs,
        ...requestArgs,
    };
    const type = args.type;
    delete args.type;

    const response = await wpFetchGet<PostResponse[]>({
        wordpressUrl,
        path: `/wp/v2/${type}`,
        args,
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