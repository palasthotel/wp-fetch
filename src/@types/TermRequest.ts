import {PostId, TaxonomySlug, TermId,} from "./index";

export type TermsResponse<T extends TermResponse> = {
    terms: T[]
    total: number
    totalPages: number
}

export type TermResponse = {
    id: TermId
    count: number
    description: string
    name: string
    slug: string
    taxonomy: TaxonomySlug
    parent?: TermId
    meta: Record<string, string|string[]|number|number[]>
}

export type GetTermRequestArgs = {
    id: TermId
    taxonomy?: TaxonomySlug
}

export type GetTermsRequestArgs = {
    taxonomy?: TaxonomySlug
    search?: string
    include?: TermId | string
    exclude?: TermId | string
    hide_empty?: boolean
    page?: number
    per_page?: number
    order?: "asc" | "desc"
    orderby?: "name" | "id" | "include" | "slug" | "include_slugs" | "term_group" | "description" | "count"
    post?: PostId
    slug?: string
}