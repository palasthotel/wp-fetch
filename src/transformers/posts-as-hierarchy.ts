import {Hierarchy, PostResponse} from "../@types";
import buildHierarchy from "./hierarchy";

export default function postsAsHierarchy(
    posts: PostResponse[]
): Hierarchy<PostResponse>[] {
    return buildHierarchy<PostResponse>(
        posts,
        (post) => post.id,
        (post) => post.parent > 0 ? post.parent : false,
    );
}
