import GeneralConfig from './/config/GeneralConfig'
import DefaultConfig from '../config'

import { ValidatorBuilder } from './ValidatorBuilder'
import { MissingValidationException } from './exceptions/MissingValidationException'
import { MissingValueException } from './exceptions/MissingValueException'

export class ModelValidator {
    #value : any
    #valueHasBeenSet : boolean = false
    #validationObject : any
    #validationResultObject : any

    #currentConfig: GeneralConfig

    constructor (config? : GeneralConfig) {
        this.#currentConfig = {
            ...DefaultConfig,
            ...config
        }
    }

    setValidations (validations: any) : ModelValidator {
        this.#validationObject = validations
        return this
    }

    validate () : ModelValidator {
        if (!this.#valueHasBeenSet) throw new MissingValueException()

        if (typeof this.#validationObject !== 'object') {
            throw new MissingValidationException()
        }
        
        const resultObject = {} as any
        const fields = Object.keys(this.#validationObject)

        for (const field of fields) {
            resultObject[field] = []
            const fieldValidationObject = this.#validationObject[field]

            if (fieldValidationObject instanceof ValidatorBuilder) {
                const validationResult = fieldValidationObject.setValue(this.#value[field]).validate()

                if (!validationResult.isValid()) {
                    resultObject[field] = validationResult.getErrorMessageList()
                }
            } else if (Array.isArray(fieldValidationObject)) {
                for (const validation of fieldValidationObject) {
                    const validationResult = validation(this.#value[field])
    
                    if (!validationResult) {
                        resultObject[field].push(this.#currentConfig.defaultErrorMessage)
                    }
                }
            } else {
                for (const validationKey of Object.keys(fieldValidationObject)) {
                    const validation = fieldValidationObject[validationKey]
    
                    const validationResult = validation(this.#value[field])
    
                    if (!validationResult) {
                        resultObject[field].push(this.#currentConfig.defaultErrorMessage)
                    }
                }
            }
        }

        this.#validationResultObject = resultObject

        return this
    }

    getValidationResult () : any {
        return this.#validationResultObject
    }

    setValue (value : any) : ModelValidator {
        this.#value = value
        this.#valueHasBeenSet = true
        return this
    }

    isValid () : boolean {
        return Object.keys(this.#validationResultObject).every((validationResultItemKey) => this.#validationResultObject[validationResultItemKey].length === 0)
    }
}