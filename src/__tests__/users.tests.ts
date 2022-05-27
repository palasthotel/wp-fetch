import {wpFetchUsers} from "../sources/users";
import {ejectRequest, onRequest} from "../sources/base";


describe('wpFetchUsers', function () {

    let id  = 0;
    afterEach(() => {
        ejectRequest(id);
    });

    describe("when API call is successful", () => {

        const url = "https://digitale-pracht.de";
        it("Should should return users", async () => {

            let requestUrl = ""
            onRequest((config) => {
                requestUrl = config.url ?? "";
                return config;
            });
            const response = await wpFetchUsers(url);
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/users`);
            expect(response.total).toBeGreaterThan(0);
        });
    });

});
