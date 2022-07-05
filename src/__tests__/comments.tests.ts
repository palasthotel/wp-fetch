import fs from "fs";
import {commentsAsHierarchy} from "../transformers";
import {CommentResponse} from "../@types";

describe('transform comments', function () {
    it("Should transform to hierarchy", async () => {
        const response: CommentResponse[] = JSON.parse(
            fs.readFileSync(__dirname + "/data/comments.json", 'utf8')
        );
        expect(response.length).toBe(24);
        const hierarchy = commentsAsHierarchy(response);
        expect(hierarchy.length).toBe(8);
        expect(hierarchy[0].children.length).toBe(0);
        expect(hierarchy[1].children.length).toBe(1);
        expect(hierarchy[2].children.length).toBe(1);
        expect(hierarchy[3].children.length).toBe(0);
        expect(hierarchy[4].children.length).toBe(7);
        expect(hierarchy[5].children.length).toBe(2);
        expect(hierarchy[6].children.length).toBe(1);
        expect(hierarchy[7].children.length).toBe(4);
    });
});