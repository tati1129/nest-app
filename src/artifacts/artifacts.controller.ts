import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Headers,
  Request,
  Req,
  UsePipes,
  Post,
  Body,
} from '@nestjs/common';
import { AuthPipe } from 'src/common/pipes/auth-pipe';
import { PositiveGreaterZero } from 'src/common/pipes/positiveGreaterZero-number.pipe';
import { RarityPipe } from 'src/common/pipes/rarity.pipe';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type CreateArtifactDto, CreateArtifactSchema } from './artifacts.create.dto';

@Controller('/artifacts')
export class ArtifactsController {
  // __________Получение списка артефактов__________
  // GET /artifacts?skip=0&limit=10&rarity=epic
  @Get()
  getAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('rarity', RarityPipe) rarity: string,
  ) {
    return { skip, limit, rarity };
  }

  // __________Поиск по имени__________
  // GET /artifacts/search?name=orb
  @Get('/search')
  getByName(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('name query parametr is required');
    }
    return { name };
  }

  // __________Фильтрация по диапазону силы__________
  //GET /artifacts/filter?minPower=10&maxPower=100
  @Get('/filter')
  findByPowerRange(
    @Query('minPower', ParseIntPipe) minPower: number,
    @Query('maxPower', ParseIntPipe) maxPower: number,
  ) {
    if (maxPower <= minPower) {
      throw new BadRequestException('maxPower should be greater than minPower');
    }
    return { minPower, maxPower };
  }

  // __________Получение всех headers__________
  // GET /artifacts/headers
  @Get('/headers')
  getHeaders(
    @Headers() headers: Record<string, string | string[] | undefined>,
  ) {
    return { headers };
  }

  // __________Информация о запросе__________
  //GET /artifacts/request-info

  @Get('/request-info')
  getRequest(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    };
  }

  // /artifacts/private
  @Get('privat')
  @UsePipes(AuthPipe)
  getPrivatInfo(
    @Headers()
    headers: Record<string, string>,
  ) {
    return { message: 'Privat info, sorry!' };
  }

  // __________Получение артефакта по ID__________
  //GET /artifacts/:id
  @Get('/:id')
  getById(@Param('id', ParseIntPipe, PositiveGreaterZero) id: number) {
    return { id };
  }

  @Post()
  createArtifact(@Body(new ZodValidationPipe(CreateArtifactSchema)) body:CreateArtifactDto,) {
    return body;
  }
}
