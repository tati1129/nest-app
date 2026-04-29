import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { ExampleRepository } from './example.repository';

@Module({
  providers: [ExampleService,ExampleRepository],
  controllers: [ExampleController]
})
export class ExampleModule {}
