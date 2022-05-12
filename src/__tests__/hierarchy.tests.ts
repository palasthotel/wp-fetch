import {buildHierarchy} from "../transformers";

it("Should return an empty list", ()=>{
    const list: object[] = [];
    const hierarchy = buildHierarchy(
        list,
        () => 0,
        ()=> false,
    );
    expect(hierarchy.length).toBe(0);
});

it("Should return simple hierarchy", ()=>{
    const list = [
        {
            title: "Sub 2",
            id: 13,
            parent: 2,
        },
        {
            title: "2",
            id: 2,
            parent: 0
        }
    ];
    const hierarchy = buildHierarchy(
        list,
        (item) => item.id,
        (item)=> item.parent ? item.parent : false,
    );
    expect(hierarchy.length).toBe(1);
    expect(hierarchy[0]).toHaveProperty("item");
    expect(hierarchy[0]).toHaveProperty("children");
    expect(hierarchy[0].item).toHaveProperty("title", "2");
    expect(hierarchy[0].children.length).toBe(1);
    expect(hierarchy[0].children[0]).toHaveProperty("item");
    expect(hierarchy[0].children[0]).toHaveProperty("children");

});