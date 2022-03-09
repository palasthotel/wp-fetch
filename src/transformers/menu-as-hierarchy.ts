import {MenuItemResponse} from "../@types";
import buildHierarchy from "./hierarchy";

export default function menuAsHierarchy(
    menu: MenuItemResponse[],
){
    return buildHierarchy<MenuItemResponse>(
        menu,
        (item) => item.ID,
        (item) => item.menu_item_parent === '0' ? false : parseInt(item.menu_item_parent),
    )
}