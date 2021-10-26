
export const maxLengthCreator = (MaxLength: number) => (value: string | number | symbol) => {
    if (value && value.toString().length <= MaxLength) {
        return undefined
    }
    const error = `${MaxLength} is a max number of symbols here`
    console.log(error)
    return error
}
