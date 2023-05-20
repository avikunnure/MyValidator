// src/Validator.ts
var IsRequired = class {
  Validate(value) {
    let result = false;
    if (typeof value != "undefined" && value != null && value != "") {
      result = true;
    }
    return result;
  }
};
var Minimum = class {
  Validate(value) {
    let result = false;
    if (value >= this.CompareValue) {
      result = true;
    }
    return result;
  }
};
var Maximum = class {
  Validate(value) {
    let result = false;
    if (value <= this.CompareValue) {
      result = true;
    }
    return result;
  }
};
var Length = class {
  Validate(value) {
    let result = false;
    if (value.toString().length == this.CompareValue) {
      result = true;
    }
    return result;
  }
};
var EmailAddress = class {
  Validate(value) {
    let result = false;
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(value.toString())) {
      result = true;
    }
    return result;
  }
};

// src/FluentValidator.ts
var Validations = class {
  constructor(type, typename, message) {
    this.type = type;
    this.message = message;
    this.typeName = typename;
  }
};
var ValidationRule = class {
  constructor(name) {
    this.FieldName = name;
  }
  IsRequired(message) {
    let rs = this.Validations.filter((s) => s.typeName == "IsRequired");
    if (rs.length == 0) {
      this.Validations.push(new Validations(new IsRequired(), "IsRequired", message));
    }
    return this;
  }
  EmailAddress(message) {
    let rs = this.Validations.filter((s) => s.typeName == "IsRequired");
    if (rs.length == 0) {
      this.Validations.push(new Validations(new EmailAddress(), "EmailAddress", message));
    }
    return this;
  }
  Minimum(value, message) {
    let rs = this.Validations.filter((s) => s.typeName == "Minimum");
    if (rs.length == 0) {
      let val = new Validations(new Minimum(), "Minimum", message);
      val.value = value;
      this.Validations.push(val);
    }
    return this;
  }
  Maximum(value, message) {
    let rs = this.Validations.filter((s) => s.typeName == "Minimum");
    if (rs.length == 0) {
      let val = new Validations(new Maximum(), "Maximum", message);
      val.value = value;
      this.Validations.push(val);
    }
    return this;
  }
  Length(value, message) {
    let rs = this.Validations.filter((s) => s.typeName == "Length");
    if (rs.length == 0) {
      let val = new Validations(new Length(), "Length", message);
      val.value = value;
      this.Validations.push(val);
    }
    return this;
  }
  RegularExp(value, message) {
    let rs = this.Validations.filter((s) => s.typeName == "RegularExp");
    if (rs.length == 0) {
      let val = new Validations(new Length(), "RegularExp", message);
      val.value = value;
      this.Validations.push(val);
    }
    return this;
  }
  Validate(value) {
    let result = true;
    for (let index = 0; index < this.Validations.length; index++) {
      const element = this.Validations[index];
      result = result && element.type.Validate(value);
    }
    return result;
  }
};
var AbstractValidator = class {
  constructor() {
  }
  CreateRule(name) {
    let obj = new ValidationRule(name);
    return obj;
  }
  AddRule(Rule) {
    this.Rules.push(Rule);
  }
  Validate(obj) {
    let result = true;
    for (let index = 0; index < this.Rules.length; index++) {
      const element = this.Rules[index];
      result = result && element.Validate(obj[element.FieldName]);
    }
    return result;
  }
};
export {
  AbstractValidator
};
