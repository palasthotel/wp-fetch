import {TermResponse} from "../@types";


export const isTermResponse = (data: any): data is TermResponse => {
    return typeof data === "object" &&
        typeof data.id === "number" &&
        typeof data.count === "number" &&
        typeof data.description === "string" &&
        typeof data.name === "string" &&
        typeof data.slug === "string" &&
        typeof data.taxonomy === "string";
}


export const isArrayOfTermResponse = (data: any): data is TermResponse[] => {
    return Array.isArray(data) &&
        data.filter(isTermResponse).length === data.length;
}