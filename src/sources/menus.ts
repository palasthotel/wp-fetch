import {GetMenuRequestArgs, GetRequestArgs, MenuItemResponse, MenuSlug} from "../@types";
import {isArrayOfMenuItemResponse, isArrayOfMenuSlugs} from "../@types/type-guard";
import {wpFetchGet} from "./base";

export const wpFetchMenus = async (
    {
        wordpressUrl,
        path = "/headless/v1/menus",
    }: GetRequestArgs
): Promise<MenuSlug[]> => {
    const response = await wpFetchGet({
        wordpressUrl,
        path,
    });
    return response !== false && isArrayOfMenuSlugs(response.data) ? response.data : [];
}

export const wpFetchMenu = async (
    requestArgs: GetMenuRequestArgs
): Promise<MenuItemResponse[] | false> => {

    const {
        wordpressUrl,
        path = "/headless/v1/menus/{slug}",
        args: {
            slug
        }
    } = requestArgs;

    const response = await wpFetchGet({
        wordpressUrl: wordpressUrl,
        path: path.replace("{slug}", slug),
    });
    return response !== false && isArrayOfMenuItemResponse(response.data) ? response.data : false;
}