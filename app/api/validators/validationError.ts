export class ValidationError extends Error {
  public errors: string[];

  constructor(errors: string[]){
    super('Validation failed');
    this.errors = errors;
    this.name = "ValidationError"
  }
}