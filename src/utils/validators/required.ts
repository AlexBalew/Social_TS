export const required = (value: unknown) => {
    if (value) {
        return undefined
    }
    const error = 'The field is empty'
    console.log(error)
    return error
}