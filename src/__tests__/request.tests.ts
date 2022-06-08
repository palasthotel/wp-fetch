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
        },{priority: 1}));

        await wpFetchGet({
            wordpressUrl: "test",
            path: "test",
            args: {
                page:1
            }
        });

        expect(params).toHaveProperty("page",1 );
        expect(params).toHaveProperty("test","works" );
    });

    it("Should respect priority", async () => {
        const order: string[] = [];
        useRequestIds.push(onRequest((config)=>{
            order.push("low");
            return config;
        }, {priority: 20}));
        useRequestIds.push(onRequest((config)=>{
            order.push("high");
            return config;
        }, {priority: 1}));
        useRequestIds.push(onRequest((config)=>{
            order.push("middle");
            return config;
        }, {priority: 10}));

        await wpFetchGet({
            wordpressUrl: "test",
            path: "test",
        });

        expect(order.length).toBe(3);
        expect(order).toEqual(["high","middle", "low"])
    });

    it("Should eject request interceptors", async () => {
        const order: string[] = [];
        useRequestIds.push(onRequest((config)=>{
            order.push("first");
            return config;
        }, {priority: 20}));
        const id = onRequest((config)=>{
            order.push("ignore");
            return config;
        }, {priority: 1});

        ejectRequest(id);

        await wpFetchGet({
            wordpressUrl: "test",
            path: "test",
        });

        expect(order.length).toBe(1);
        expect(order).toEqual(["first"])
    });
});