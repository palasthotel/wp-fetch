import {wpFetchPostById, wpFetchPosts, wpFetchPostsBySlug} from "../sources/posts";
import {wordpressTestUrl} from "./test-utils";
import buildHierarchy from "../transformers/hierarchy";

describe('Fetch posts', function () {
    it("Should find some posts", async () => {
        const posts = await wpFetchPosts({
            wordpressUrl: wordpressTestUrl
        });
        expect(posts.total).toBeGreaterThan(0);
    })


    it("Should find the page by id", async () => {
        const post = await wpFetchPostById({
            wordpressUrl: wordpressTestUrl,
            args: {
                id: 2,
                type: "pages"
            }
        });
        expect(post).not.toBeNull();
    });

    it("Should find the page by slug", async () => {
        const posts = await wpFetchPostsBySlug({
            wordpressUrl: wordpressTestUrl,
            args: {
                slug: "sample-page",
                type: "pages"
            }
        });
        expect(posts.total).toBeGreaterThanOrEqual(1);
        expect(posts.posts[0]?.title?.rendered).toBe("Sample Page");
    });

});

describe('transform posts', ()=>{
    it("Should transform to hierarchy", async ()=>{
       const response = await wpFetchPosts({
           wordpressUrl: wordpressTestUrl,
           args: {
               type: "pages"
           }
       });
       const hierarchy = buildHierarchy(
           response.posts,
           (p) => p.id,
           (p) => p.parent > 0 ? p.parent : false
       );
       expect(hierarchy.length).toBe(1);
    });
})
