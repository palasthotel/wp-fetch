
export type Authentication = {
    username: string
    password: string
}

export type GetRequest = {
    wordpressUrl: string
    path?: string
    args?: Record<string, string | string[] | number | number[] | boolean>
    auth?: Authentication
}

export type GetResponse<T> = {
    data: T
    xWPTotal?: number
    xWPTotalPages?: number
}