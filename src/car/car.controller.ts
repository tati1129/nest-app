import { Controller, Post, Body } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type CreateCarDto, CreateCarSchema } from './car.create.dto';

@Controller('/cars')
export class CarController {

    @Post()
    createCar(@Body(new ZodValidationPipe(CreateCarSchema)) body:CreateCarDto, ){
        return body;
    }
}
