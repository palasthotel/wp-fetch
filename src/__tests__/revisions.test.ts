import {wpFetchRevision, wpFetchRevisions} from "../sources/revisions";
import {Authentication, WordPressAuthenticatedUrl} from "../@types";

const url: WordPressAuthenticatedUrl = {
    url: "http://local.wp.palasthotel.de:8080/",
    auth: {
        username: "palasthotel",
        password: "0pRJ VjsR 78rr A1GL HNxp 6gpE",
    }
}

it("Should return revisions", async ()=> {
    const response = await wpFetchRevisions(
        url,
        1,
    );

    expect(response.total).toBeGreaterThan(0);
});


it("Should return single revision", async ()=> {
    const response = await wpFetchRevision(
        url,
        {
            post: 1,
            revision: 42,
        },
    );

    expect(response).not.toBeNull();
});