import {TermResponse} from "../@types";
import {buildHierarchy} from "./index";

export function termsAsHierarchy(
    terms: TermResponse[],
){
    return buildHierarchy<TermResponse>(
        terms,
        (item) => item.id,
        (item) => item.parent && item.parent > 0 ? item.parent : false,
    )
}