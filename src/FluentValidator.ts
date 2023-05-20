import { IValidator } from "./Validator";
import { IsRequired,EmailAddress,Maximum,Minimum,Length,RegularExp } from "./Validator";

class Validations{
    public type:IValidator;
    public typeName:string;
    public value:any;
    public message:string;
    constructor(type:IValidator,typename:string,message:string){
        this.type=type;
        this.message=message;
        this.typeName=typename;
    }
}

class ValidationRule{
    public FieldName:string;
    private Validations:Array<Validations>;
    constructor(name:string){
        this.FieldName=name;
    }
    public IsRequired(message:string): ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="IsRequired");
        if(rs.length==0){
            this.Validations.push(new Validations(new IsRequired(),'IsRequired',message));
        }
        return this;
    }

    public EmailAddress(message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="IsRequired");
        if(rs.length==0){
            this.Validations.push(new Validations(new EmailAddress(),'EmailAddress',message));
        }
        return this;
    }

    public Minimum(value:any,message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="Minimum");
        if(rs.length==0){
            let val=new Validations(new Minimum(),'Minimum',message);
            val.value=value;
            this.Validations.push(val);
        }
        return this;
    }

    
    public Maximum(value:any,message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="Minimum");
        if(rs.length==0){
            let val=new Validations(new Maximum(),'Maximum',message);
            val.value=value;
            this.Validations.push(val);
        }
        return this;
    }

    
    public Length(value:any,message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="Length");
        if(rs.length==0){
            let val=new Validations(new Length(),'Length',message);
            val.value=value;
            this.Validations.push(val);
        }
        return this;
    }

    public RegularExp(value:any,message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="RegularExp");
        if(rs.length==0){
            let val=new Validations(new Length(),'RegularExp',message);
            val.value=value;
            this.Validations.push(val);
        }
        return this;
    }

    public Validate(value : any) :boolean {
        let result:boolean=true;
        for (let index = 0; index < this.Validations.length; index++) {
            const element = this.Validations[index];
            result = result && element.type.Validate(value);
        }
        return result;
    }
}
export abstract class AbstractValidator<T> {
    private  Rules:Array<ValidationRule>;
    constructor() {
        
    }
    CreateRule(name:string){
        let obj = new ValidationRule(name);
        return obj;
    }
    AddRule(Rule:ValidationRule){
        this.Rules.push(Rule);
    }   
    Validate(obj:T){
        let result:boolean=true;
        for (let index = 0; index < this.Rules.length; index++) {
            const element = this.Rules[index];
            result = result && element.Validate(obj[element.FieldName]);
        }
        return result;
    }
}