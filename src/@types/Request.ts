export type GetRequest = {
    wordpressUrl: string
    path?: string
    args?: Record<string, string | string[] | number | number[] | boolean>
}

export type GetResponse<T> = {
    data: T
    xWPTotal?: number
    xWPTotalPages?: number
}