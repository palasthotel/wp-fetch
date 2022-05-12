export const isArrayOfStrings = (data: unknown): data is string[] => {
    return Array.isArray(data) &&
        data.filter(item => typeof item !== "string").length === 0;
}
