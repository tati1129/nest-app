//In memory, no real db

import { Injectable } from '@nestjs/common';
import { Article } from './article.interface';

@Injectable()
export class ArticleRepository {
  private articles: Article[] = [
    {
      id: 0,
      title: 'Optimisation in React ',
      content: 'UseCallback, useMemo, memo',
      author: 'Dan Abramov',
      createdAt: new Date(),
    },
  ];
  private counter = 1;
  //метод получения всех Article
  findAll(): Article[] {
    return this.articles;
  }
}
