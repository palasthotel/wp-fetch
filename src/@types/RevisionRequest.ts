import {
    AuthorId,
    PostId,
    PostSlug,
    PostType, RevisionId, RevisionSlug, TermId,
} from "./index";


export type GetRevisionsRequestArgs = {
    type?: PostType
    page?: number
    per_page?: number
    offset?: number
    exclude?: PostId | string
    include?: PostId | string
    order?: "asc" | "desc"
    orderby?: "date" | "id" | "include" | "relevance" | "slug" |
        "include_slugs" | "title"
}

export type RevisionsResponse<T extends RevisionResponse> = {
    revisions: T[]
    total: number
    totalPages: number
}

export type GetRevisionRequestArgs = {
    type?: PostType
    post: PostId
    revision: RevisionId
}

export type RevisionResponse = {
    id: RevisionId
    date: string
    date_gmt: string
    guid: {
        rendered: string
    }
    modified: string
    modified_gmt: string
    parent: PostId
    slug: RevisionSlug
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
