import {  BadGatewayException, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class RarityPipe implements PipeTransform{
    private readonly allowedRarity = ['common','rare','legendary','epic'];
    transform(value: string) {
        if (!value) {
            throw new BadRequestException('Rariry is equired')
        }
        if (!this.allowedRarity.includes(value)) {
            throw new BadRequestException(
              `Invalid rarity. Allowed values: ${this.allowedRarity.join(', ')}`,
            );
        }
        return value;
    }
}