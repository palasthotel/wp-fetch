import {wpFetchTerms} from "../sources/terms";
import {wordpressTestUrl} from "./test-utils";


it("Should find some categories", async () => {
    const terms = await wpFetchTerms({
        wordpressUrl: wordpressTestUrl,
        args: {
            taxonomy: "categories"
        }
    });
    expect(terms.length).toBeGreaterThan(0);
});

it("Should find some tags", async () => {
    const terms = await wpFetchTerms({
        wordpressUrl: wordpressTestUrl,
        args: {
            taxonomy: "tags"
        }
    });
    expect(terms.length).toBeGreaterThan(0);
})

