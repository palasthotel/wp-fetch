export type GetRequest = {
    wordpressUrl: string
    path?: string
    args?: Record<string, string | string[] | number | number[]>
}

export type GetResponse<T> = {
    data: T
    xWPTotal?: number
    xWPTotalPages?: number
}