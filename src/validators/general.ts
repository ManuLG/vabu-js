
export const notNull = (val : any) => val !== null
export const notEmpty = (val : any) => val?.length > 0
export const minLength = (min : Number) => (val : any) => val?.length >= min
export const maxLength = (max : Number) => (val : any) => val?.length <= max

export default {
    minLength,
    maxLength,
    notEmpty,
    notNull
}