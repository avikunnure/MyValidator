# MyValidator
This simple validation js to validate rquired , emailaddress , minum and maximum validations
as use form hook in react class components are more tricky so implemented an custom validations .

first install package from mpm then
to use this just import javascript validator class like below

#import {AbstractValidator } from "myfluentvalidatorjs"

then create and class in javascript which extends from abscract validator as shown below.
class Myclass {
    name = "";
}
class MyclassValidator extends AbstractValidator {
    constructor() {
        super();
        this.AddRule(this.CreateRule("name").IsRequired("name is required").Length(5,"it should be mail"));
    }
}

add after adding rules you can easily access validate method by using object of class as shown

let myclassValidator = new MyclassValidator();
let mytest = new Myclass();
console.log(myclassValidator.Validate(mytest));

you can use the get error of that field as shown below 
    console.log(myclassValidator.GetErrors("name"));
    
