import { Injectable } from '@nestjs/common';
import { Example } from './example.interface';

@Injectable()
export class ExampleRepository {
  private example: Example[] = [
    {
      id: 22,
      title: '',
      createdAt: new Date(),
    },
  ];

  findAll(): Example[] {
    return this.example;
  }
}
