import { ModelValidator, ValidatorBuilder } from '../src/index'
import { minLength, notEmpty, notNull } from '../src/validators/general'

import { MissingValidationException } from '../src/models/exceptions/MissingValidationException'
import { MissingValueException } from '../src/models/exceptions/MissingValueException'

describe('Basic testing', () => {
    it ('Object creation', () => {
        const obj = new ModelValidator()

        expect(obj).toBeInstanceOf(ModelValidator)
    })

    it ('Missing value', () => {
      const obj = new ModelValidator()

      expect(() => {
        obj.validate()
      }).toThrow(MissingValueException)
  })

    it ('Missing validation object', () => {
      const obj = new ModelValidator().setValue(null)

      expect(() => {
        obj.validate()
      }).toThrow(MissingValidationException)
  })

    it ('Basic model', () => {
        const obj = new ModelValidator()
          .setValue({
              name: 'M'
          })
          .setValidations({
            name: {
                notNull,
                minLenght: minLength(2)
            }
        })
          .validate()

          expect(obj.isValid()).toBe(false)
          expect(obj.getValidationResult().name).toHaveLength(1)
    })

    it ('Basic model with ValidationVuilder', () => {
        const obj = new ModelValidator()
          .setValue({
              name: 'M'
          })
          .setValidations({
            name: new ValidatorBuilder().notNull().notEmpty().minLength(2)
        })
          .validate()

          expect(obj.isValid()).toBe(false)
    })

    it ('Basic model with array', () => {
        const obj = new ModelValidator()
          .setValue({
              name: 'M'
          })
          .setValidations({
            name: [notNull, notEmpty, minLength(2)]
        })
          .validate()

          expect(obj.isValid()).toBe(false)
    })
})
