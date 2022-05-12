import {MenuItemResponse} from "../@types";
import {buildHierarchy} from "./index";

export function menuAsHierarchy(
    menu: MenuItemResponse[],
){
    return buildHierarchy<MenuItemResponse>(
        menu,
        (item) => item.ID,
        (item) => item.menu_item_parent === '0' ? false : parseInt(item.menu_item_parent),
    )
}