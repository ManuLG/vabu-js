
export const notNull = (val : any) => val !== null
export const notEmpty = (val : any) => val?.length > 0
export const minLength = (min : Number) => (val : any) => val?.length >= min
export const maxLength = (max : Number) => (val : any) => val?.length <= max

export const email = (email : String) =>typeof email === 'string' &&  email?.toLowerCase()
.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export default {
    email,
    minLength,
    maxLength,
    notEmpty,
    notNull
}