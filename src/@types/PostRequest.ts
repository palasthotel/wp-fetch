import {
    AuthorId,
    PostId,
    PostSlug,
    PostType,
} from "./index";


export type GetPostsRequestArgs = {
    type?: string
    page?: number
    limit?: number
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

    categories?: number[]
    tags?: number[]

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
