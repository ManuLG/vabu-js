import { ValidatorBuilder } from '../src/index'
import { MissingValueException } from '../src/models/exceptions/MissingValueException'
import { UnexpectedPromise } from '../src/models/exceptions/UnexpectedPromise'
import { minLength } from '../src/validators/general'

describe('Basic testing', () => {
    it ('Object creation', () => {
        const obj = new ValidatorBuilder()

        expect(obj).toBeInstanceOf(ValidatorBuilder)
    })


    // TODO Add more comprobations to ensure that the clone is done properly
    it ('Object clone', () => {
        const obj = new ValidatorBuilder()
        const obj2 = obj.clone()

        expect(obj2).toBeInstanceOf(ValidatorBuilder)
    })

    it ('Custom error message', () => {
        const obj = new ValidatorBuilder()
          .setValue(null)
          .notNull({ errorMessage: 'custom'})
          .validate()

          console.log(obj.getErrorMessageList())

        expect(obj.getErrorMessage()).toBe('custom')
    })

    it ('Custom error message', () => {
        const obj = new ValidatorBuilder()
          .setValue(null)
          .setDefaultErrorMessage('')
          .notNull({ errorMessage: ''})
          .validate()

        expect(obj.getErrorMessage()).toBe('')
    })

    it ('Valid async validator', () => {
        return new ValidatorBuilder()
          .setValue('1')
          .notNull()
          .customValidation(() => {
              return new Promise((resolve) => {
                  setTimeout(() => resolve(true), 500)
              })
          })
          .validateAsync()
          .then((result) => {
            expect(result.isValid()).toBe(true)
          })
    })

    it ('Invalid async validator', () => {
        return new ValidatorBuilder()
          .setValue('1')
          .notNull()
          .customValidation(() => {
              return new Promise((resolve) => {
                  setTimeout(() => resolve(false), 500)
              })
          })
          .validateAsync()
          .then((result) => {
            expect(result.isValid()).toBe(false)
          })
    })

    it ('Validate a promise using sync method', () => {
        const obj = new ValidatorBuilder()
          .setValue('1')
          .notNull()
          .customValidation(() => {
              return new Promise((resolve) => {
                  setTimeout(() => resolve(false), 500)
              })
          })

          expect(() => {
            obj.validate()
          }).toThrow(UnexpectedPromise)
    })

    it ('Missing value', () => {
        const obj = new ValidatorBuilder()
          .notNull()

          expect(() => {
            obj.validate()
          }).toThrow(MissingValueException)
    })

    it ('Missing value async', () => {
        const obj = new ValidatorBuilder()
          .notNull()
          .validateAsync()

          .catch(err => {
              expect(err).toBeInstanceOf(MissingValueException)
          })
    })

    it ('Return on first error', () => {
        const obj = new ValidatorBuilder({ returnOnFirstError: true })
          .setValue('')
          .notEmpty()
          .minLength(2)
          .validate()

          console.log(obj.getErrorMessageList())

        expect(obj.getErrorMessageList().length).toBe(1)
    })

    it ('Not return on first error', () => {
        const obj = new ValidatorBuilder({ returnOnFirstError: false })
          .setValue('')
          .notEmpty()
          .minLength(2)
          .validate()

          console.log('2', obj.getErrorMessageList())


        expect(obj.getErrorMessageList().length).toBe(2)
    })

    it ('Empty errorMessageList on successful validation', () => {
        const obj = new ValidatorBuilder()
          .setValue('1234')
          .notEmpty()
          .minLength(2)
          .validate()

          console.log('1', obj.getErrorMessageList())

        expect(obj.getErrorMessageList().length).toBe(0)
    })
})

describe('NOT NULL', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, result: false},
        { value: undefined, result: true},
        { value: '', result: true},
        { value: 'asd', result: true},
        { value: [], result: true},
        { value: [1, 2, 3], result: true}
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value`, () => {
            validator.setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }

    beforeEach(() => {
        validator = new ValidatorBuilder()
          .notNull()
    })

})

describe('NOT EMPTY', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, result: false},
        { value: undefined, result: false},
        { value: '', result: false},
        { value: 'asd', result: true},
        { value: [], result: false},
        { value: [1, 2, 3], result: true}
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value`, () => {
            validator.setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }

    beforeEach(() => {
        validator = new ValidatorBuilder()
          .notEmpty()
    })
})

describe('Min length validator', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, param:2, result: false},
        { value: undefined, param: 2, result: false},
        { value: undefined, param: undefined, result: false},
        { value: undefined, param: null, result: false},
        { value: '', param:2, result: false},
        { value: 'asd', param:2, result: true},
        { value: [], param:2, result: false},
        { value: [1], param:2, result: false},
        { value: [1, 2], param:2, result: true},
        { value: [1, 2, 3], param:2, result: true}
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value, ${valueObj.param} param`, () => {
            validator = new ValidatorBuilder().minLength(valueObj.param).setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }
})

describe('Max length validator', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, param:2, result: false},
        { value: undefined, param: 2, result: false},
        { value: undefined, param: undefined, result: false},
        { value: undefined, param: null, result: false},
        { value: '', param:2, result: true},
        { value: 'asd', param:2, result: false},
        { value: [], param:2, result: true},
        { value: [1], param:2, result: true},
        { value: [1, 2], param:2, result: true},
        { value: [1, 2, 3], param:2, result: false}
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value, ${valueObj.param} param`, () => {
            validator = new ValidatorBuilder().maxLength(valueObj.param).setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }
})

describe('Custom validator', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, param: (val : any) => val === null, result: true},
        { value: undefined, param: (val : any) => val === null, result: false}
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value, ${valueObj.param} param`, () => {
            validator = new ValidatorBuilder().customValidation(valueObj.param).setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }
})

describe('Each validator', () => {

    let validator : ValidatorBuilder
    const valuesToBeTested : any[] = [
        { value: null, param: (val : any) => val === null, result: false},
        { value: undefined, param: (val : any) => val === null, result: false},
        { value: '', param: (val : any) => val > 1, result: false},
        { value: '2', param: (val : any) => val > 1, result: false},
        { value: [], param: (val : any) => val > 1, result: true},
        { value: [2, 3, 5], param: (val : any) => val > 1, result: true},
    ]

    for (const valueObj of valuesToBeTested) {
        it (`${valueObj.value} value, ${valueObj.param} param`, () => {
            validator = new ValidatorBuilder().each(valueObj.param).setValue(valueObj.value).validate()
            expect(validator.isValid()).toBe(valueObj.result)
        })
    }
})
