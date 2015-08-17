/* jshint esnext: true */

import _ from 'underscore';
import { Schema } from './schema';
import { validations, validationErrors }  from './validations.js';
import { Utils } from './string_utils.js';

class ModelValidator {
  constructor(validators){
    this.validators = validators;
  }

  validate(modelName, data){
    let fields = _.keys(this.validators[modelName]); 
    let errors = {};
    let prepareErrors = (modelName) => { if(!errors[modelName]) errors[modelName] = {}; };
    let prepareErrorField = (modelName, field) => { errors[modelName][field] = errors[modelName][field] || []; };

    _.each(fields, (field) => {
      let splitValidators  = this.validators[modelName][field].split('|');

      _.each(splitValidators, (validator) => {
        validator = validator.trim();

        let fn;
        let result;
        if(Utils.contains(validator, '^')){
          let operands = validator.split('=>');
          //operand[0] is the function to call
          //operand[1] becomes the argument
          fn = validations[operands[0]];
          result = fn(data[field], operands[1]);

          if (result === false) {
            prepareErrors(modelName); 
            prepareErrorField(modelName, field);
            let errFn = operands[0];
            errors[modelName][field].push(validationErrors[errFn](field, operands[1]));
          }

        } else {
          fn = validations[validator];
          result = fn(data[field]);

          if(result === false){
            prepareErrors(modelName); 
            prepareErrorField(modelName, field);
            errors[modelName][field].push(validationErrors[validator](field));
          }
        }
      });
    });
    return errors;
  }

  /**
   * Converts errors into a readable setences
   * @param  {Object} errors [object where keys are field names and values are arrays]
   * @return {Void}        
   */
  errorsAsText(errors, modelName){
    let _errors = _.clone(errors);

    for ( let key in _errors[modelName]) {
      let val  = _errors[modelName][key];
      _errors[modelName][key] = val.join(' ');
    }
    return _errors;
  }

}

export { ModelValidator };
