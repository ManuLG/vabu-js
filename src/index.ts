import GeneralConfig from './models/config/GeneralConfig'
import GeneralValidators from './validators/general'

import { ValidatorBuilder  } from './models/ValidatorBuilder'
import { ModelValidator  } from './models/ModelValidator'

const validators = {
    ...GeneralValidators
}

export {
    ModelValidator,
    ValidatorBuilder,
    GeneralConfig,
    validators
}
