export interface IValidation{
    CompareValue:any;
    Validate(value:any): boolean    
}
export class IsRequired<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        if(typeof value !='undefined'
        && value != null
        && value != ""
        ){
            result=true;
        }
        return result;
    }
}

export class Minimum<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        if(value>=this.CompareValue){
            result=true;
        }
        return result;
    }
}
export class Maximum<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        if(value<=this.CompareValue){
            result=true;
        }
        return result;
    }
}

export class Length<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        if(value.toString().length==this.CompareValue){
            result=true;
        }
        return result;
    }
}

export class EmailAddress<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regexp.test(value.toString())){
            result=true;
        }
        return result;
    }
}

export class RegularExp<T> implements IValidation{
    public CompareValue: any;
    Validate(value: T): boolean {
        let result:boolean=false;
        let regexp = new RegExp(this.CompareValue.toString());
        if(regexp.test(value.toString())){
            result=true;
        }
        return result;
    }
}
