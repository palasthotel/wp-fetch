import axios from "axios";
import {
    GetMenuRequestArgs,
    GetRequestArgs,
    GetResponse,
    MenuItemResponse,
    MenuSlug
} from "./_types/types";
import {isArrayOfMenuSlugs} from "./_types/type-guard";

export const getWPJsonUrl = (request: GetRequestArgs): string => {
    const {wordpressUrl, path} = request;
    return `${wordpressUrl}/wp-json${path}`;
}

export const wordPressGet = async (request: GetRequestArgs) => {
    try {
        const url = getWPJsonUrl(request);
        const response = await axios({
            method: "GET",
            url,
            params: request.args,
        });
        const result: GetResponse = {
            data: response.data,
        };
        if (response.headers["x-wp-total"] != undefined) {
            result.xWPTotal = parseInt(response.headers["x-wp-total"]);
            result.xWPTotalPages = parseInt(response.headers["x-wp-totalpages"]);
        }

        return result;
    } catch (e) {
        console.error(e);
        return false;
    }
}

// --------------------------------------------------------------------------------
// menus
// --------------------------------------------------------------------------------
export const wordPressGetMenus = async (
    {
        wordpressUrl,
        path = "/headless/v1/menus",
    }: GetRequestArgs
): Promise<MenuSlug[]> => {
    const response = await wordPressGet({
        wordpressUrl,
        path,
    });
    return response && isArrayOfMenuSlugs(response.data) ? response.data : [];
}

export const wordPressGetMenu = async (
    {
        wordpressUrl,
        path = "/headless/v1/menus/{slug}",
        args: {slug}
    }: GetMenuRequestArgs
): Promise<MenuItemResponse[]> => {
    const response = await wordPressGet({
        wordpressUrl: wordpressUrl,
        path: path.replace("{slug}", slug),
    });
    return response && Array.isArray(response.data) ? response.data : [];
}