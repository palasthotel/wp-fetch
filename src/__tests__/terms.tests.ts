import {wpFetchTerms} from "../sources/terms";


describe('fetch terms', () => {
    const wordpressTestUrl = "http://local.wp.palasthotel.de:8080/";

    it("categories", async () => {

        const response = await wpFetchTerms(wordpressTestUrl,{
            taxonomy:'categories'

        });
        expect(response.terms.length).toBeGreaterThan(0);
    });

    it("Should find some tags", async () => {
        const response = await wpFetchTerms(wordpressTestUrl,{
            taxonomy: "tags"
        });
        expect(response.terms.length).toBeGreaterThan(0);
    })

    // it("Project specific", async () => {
    //     const terms = await wpFetchTerms("https://www.zentralplus.ch/",{
    //         taxonomy: "zen_event_location",
    //     });
    //     expect(terms.length).toBeGreaterThan(0);
    // })

})

