export type PostId = number
export type PostSlug = string
export type PostType = string
export type RevisionId = number
export type RevisionSlug = string
export type UserId = number
export type UserSlug = string
export type AuthorId = UserId
export type CommentId = number
export type ComaSeparatedIds = string

export type TermId = number
export type TaxonomySlug = string

export type EntityMeta = Record<string, string|string[]|number|number[]>

export type Context = "view" | "embed" | "edit"

export type Hierarchy<T> = {
    item: T
    children: Hierarchy<T>[]
}