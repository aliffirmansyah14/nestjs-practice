import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}
  transform(value: any, metadata: ArgumentMetadata) {
    // kalo metadata hya query,param tidak ditransform
    //  return this.zodType.parse(value);
    return metadata.type === 'body' ? this.zodType.parse(value) : value;
  }
}
