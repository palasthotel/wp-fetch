import {isMenuItemResponse} from "./_types/type-guard";
import {MenuItem, MenuItemResponse} from "./_types/types";


const defaultMenuItemMapper = (item: MenuItemResponse): MenuItem => {
    return {
        id: item.ID,
        title: item.title,
        url: item.url,
        subMenuItems: [],
    };
}

export default function transformMenuResponse<T extends MenuItem>(
    response: any,
    mapper?: ((responseItem: MenuItemResponse) => T ) | undefined
): T[] {

    if (!Array.isArray(response)) return [];

    const items = response.filter(isMenuItemResponse);

    if(items.length === 0) return [];

    const sortedItems = items.sort((a, b) => {
        return a.menu_order - b.menu_order;
    });

    const menuItems: T[] = [];
    const childrenMap: { [parentId: number]: T[] } = {};
    const parentIds: number[] = [];
    sortedItems.forEach(item => {
        const menuItem = mapper ? mapper(item) : defaultMenuItemMapper(item) as T;

        menuItems.push({...menuItem});
        if (item.menu_item_parent === 0) {
            parentIds.push(menuItem.id);
            return;
        }

        if (!Array.isArray(childrenMap[item.menu_item_parent])) {
            childrenMap[item.menu_item_parent] = [];
        }
        childrenMap[item.menu_item_parent].push({...menuItem});
    });

    return menuItems.map(menuItem => {
        const children = childrenMap[menuItem.id] ? childrenMap[menuItem.id] : [];
        return {
            ...menuItem,
            subMenuItems: children,
        }
    }).filter(menuItem => {
        return parentIds.includes(menuItem.id);
    });
}