# VabuJS

[![npm version](https://badge.fury.io/js/vabu-js.svg)](https://badge.fury.io/js/vabu-js)

## Description
VabuJS is a validation libray that allows you to build complex validations in an easy and clear way

## First steps

### Installation
Use your favourite package manager
```bash
npm install --save vabu-js
```

### Basic example
```javascript
import { ValidatorBuilder } from 'vabu-js'

const nameValidation = new ValidatorBuilder()
  .setValue('My awesome name')
  .notNull()
  .notEmpty()
  .validate()

  if (nameValidation.isValid()) {
    console.log(nameValidation.getErrorMessage())
  }
```

### Object validation
```javascript
import { ModelValidator, validators } from '../src/index'

        const obj = new ModelValidator()
          .setValue({
              name: 'M'
          })
          .setValidations({
            name: {
                validators.notNull,
                minLenght: validators.minLength(2)
            }
        })
          .validate()
```

## Examples
### Array validation
```javascript
const arrayValidation = new ValidatorBuilder()
  .setValue([1, 2, 3])
  .isArray()
  .each((val) => val > 2)
  .validate()

  if (!arrayValidation.isValid()) {
    alert(arrayValidation.getErrorMessage())
  }
```

### Custom validation
```javascript
const userValidation = new ValidatorBuilder()
  .setValue({ name: 'Jonh', age: 21 })
  .notNull()
  .customValidation(user => user.age >= 18)
  .validate()

  if (!userValidation.isValid()) {
    alert(userValidation.getErrorMessage())
  }
```
