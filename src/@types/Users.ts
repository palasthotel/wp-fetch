import {EntityMeta, UserId, UserSlug} from "./general";

export type GetUsersRequestArgs = {
    page?: number
    per_page?: number
    search?: string
    exclude?: string
    include?: string
    offset?: number
    order?:"asc" | "desc"
    orderby?: "id"| "include"| "name"| "registered_date"| "slug" | "include_slugs"| "email" | "url"
    slug?: string
    roles?: string
}

export type UsersResponse<T extends UserResponse> = {
    users: T[]
    total: number
    totalPages: number
}

export type UserResponse = {
    id: UserId
    name: string
    url: string
    description: string
    link: string
    slug: UserSlug
    avatar_urls: Record<string, string>
    meta: EntityMeta
    _links: {
        [key: string]: {
            href: string
        }[]
    }
}