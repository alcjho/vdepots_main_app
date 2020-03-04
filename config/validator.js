import validate from "validate.js";

class Validator {

    validateCrediCard(data){
        var constraints = {
            creditCardNumber: {
              presence: true,
              format: {
                pattern: /^(34|37|4|5[1-5]).*$/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                  return validate.format("^%{num} is not a valid credit card number", {
                    num: value
                  });
                }
              },
              length: function(value, attributes, attributeName, options, constraints) {
                if (value) {
                  // Amex
                  if ((/^(34|37).*$/).test(value)) return {is: 15};
                  // Visa, Mastercard
                  if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
                }
                // Unknown card, don't validate length
                return false;
              }
            },
            creditCardZip: function(value, attributes, attributeName, options, constraints) {
              if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
              return {
                presence: {message: "is required when using AMEX"},
                length: {is: 5}
              };
            }
        };

        return validate({creditCardNumber: "4"}, constraints);
    }

    validateLogin(data){
        var constraints = {
            username: {
                presence: true,
                length: {
                  minimum: 1,
                  message: "Cannot be blank"
                }
            },
            password: {
                presence: true,
                length: {
                  minimum: 1,
                  message: "Cannot be blank"
                }
            }
          };
          
          return validate(data, constraints);
    }

    validateNewUser(data){
      var constraints = {
          email: {
              presence: true,
              length: {
                minimum: 1,
                message: "Cannot be blank"
              }
          },
          firstname: {
              presence: true,
              length: {
                minimum: 1,
                message: "Cannot be blank"
              }
          },

          company: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
          },

          location: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
          },
          
          phone: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
          }                
          
        };
        
        return validate(data, constraints);
  }
  
  validateProvider(data){
    var constraints = {
        username: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
        },
        password: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
        }
      };
      
      return validate(data, constraints);
  }

  validateProfessional(data){
    var constraints = {
        username: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
        },
        password: {
            presence: true,
            length: {
              minimum: 1,
              message: "Cannot be blank"
            }
        }
      };
      
      return validate(data, constraints);
  }      
  
}

export default Validator;