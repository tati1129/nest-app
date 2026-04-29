import {
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: unknown) {
    //валидируем данные safeParse(value) по этой схеме this.schema
    //метод safeParse(value) не выкидывает ошибок а success=false
    //метод safeParse(value) проверяет по схеме все ли совпадает и
    //если все успешно то получим result какоето значение со свойством data
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(z.treeifyError(result.error));
      //result.error.format() ошибки в форматтированном виде
    }

    return result.data;
  }
}
