/* jshint esnext: true */
let _ = require('lodash');

let asString = (x:any) => {
  let y = _.clone(x);
  return y.toString();
};

let validations = {
  '*': function (x) { 
    if (!x)  return false;

    var y = _.clone(x);
    y = y.toString();
    // return _.isEmpty(y); 
    return y.length > 0;
  },
  'int': function (x) { 
    let r = /^[\d]+$/;
    return r.test(x);
  }, 
  'float': function(x) {
    return true;
  },
  'email': function (x) {
    return true;
  }, 
  /**
   * Simple Length Validation function (we used size in order to avoid conflicts wit length)
   * @param {String} x [a string which describes the operation to be performed. eg 'eq^3, lt^4, lte3, gte^10'
   */

  size: (data, x) => {
    let y  = asString(x);
    let operands = y.split('^');
    switch(operands[0]) {
      case 'eq':
        return validations.eq(data, operands[1]);
      case 'lt':
        return validations.lt(data, operands[1]);
      case 'lte':
        return validations.lte(data, operands[1]);      
      case 'gt':
        return validations.gt(data, operands[1]);      
      case 'gte':
        return validations.gte(data, operands[1]);
       default:
         return false;
    }
  },

  eq: (data, desiredLength) => {
    return data.length === parseInt(desiredLength);
  },
 
  lt: (data, desiredLength) => {
    return data.length < parseInt(desiredLength);
  },
  lte: (data, desiredLength) => {
    return data.length <= parseInt(desiredLength);
  },
  gt: (data, desiredLength) => {
    return data.length > parseInt(desiredLength);
  },
  gte: (data, desiredLength) => {
    return data.length >= parseInt(desiredLength);
  }, 
};


let validationErrors = {
  '*': function (x) { return `${x} is required.`; },
  'int':  function(x) { return `${x} is not an integer value.`; },
  'float': function (x) { return `${x} is not a decimal value.`; },
  'size' : function (field, y) {
      //todo: check for valid field and y values;
     let ops = y.split('^');
     switch(ops[0]){
       case 'eq':
        return validationErrors.eq(field, ops[1]);
       case 'lt':
        return validationErrors.lt(field, ops[1]);
       case 'lte':
        return validationErrors.lte(field, ops[1]);
       case 'gt':
        return validationErrors.gt(field, ops[1]);
       case 'gte':
        return validationErrors.gte(field, ops[1]);
       default: 

         return `Unknow message for ${ops[0]}`;
     }
  },
  eq: (field, length) => {  return `${field} should be equal to ${length} characters.`; },
  lt: (field, length) => {  return `${field} should be less than ${length} characters.`; },
  lte: (field, length) => {  return `${field} should be at most ${length} characters.`; },
  gt: (field, length) => {  return `${field} should be greater than ${length} characters.`; },
  gte: (field, length) => {  return `${field} should be at least ${length} characters.`; },
};

export { validations };
export { validationErrors };

