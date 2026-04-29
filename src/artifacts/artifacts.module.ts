import { Module } from '@nestjs/common';

import { ArtifactsController } from './artifacts.controller';

@Module({
  providers: [],
  controllers: [ArtifactsController]
})
export class ArtifactsModule {}
