import {AxiosRequestConfig} from "axios";
import {wpFetchUsers} from "../sources/users";
import {getAxios} from "../sources/base";

type AxiosTestInterceptor = (config: AxiosRequestConfig) => void

let interceptor: AxiosTestInterceptor|null = null
const setInterceptor = (fn: AxiosTestInterceptor) => {
    interceptor = fn;
}
const resetInterceptor = () => {
    interceptor = null;
}

getAxios().interceptors.request.use((config) => {
    interceptor?.(config);
    return config;
})

describe('wpFetchUsers', function () {

    beforeEach(() => {
        resetInterceptor();
    });

    describe("when API call is successful", () => {

        const url = "https://digitale-pracht.de";
        it("Should should return users", async () => {

            let requestUrl = ""
            setInterceptor((config) => {
                requestUrl = config.url ?? "";
            });
            const response = await wpFetchUsers(url);
            expect(requestUrl).toBe(`${url}/wp-json/wp/v2/users`);
            expect(response.total).toBeGreaterThan(0);
        });
    });

});
