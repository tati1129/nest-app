import { Injectable } from '@nestjs/common';
import { ExampleRepository } from './example.repository';

@Injectable()
export class ExampleService {
    constructor(private readonly exampleRepository: ExampleRepository){}

    finAll(){
        return this.exampleRepository.findAll();
    }
}
