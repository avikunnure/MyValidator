declare class ValidationRule {
    FieldName: string;
    private Validations;
    constructor(name: string);
    IsRequired(message: string): ValidationRule;
    EmailAddress(message: string): ValidationRule;
    Minimum(value: any, message: string): ValidationRule;
    Maximum(value: any, message: string): ValidationRule;
    Length(value: any, message: string): ValidationRule;
    RegularExp(value: any, message: string): ValidationRule;
    Validate(value: any, callback: (message: string, fieldName: string) => any): boolean;
}
interface IValidator<T> {
    Validate(obj: T): boolean;
}
declare abstract class AbstractValidator<T> implements IValidator<T> {
    private ErrorMessages;
    private Rules;
    constructor();
    CreateRule(name: string): ValidationRule;
    AddRule(Rule: ValidationRule): void;
    Validate(obj: T): boolean;
    ValidateForm(obj: FormData): boolean;
    GetErrors(name: string): string;
}

export { AbstractValidator, IValidator };
