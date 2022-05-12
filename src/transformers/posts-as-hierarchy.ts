import {Hierarchy, PostResponse} from "../@types";
import {buildHierarchy} from "./index";

export function postsAsHierarchy(
    posts: PostResponse[]
): Hierarchy<PostResponse>[] {
    return buildHierarchy<PostResponse>(
        posts,
        (post) => post.id,
        (post) => post.parent > 0 ? post.parent : false,
    );
}
