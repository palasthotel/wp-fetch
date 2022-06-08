import {Hierarchy} from "../@types";
import {buildHierarchy} from "./index";
import {CommentResponse} from "../@types/Comments";

export function commentsAsHierarchy(
    comments: CommentResponse[]
): Hierarchy<CommentResponse>[] {
    return buildHierarchy<CommentResponse>(
        comments,
        (comment) => comment.id,
        (comment) => comment.parent > 0 ? comment.parent : false,
    );
}
