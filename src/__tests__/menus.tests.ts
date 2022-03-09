import {isMenuItemResponse} from "../@types/type-guard";
import * as fs from "fs";

describe('Type-Guard', () => {

    const menu = JSON.parse(
        fs.readFileSync(__dirname+"/data/menu.json", 'utf8')
    );

    it('Should be no menu item response', ()=>{
        expect(isMenuItemResponse({})).toBeFalsy();
    });
    it("Should be a menu item response", ()=>{
        expect(Array.isArray(menu)).toBeTruthy()
        menu.forEach( (item: any) => {
            expect(isMenuItemResponse(item)).toBeTruthy();
        });
    });

});