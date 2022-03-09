import {MenuItemResponse, MenuSlug, TermResponse} from "./index";


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
        typeof data.title === "string" &&
        typeof data.url === "string" &&
        typeof data.menu_item_parent === "string" &&
        typeof data.menu_order === "number";
}


export const isArrayOfMenuItemResponse = (data: any): data is MenuItemResponse[] => {
    return Array.isArray(data) &&
        data.filter(isMenuItemResponse).length === data.length;
}

export const isTermResponse = (data: any): data is TermResponse => {
    return typeof data === "object" &&
        typeof data.id === "number" &&
        typeof data.count === "number" &&
        typeof data.description === "string" &&
        typeof data.name === "string" &&
        typeof data.slug === "string" &&
        typeof data.taxonomy === "string" &&
        isArrayOfStrings(data.meta);
}


export const isArrayOfTermResponse = (data: any): data is TermResponse[] => {
    return Array.isArray(data) &&
        data.filter(isTermResponse).length === data.length;
}