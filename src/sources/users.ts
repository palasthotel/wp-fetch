import {GetUsersRequestArgs, UserResponse, UsersResponse} from "../@types/UserRequest";
import {wpFetchGet} from "./base";

export const wpFetchUsers = async <T extends UserResponse>(
    wordpressUrl: string,
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

export const wpFetchAuthors = async <T extends UserResponse>(
    wordpressUrl: string,
    requestArgs: Omit<GetUsersRequestArgs, "who"> = {}
): Promise<UsersResponse<T>> => {
    return wpFetchUsers<T>(wordpressUrl, {...requestArgs, who: "authors"})
}
