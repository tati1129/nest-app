import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { AdvertService } from './advert.service';
import { PositiveNumberPipe } from 'src/common/pipes/positive-number.pipe';

@Controller('/adverts')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Get()
  findAll() {
    return this.advertService.findAll();
  }

  //advert/example?skip=2&limit=10
  @Get('/example')
  example(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit') limit: string,
  ) {
    console.log(skip);
    console.log(limit);
    return { skip, limit };
  }

  //  /adverts/get-headers - все хэдеры
  @Get('/get-headers')
  getHeaders(@Headers() headers: Record<string, string>) {
    return headers;
  }

  // /adverts/get-auth-header - достаем хедер  authorisation
  @Get('/get-auth-header')
  getAuthHeaders(@Headers('authorization') token: string) {
    return { token };
  }

// достаем метод из реквеста
@Get('/example-2')
getRequest(@Req() req:Request){
  // console.log(req);
  return {method: req.method};
}

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe, PositiveNumberPipe) id: number) {
    console.log(id);
    return { id };
  }
}

// headers, url, body, method

// headers
// {
//   "content-type": "json"
// }

// body
// {
//   "email": "sdasd",
//   "password": "sdaasdsd"
// }

// url
// http://google.com/search?q=blablabla
// http://google.com/users/2?new=true
// /users/2 - path
// 2 - path variable
// new - query param
