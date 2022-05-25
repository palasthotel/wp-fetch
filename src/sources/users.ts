import {GetUsersRequestArgs, UserId, UserResponse, UsersResponse, WordPressUrl} from "../@types";
import {wpFetchGet} from "./base";

export const wpFetchUsers = async <T extends UserResponse>(
    wordpressUrl: WordPressUrl,
    requestArgs: GetUsersRequestArgs = {}
): Promise<UsersResponse<T>> => {
    const response = await wpFetchGet<T[]>({
        wordpressUrl,
        path: `/wp/v2/users`,
        args: requestArgs,
    });

    if (response == null || !Array.isArray(response?.data)) {
        return {
            users: [],
            total: 0,
            totalPages: 0,
        };
    }

    return {
        users: response.data as T[],
        total: response.xWPTotal ?? 0,
        totalPages: response.xWPTotalPages ?? 0
    }
}

export const wpFetchUser = async <T extends UserResponse>(
    wordpressUrl: WordPressUrl,
    id: UserId
): Promise<T | null> => {
    const response = await wpFetchGet<T>({
        wordpressUrl,
        path: `/wp/v2/users/${id}`,
    });

    return (response?.data as T) ?? null;
}