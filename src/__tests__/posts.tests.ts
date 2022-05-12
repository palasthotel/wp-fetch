import * as fs from "fs";
import {wpFetchPostById, wpFetchPosts, wpFetchPostsBySlug} from "../sources/posts";
import {buildHierarchy} from "../transformers";
import {PostResponse} from "../@types";



describe('Fetch posts', function () {

    const wordpressTestUrl = "http://local.wp.palasthotel.de:8080/";

    it("Should find some posts", async () => {
        const posts = await wpFetchPosts(wordpressTestUrl);
        expect(posts.total).toBeGreaterThan(0);
    })


    it("Should find the page by id", async () => {
        const post = await wpFetchPostById(wordpressTestUrl, {
            id: 2,
            type: "pages"
        });
        expect(post).not.toBeNull();
    });

    it("Should find the page by slug", async () => {
        const posts = await wpFetchPostsBySlug(wordpressTestUrl, {
            slug: "sample-page",
            type: "pages"
        });
        expect(posts.total).toBeGreaterThanOrEqual(1);
        expect(posts.posts[0]?.title?.rendered).toBe("Sample Page");
    });

});

describe('transform posts', () => {
    it("Should transform to hierarchy", async () => {
        const response: PostResponse[] = JSON.parse(
            fs.readFileSync(__dirname + "/data/pages.json", 'utf8')
        );
        const hierarchy = buildHierarchy(
            response,
            (p) => p.id,
            (p) => p.parent > 0 ? p.parent : false
        );
        expect(hierarchy.length).toBe(2);
        expect(hierarchy[0].children.length).toBe(0);
        expect(hierarchy[1].children.length).toBe(1);
    });
})
