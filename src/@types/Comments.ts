import {AuthorId, ComaSeparatedIds, CommentId, Context, EntityMeta, PostId, PostType, UserId} from "./general";

export type GetCommentsRequestArgs = {
    context?: Context
    page?: number
    per_page?: number
    search?: string
    after?: string
    author?: UserId
    author_exclude?: UserId | ComaSeparatedIds
    author_email?: string
    before?: string
    exclude?: CommentId | ComaSeparatedIds
    include?: CommentId | ComaSeparatedIds
    offset?: number
    order?: "asc" | "desc"
    orderby?:  "date" | "date_gmt" | "id" | "include" | "post" | "parent" | "type"
    parent?: CommentId | ComaSeparatedIds
    parent_exclude?: CommentId | ComaSeparatedIds
    post?: PostId
    status?: string
    type?: string
    password?: string
}

export type GetCommentRequestArgs = {
    id: CommentId
    context?: Context
    password?: string
}

export type CommentResponse = {
    id: CommentId
    author: AuthorId
    author_name: string
    author_url: string
    content: {
        rendered: string
    }
    date: string
    date_gmt: string
    link: string
    parent: CommentId
    post: PostId
    status: string
    type: string
    author_avatar_urls: {
        [size: string]: string
    }
    meta: EntityMeta
    _links: {
        [key: string]: {
            href: string
            embeddable?: boolean
            post_type?: PostType
            count?: number
            taxonomy?: string
            name?: string
        }[]
    }
}

export type CommentEditResponse = CommentResponse & {
    author_email: string
    author_ip: string
    author_user_agent: string
}

export type CommentsResponse<T extends CommentResponse> = {
    comments: T[]
    total: number
    totalPages: number
}