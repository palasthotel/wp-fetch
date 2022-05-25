import {WordPressAuthenticatedUrl} from "../@types";

export const isAuthenticatedUrl = (data: unknown): data is WordPressAuthenticatedUrl => {
    return typeof data != "string";
}
