import {
  alphaDashValidator,
  lengthValidator,
  urlValidator,
  alphaValidator,
  regexValidator,
  integerValidator,
  betweenValidator,
  confirmedValidator,
  passwordValidator,
  emailValidator,
  requiredValidator
} from "@core/utils/validators"


const computeValidation = (validation, value) => {
  let validators= [];
  for (let key of validation) {
    if (typeof (key) == "string") {
      if (key == "required") {
        validators.push(requiredValidator)
      }
      if (key == "email") {
        validators.push(emailValidator)
      }
      if (key == "password") {
        validators.push(passwordValidator)
      }
      if (key == "integer") {
        validators.push(integerValidator)
      }
      if (key == "alpha") {
        validators.push(alphaValidator)
      }
      if (key == "url") {
        validators.push(urlValidator)
      }
      if (key == "alphadash") {
        validators.push(alphaDashValidator)
      }
    } else if (typeof (key) == "object") {
      if (key.type == "between") {
        validators.push(betweenValidator(value, key.min, key.max))
      }
      if (key.type == "length") {
        validators.push(lengthValidator(value, key.max));
      }
    }
  }
  return validators
}


export default computeValidation