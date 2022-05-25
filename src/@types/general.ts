export type PostId = number
export type PostSlug = string
export type PostType = string
export type RevisionId = number
export type RevisionSlug = string
export type UserId = number
export type UserSlug = string
export type AuthorId = UserId
export type MenuSlug = string
export type TermId = number
export type TaxonomySlug = string

export type Hierarchy<T> = {
    item: T
    children: Hierarchy<T>[]
}