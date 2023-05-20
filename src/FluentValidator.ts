import { IValidation } from "./Validator";
import { IsRequired,EmailAddress,Maximum,Minimum,Length,RegularExp } from "./Validator";

class Validations{
    public type:IValidation;
    public typeName:string;
    public value:any;
    public message:string;
    constructor(type:IValidation,typename:string,message:string){
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
        this.Validations=new Array<Validations>();
    }
    public IsRequired(message:string): ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="IsRequired");
        if(rs.length==0){
            this.Validations.push(new Validations(new IsRequired(),'IsRequired',message));
        }
        return this;
    }

    public EmailAddress(message:string):ValidationRule{
        let rs= this.Validations.filter(s=>s.typeName=="EmailAddress");
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
        let rs= this.Validations.filter(s=>s.typeName=="Maximum");
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
            let val=new Validations(new RegularExp(),'RegularExp',message);
            val.value=value;
            this.Validations.push(val);
        }
        return this;
    }

    public Validate(value : any,callback:(message:string,fieldName:string) =>any) :boolean {
        let result:boolean=true;
        for (let index = 0; index < this.Validations.length; index++) {
            const element = this.Validations[index];
            result = result && element.type.Validate(value);
            if(result!=true){
                callback(element.message,this.FieldName);
            }
        }
        return result;
    }
}
export interface IValidator<T>{
    Validate(obj:T):boolean;
}
export abstract class AbstractValidator<T> implements IValidator<T> {
    private ErrorMessages:Array<{messages:string,fieldName:string}>;
    private  Rules:Array<ValidationRule>;
   constructor(){
    this.Rules=new Array<ValidationRule>();
    this.ErrorMessages=new Array();
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
            result = result && element.Validate(obj[element.FieldName],(msg,ele)=>
            { 
                let objresult={
                    messages:msg,
                    fieldName:ele,
                }
                this.ErrorMessages.push(objresult);
            });
        }
        return result;
    }
    ValidateForm(obj:FormData){
        let keys=[];
        for (const iterator of obj.keys()) {
            keys.push(iterator);
        }
        let result:boolean=true;
        for (let index = 0; index < this.Rules.length; index++) {
            const element = this.Rules[index];
            let haskeys = keys.filter(s=>s==element.FieldName).length>0; 
            if(haskeys){
                result = result && element.Validate(obj.get( element.FieldName),(msg,ele)=>
                { 
                    let objresult={
                        messages:msg,
                        fieldName:ele,
                    }
                    this.ErrorMessages.push(objresult);
                });
            }
        }
        return result;
    }
    GetErrors(name:string):string{
       let errors= this.ErrorMessages.filter(s=>s.fieldName==name);
       let message :string="";
       errors.forEach(element => {
        message = message +","+ element.messages;
       }); 
       return message;
    }
}

