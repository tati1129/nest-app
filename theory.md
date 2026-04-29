

https://docs.nestjs.com/first-steps

# 🧩 1. Module (Модуль)

Модуль — это “контейнер”, который объединяет части приложения.

👉 Каждый Nest-приложение имеет корневой модуль (`AppModule`).

Пример:

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

📌 Что внутри:

* `controllers` — какие контроллеры входят
* `providers` — сервисы (логика)
* `imports` — другие модули
* `exports` — что можно использовать в других модулях

👉 Проще: **Module = коробка, в которой лежит функциональность**

---

# 🎯 2. Controller (Контроллер)

Контроллер отвечает за **обработку HTTP-запросов**.

👉 Он принимает запрос и возвращает ответ.

Пример:

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return ['user1', 'user2'];
  }
}
```

📌 Что происходит:

* `@Controller('users')` → путь `/users`
* `@Get()` → обработка GET-запроса
* метод → логика ответа

👉 Запрос:

```
GET /users
```

👉 Ответ:

```
["user1", "user2"]
```

👉 Проще: **Controller = входная точка (API)**

---

# ⚙️ 3. Injectable / Provider (Сервис)

`@Injectable()` — это способ сказать Nest:
👉 “Этот класс можно внедрять (dependency injection)”

Пример:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return ['user1', 'user2'];
  }
}
```

Теперь используем его в контроллере:

```ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

📌 Важно:

* Nest сам создаёт экземпляр класса
* не нужно писать `new UsersService()`

👉 Проще: **Injectable = бизнес-логика**

---

# 🔗 Как всё связано

1. Клиент делает запрос → Controller
2. Controller вызывает Service
3. Service выполняет логику
4. Ответ возвращается клиенту

👉 Поток:

```
Request → Controller → Service → Response
```

---

# 🧠 Главное понять

* **Module** — структура
* **Controller** — API
* **Injectable (Service)** — логика

---

# 🚀 Минимальная схема проекта

```
users/
 ├── users.module.ts
 ├── users.controller.ts
 └── users.service.ts
```

---

## NestJS Article CRUD — In-Memory with Repository Pattern

---

### 1. Create the Project

```bash
npm i -g @nestjs/cli
nest new article-app
cd article-app
```

---

### 2. Generate the Module

```bash
nest generate module article
nest generate controller article
nest generate service article
```

---

### 3. Article Interface

**`src/article/interfaces/article.interface.ts`**
```typescript
export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}
```

---

### 4. DTOs

**`src/article/dto/create-article.dto.ts`**
```typescript
export class CreateArticleDto {
  title: string;
  content: string;
  author: string;
}
```

**`src/article/dto/update-article.dto.ts`**
```typescript
export class UpdateArticleDto {
  title?: string;
  content?: string;
  author?: string;
}
```

---

### 5. Article Repository

**`src/article/article.repository.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleRepository {
  private articles: Article[] = [];
  private idCounter = 1;

  findAll(): Article[] {
    return this.articles;
  }

  findOne(id: number): Article | null {
    return this.articles.find(a => a.id === id) ?? null;
  }

  create(dto: CreateArticleDto): Article {
    const article: Article = {
      id: this.idCounter++,
      ...dto,
      createdAt: new Date(),
    };
    this.articles.push(article);
    return article;
  }

  update(id: number, dto: UpdateArticleDto): Article | null {
    const article = this.findOne(id);
    if (!article) return null;
    Object.assign(article, dto);
    return article;
  }

  remove(id: number): boolean {
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.articles.splice(index, 1);
    return true;
  }
}
```

> The repository knows **nothing** about HTTP or exceptions — it only returns `null` / `false` when something isn't found. That's the service's job.

---

### 6. Article Service

**`src/article/article.service.ts`**
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  findAll() {
    return this.articleRepository.findAll();
  }

  findOne(id: number) {
    const article = this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(`Article #${id} not found`);
    return article;
  }

  create(dto: CreateArticleDto) {
    return this.articleRepository.create(dto);
  }

  update(id: number, dto: UpdateArticleDto) {
    const article = this.articleRepository.update(id, dto);
    if (!article) throw new NotFoundException(`Article #${id} not found`);
    return article;
  }

  remove(id: number) {
    const removed = this.articleRepository.remove(id);
    if (!removed) throw new NotFoundException(`Article #${id} not found`);
  }
}
```

---

### 7. Article Controller

**`src/article/article.controller.ts`**
```typescript
import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe, HttpCode,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateArticleDto) {
    return this.articleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(id);
  }
}
```

---

### 8. Article Module

Register `ArticleRepository` as a provider:

**`src/article/article.module.ts`**
```typescript
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
```

---

### 9. App Module

**`src/app.module.ts`**
```typescript
import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ArticleModule],
})
export class AppModule {}
```

---

### 10. Run

```bash
npm run start:dev
```

---

### File Structure

```
src/
├── article/
│   ├── dto/
│   │   ├── create-article.dto.ts
│   │   └── update-article.dto.ts
│   ├── interfaces/
│   │   └── article.interface.ts
│   ├── article.controller.ts
│   ├── article.module.ts
│   ├── article.repository.ts   ← new
│   └── article.service.ts
└── app.module.ts
```

---

### Responsibilities at a Glance

| Layer | Knows about | Does NOT know about |
|---|---|---|
| **Controller** | HTTP, DTOs | DB, business rules |
| **Service** | Business logic, exceptions | DB, HTTP |
| **Repository** | Data storage, queries | HTTP, exceptions |

---

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/articles` | Get all articles |
| `GET` | `/articles/:id` | Get one article |
| `POST` | `/articles` | Create an article |
| `PUT` | `/articles/:id` | Update an article |
| `DELETE` | `/articles/:id` | Delete (204) |

> **Next step:** swap `ArticleRepository` internals for Prisma — the service and controller stay completely untouched.


Fix the DTOs by adding the `!` definite assignment assertion:

**`src/article/dto/create-article.dto.ts`**
```typescript
export class CreateArticleDto {
  title!: string;
  content!: string;
  author!: string;
}
```

**`src/article/dto/update-article.dto.ts`**
```typescript
export class UpdateArticleDto {
  title?: string;
  content?: string;
  author?: string;
}
```

The `!` tells TypeScript "I guarantee this will be assigned at runtime" — which is true since NestJS populates DTO properties from the request body. Optional properties with `?` don't need it since `undefined` is already a valid value for them.