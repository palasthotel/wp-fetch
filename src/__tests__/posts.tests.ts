import * as fs from "fs";
import {wpFetchPostById, wpFetchPosts, wpFetchPostsBySlug} from "../sources/posts";
import {buildHierarchy} from "../transformers";
import {PostResponse} from "../@types";
import {ejectRequest, onRequest} from "../sources/base";

describe('wpFetchPosts', function () {

    let id = 0;
    afterEach(() => {
        ejectRequest(id);
    });

    describe("when API call is successful", () => {

        const url = "https://digitale-pracht.de";
        it("Should should return posts", async () => {

            let requestUrl = ""
            id = onRequest((config) => {
                requestUrl = config.url ?? "";
               return config;
            });
            const response = await wpFetchPosts(url);
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/posts`);
            expect(response.total).toBeGreaterThan(0);
        });
        it("Should should return posts by category", async () => {

            let requestUrl = ""
            let params = {};
            id = onRequest((config) => {
                requestUrl = config.url ?? "";
                params = config.params;
                return config;
            });
            const response = await wpFetchPosts(url, {
                categories: 1
            });
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/posts`);
            expect(params).toEqual({
                page: 1,
                per_page: 10,
                categories: 1,
            });
            expect(response.total).toBeGreaterThan(0);
        });
        it("Should should return posts by tags", async () => {

            let requestUrl = ""
            let params = {};
            id = onRequest((config) => {
                requestUrl = config.url ?? "";
                params = config.params;
                return config;
            });
            const response = await wpFetchPosts(url, {
                tags: "25, 105",
            });
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/posts`);
            expect(params).toEqual({
                page: 1,
                per_page: 10,
                tags: "25, 105",
            });
            expect(response.total).toBeGreaterThan(0);
            for(let post of response.posts){
                expect(post.tags.includes(25) || post.tags.includes(105)).toBeTruthy();
            }
        });

        it("Should include single post by id", async () => {
            let requestUrl = ""
            let params = {};
            id = onRequest((config) => {
                requestUrl = config.url ?? "";
                params = config.params;
                return config;
            });
            const response = await wpFetchPosts(url, {
                include: "2339, 2"
            });
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/posts`);
            expect(params).toEqual({
                page: 1,
                per_page: 10,
                include: "2339, 2",
            });
            expect(response.posts.length).toBe(1);
            expect(response.posts[0].title.rendered).toBe("Urlaubsarchitektur");
        })
    });

    const url = "https://digitale-pracht.de";
    it("Should find the page by id", async () => {
        const post = await wpFetchPostById(url, {
            id: 565,
            type: "pages"
        });
        expect(post).not.toBeNull();
    });

    it("Should find the page by slug", async () => {
        const posts = await wpFetchPostsBySlug(url, {
            slug: "impressum",
            type: "pages"
        });
        expect(posts.total).toBeGreaterThanOrEqual(1);
        expect(posts.posts[0]?.title?.rendered).toBe("Impressum");
    });

    it("Should fetch from with tax query syntax", async () => {
        const response = await  wpFetchPosts(url,{
            categories: { operator: 'AND', terms: 1 },
            page: 1,
            per_page: 20,
            tags: { operator: 'AND', terms: 55 },
            type: 'posts'
        });

        expect(response.posts.length).toBeGreaterThan(0);
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
});