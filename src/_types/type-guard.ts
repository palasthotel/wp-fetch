import {MenuItemResponse, MenuSlug} from "./types";

export const isArrayOfStrings = (data: unknown): data is string[] => {
    return Array.isArray(data) &&
        data.filter(item => typeof item !== "string").length === 0;
}

export const isArrayOfMenuSlugs = (data: unknown): data is MenuSlug[] => {
    return isArrayOfStrings(data);
}


export const isMenuItemResponse = (data: any): data is MenuItemResponse => {
    return typeof data === "object" &&
        typeof data.ID === "number" &&
        typeof data.title == "string" &&
        typeof data.url === "string" &&
        typeof data.menu_item_parent === "string" &&
        typeof data.menu_order === "number";
}