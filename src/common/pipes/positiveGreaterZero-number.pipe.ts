import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class PositiveGreaterZero implements PipeTransform{
    transform(value: number) {
        if (value <= 0) {
            throw new BadRequestException();
        }
        return value;
    }
}
