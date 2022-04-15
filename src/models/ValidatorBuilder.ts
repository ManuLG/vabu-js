import ValidatorConfig from './config/ValidatorConfig'
import GeneralConfig from './config/GeneralConfig'
import DefaultConfig from '../config'

import { MissingValueException } from './exceptions/MissingValueException'
import { UnexpectedPromise } from './exceptions/UnexpectedPromise'

import GeneralValidators from '../validators/general'

export class ValidatorBuilder {
    #value : any
    #valueHasBeenSet : boolean = false
    validatorsList : Function[] = []
    #errorMessageArray : String[] = []

    #valid : boolean | null = null
    #currentErrorList : String[] = []

    #currentConfig: GeneralConfig

    constructor (config? : GeneralConfig) {
        this.#currentConfig = {
            ...DefaultConfig,
            ...config
        }
    }

    notNull (config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation(GeneralValidators.notNull, config)
    }

    notEmpty (config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation(GeneralValidators.notEmpty, config)
    }

    minLength (minLength : Number, config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation(GeneralValidators.minLength(minLength), config)
    }

    maxLength (maxLength : Number, config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation(GeneralValidators.maxLength(maxLength), config)
    }

    each (customFunction : Function, config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation((val : any) => {
            if (Array.isArray(val)) {
                // @ts-ignore
                return val.every(customFunction)
            } else {
                return false
            }
            
        }, config)
    }

    customValidation (customFunction : Function, config? : ValidatorConfig) : ValidatorBuilder {
        return this.genericValidation(customFunction, config)
    }

    async validateAsync () : Promise<ValidatorBuilder> {
        if (!this.#valueHasBeenSet) throw new MissingValueException()

        this.#resetState()

        for (let index = 0; index < this.validatorsList.length; index++) {
            const currentValidation = this.validatorsList[index]
            const currentValidationResult = await currentValidation(this.#value)

            if (!currentValidationResult) {
                this.#valid = false
                this.#currentErrorList.push(this.#errorMessageArray[index])

                if (this.#currentConfig.returnOnFirstError) {
                    return this
                }
            }
        }

        // To ensure that the value is "false" and not a falsy one
        if (this.#valid === null) {
            this.#valid = true
        }

        return this
    }

    validate () : ValidatorBuilder {
        if (!this.#valueHasBeenSet) throw new MissingValueException()

        this.#resetState()
        
        for (let index = 0; index < this.validatorsList.length; index++) {
            const currentValidation = this.validatorsList[index]
            const currentValidationResult = currentValidation(this.#value)

            const isPromise = currentValidationResult instanceof Promise

            if (isPromise) {
                throw new UnexpectedPromise()
            }

            if (!currentValidationResult) {
                this.#valid = false
                this.#currentErrorList.push(this.#errorMessageArray[index])

                if (this.#currentConfig.returnOnFirstError) {
                    return this
                }
            }
        }

        // To ensure that the value is "false" and not a falsy one
        if (this.#valid === null) {
            this.#valid = true
        }

        return this
    }

    // Setters
    setValue (val : any) : ValidatorBuilder {
        this.#value = val
        this.#valueHasBeenSet = true
        return this
    }

    setValidators (validators : Function[]) : ValidatorBuilder {
        this.validatorsList = validators
        return this
    }

    setDefaultErrorMessage (message : string) : ValidatorBuilder {
        this.#currentConfig.defaultErrorMessage = message
        return this
    }

    setErrorMessageArray (errorMessageArray : String[]) : ValidatorBuilder {
        this.#errorMessageArray = errorMessageArray
        return this 
    }

    // Getters
    isValid () : boolean {
        return this.#valid || false
    }

    getErrorMessage () : String {
        return this.#currentErrorList.length > 0 ? (this.#currentErrorList[0]) : ''
    }

    getErrorMessageList () : String[] {
        return this.#currentErrorList
    }

    // Helpers
    genericValidation (validationFunction : Function, config? : ValidatorConfig) : ValidatorBuilder {
        this.validatorsList.push(validationFunction)
        this.#errorMessageArray.push(config?.errorMessage || this.#currentConfig.defaultErrorMessage || '')
        return this
    }

    clone(): ValidatorBuilder {
        return new ValidatorBuilder(this.#currentConfig)
          .setValue(this.#value)
          .setValidators([...this.validatorsList])
          .setErrorMessageArray([...this.#errorMessageArray])
    }

    /**
     * Helper method for clearing the current validation state
     */
    #resetState : Function =  () : void => {
        this.#valid = null
        this.#currentErrorList = []
    }


}