import {GetMenuRequestArgs, MenuItemResponse, MenusResponse} from "../@types";
import {isArrayOfMenuItemResponse, isMenusResponse} from "../type-guard";
import {wpFetchGet} from "./base";

export const wpFetchMenus = async (
    wordpressUrl: string,
): Promise<MenusResponse|null> => {
    const response = await wpFetchGet<MenusResponse>({
        wordpressUrl,
        path: `/headless/v1/menus`,
    });

    if(response == null || !isMenusResponse(response.data)){
        return null;
    }

    return response.data;
}

export const wpFetchMenu = async (
    wordpressUrl: string,
    requestArgs: GetMenuRequestArgs
): Promise<MenuItemResponse[] | null> => {

    const {
        slug
    } = requestArgs;

    const response = await wpFetchGet({
        wordpressUrl: wordpressUrl,
        path: `/headless/v1/menus/${slug}`,
    });
    return response !== null && isArrayOfMenuItemResponse(response.data) ? response.data : null;
}