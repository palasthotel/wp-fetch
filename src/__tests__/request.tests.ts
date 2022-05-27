import {ejectRequest, onRequest, wpFetchGet} from "../sources/base";

describe('useRequest', function () {

    let useRequestIds: number[] = [];
    afterEach(()=>{
        useRequestIds.forEach(ejectRequest);
        useRequestIds = [];
    })

    it("Should add parameters", async ()=>{

        let params = {};
        useRequestIds.push(onRequest((config) => {
            params = config.params;
            return config;
        }));

        useRequestIds.push(onRequest((config) => {
            config.params = {...config?.params ?? {}, test:"works"};
            return config;
        }));

        await wpFetchGet({
            wordpressUrl: "test",
            path: "test",
            args: {
                page:1
            }
        });

        expect(params).toHaveProperty("page",1 );
        expect(params).toHaveProperty("test","works" );
    })
});