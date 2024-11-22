
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: any) {
    try {
        this.schema.parse(value);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestException({ 
                message: "Validation failed", 
                statusCode: 400,
                error: fromZodError(error),
            });
        }
        throw error;
    }

    return value;
  }
}
