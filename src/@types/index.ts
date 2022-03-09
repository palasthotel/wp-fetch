export type GetRequestArgs = {
    wordpressUrl: string
    path?: string
    args?: {
        [key: string]: string | string[] | number | number[]
    }
}

export type GetResponse = {
    data: unknown
    xWPTotal?: number
    xWPTotalPages?: number
}

// ------------------------------
// Post
// ------------------------------
export type PostId = number
export type PostSlug = string
export type AuthorId = number

export type GetPostByIdRequestArgs = GetRequestArgs & {
    args: {
        id: number
        type?: string
    }
}

export type GetPostBySlugRequestArgs = GetRequestArgs & {
    args: {
        slug: PostSlug
        type?: string
    }
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
    type: string
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
    permalink: string|false

    categories?:number[]
    tags?: number[]

    featured_media_url?: string|false

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

export type GetPostsRequestArgs = GetRequestArgs & {
    args?: {
        type?: string
        page?: number
        limit?: number
    }
}

export type PostsResponse = {
    posts: PostResponse[]
    total: number
    totalPages: number
}

export type Hierarchy<T> = {
    item: T
    children: Hierarchy<T>[]
}

// ------------------------------
// Menu
// ------------------------------
export type MenuSlug = string

export type GetMenuRequestArgs = GetRequestArgs & {
    args: {
        slug: MenuSlug
    }
}

export type MenuItemResponse = {
    ID: PostId
    post_author: number
    post_date: string,
    post_date_gmt: string
    post_content: string
    post_title: string
    post_excerpt: string
    post_status: string
    comment_status: string
    ping_status: string
    post_password: string
    post_name: string
    to_ping: string
    pinged: string
    post_modified: string
    post_modified_gmt: string
    post_content_filtered: string
    post_parent: number
    guid: string
    menu_order: number
    post_type: string
    post_mime_type: string
    comment_count: string
    filter: string
    db_id: number
    menu_item_parent: string
    object_id: number
    object: string
    type: string,
    type_label: string
    url: string
    title: string
    target: string
    attr_title: string
    description: string
    classes: string[]
    xfn: string
}


// ------------------------------
// WP_Term
// ------------------------------
export type TermId = number
export type TaxonomySlug = string

export type GetTermRequestArgs = GetRequestArgs & {
    args: {
        taxonomy: TaxonomySlug
        id: TermId
    }
}

export type TermResponse = {
    id: number
    count: number
    description: string
    name: string
    slug: string
    taxonomy: TaxonomySlug
    parent?: number
    meta: {
        [key: string]: string
    }
}

export type GetTermsRequestArgs = GetRequestArgs & {
    args: {
        taxonomy: TaxonomySlug
        include?: number[]
        hide_empty?: boolean
        per_page?: number
    }
}