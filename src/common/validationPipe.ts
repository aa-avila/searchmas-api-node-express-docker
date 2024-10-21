import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validationPipe<T extends object, V>(
  schema: new () => T,
  requestObject: V,
): Promise<ValidationError[] | null> {
  const transformedClass = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return errors;
  }
  return null;
}
