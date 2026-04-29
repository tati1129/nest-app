import {  BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ArtifactRarity } from "src/artifacts/enum/artifacts-rarity.enum";


@Injectable()
export class RarityPipeEnum implements PipeTransform{
    transform(value: string) : ArtifactRarity {
if (!value) {
    throw new BadRequestException('Invalid rarity')
}
        const rarity =value.toLowerCase();

        if (!Object.values(ArtifactRarity).includes(rarity as ArtifactRarity)) {
            throw new BadRequestException('Invalid rarity')
        }

        return rarity as ArtifactRarity
    }
}