import {GetRequestArgs, MenuSlug} from "../@types";
import {wpFetchGet} from "./base";
import {isArrayOfMenuSlugs} from "../@types/type-guard";



export const wpFetchSettings = async (
    {
        wordpressUrl,
        path = "/wp/v2/settings",
    }: GetRequestArgs
): Promise<MenuSlug[]> => {
    const response = await wpFetchGet({
        wordpressUrl,
        path,
    });
    return response !== false && isArrayOfMenuSlugs(response.data) ? response.data : [];
}