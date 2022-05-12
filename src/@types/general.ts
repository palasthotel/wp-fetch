export type PostId = number
export type PostSlug = string
export type PostType = string
export type AuthorId = number
export type MenuSlug = string
export type TermId = number
export type TaxonomySlug = string

export type Hierarchy<T> = {
    item: T
    children: Hierarchy<T>[]
}