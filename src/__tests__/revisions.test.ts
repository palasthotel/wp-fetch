import {wpFetchRevision, wpFetchRevisions} from "../sources/revisions";
import {Authentication} from "../@types";

const wordpressTestUrl = "http://local.wp.palasthotel.de:8080/";

const authentication: Authentication = {
    username: "palasthotel",
    password: "0pRJ VjsR 78rr A1GL HNxp 6gpE",
}

it("Should return revisions", async ()=> {
    const response = await wpFetchRevisions(
        wordpressTestUrl,
        authentication,
        1,
    );

    expect(response.total).toBeGreaterThan(0);
});


it("Should return single revision", async ()=> {
    const response = await wpFetchRevision(
        wordpressTestUrl,
        authentication,
        {
            post: 1,
            revision: 42,
        },
    );

    expect(response).not.toBeNull();
});