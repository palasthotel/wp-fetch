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
    requestArgs: GetPostsRequestArgs
): Promise<PostsResponse> => {
    const {
        wordpressUrl,
        path = "/wp/v2/{type}",
        args = {}
    } = requestArgs

    const  {
        page = 1,
        limit = 10,
        type = "posts",
    } = args;

    const baseUrl = path.replace("{type}", type);
    const queryString = `?page=${page}&posts_per_page=${limit}`

    const response = await wpFetchGet({
        wordpressUrl,
        path: `${baseUrl}${queryString}`,
    });
    if (response == false || !Array.isArray(response.data)) {
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

export const wpFetchPostById = async (
    requestArgs: GetPostByIdRequestArgs
): Promise<PostResponse | null> => {
    const {
        wordpressUrl,
        path = "/wp/v2/{type}/{id}",
        args: {
            id,
            type = "posts",
        }
    } = requestArgs;
    const response = await wpFetchGet({
        wordpressUrl,
        path: path
            .replace("{type}", type)
            .replace("{id}", String(id)),
    });

    return response != false ? response.data as PostResponse : null;
}

export const wpFetchPostsBySlug = async (
    args: GetPostBySlugRequestArgs
): Promise<PostsResponse> => {
    const {
        wordpressUrl,
        path = "/wp/v2/{type}",
        args: {
            slug,
            type = "posts",
        }
    } = args;
    const response = await wpFetchGet({
        wordpressUrl,
        path: path.replace("{type}", type),
        args: {
            slug: slug,
        }
    });

    if (response == false || !Array.isArray(response.data)) {
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