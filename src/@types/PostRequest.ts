import {
    AuthorId,
    PostId,
    PostSlug,
    PostType, TermId,
} from "./index";


export type GetPostsRequestArgs = {
    type?: PostType
    page?: number
    per_page?: number
    offset?: number
    search?: string
    after?: string
    author?: string
    author_exclude?: string
    before?: string
    exclude?: PostId | string
    include?: PostId | string
    order?: "asc" | "desc"
    orderby?: "date" | "author" | "id" | "include" |
        "modified" | "parent" | "relevance" | "slug" |
        "include_slugs" | "title"
    slug?: string
    status?: string
    tax_relation?: "AND" | "OR"
    categories?: TermId | string
    categories_exclude?: TermId | string
    tags?: string
    tags_exclude?: string
    sticky?: boolean
}

export type PostsResponse = {
    posts: PostResponse[]
    total: number
    totalPages: number
}

export type GetPostByIdRequestArgs = {
    id: PostId
    type?: PostType
}

export type GetPostBySlugRequestArgs = {
    slug: PostSlug
    type?: PostType
}

export type PostResponse = {
    id: PostId
    date: string
    date_gmt: string
    guid: {
        rendered: string
    }
    modified: string
    modified_gmt: string
    slug: PostSlug
    status: string
    type: PostType
    link: string
    title: {
        rendered: string
    }
    content: {
        rendered: string
        protected: boolean
    }
    excerpt: {
        rendered: string
        protected: boolean
    }
    author: AuthorId
    featured_media: number
    parent: PostId
    comment_status: string
    ping_status: string
    sticky: boolean
    template: string
    format: string
    meta: {
        [key: string]: string
    }
    permalink: string | false

    categories: number[]
    tags: number[]

    featured_media_url?: string | false

    _links: {
        [key: string]: {
            href: string
            embeddable?: boolean
            count?: number
            taxonomy?: string
            name?: string
        }[]
    }
}
