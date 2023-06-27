import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepository.save(createTodoDto);
  }

  findAll({
    description,
    priority,
    page,
    size,
  }: {
    description: string;
    priority: string;
    page: string;
    size: string;
  }) {
    const take = size ? +size : undefined;
    const skip = page && size ? (+page - 1) * +size : undefined;

    return new Promise(async (resolve, reject) => {
      const [content, totalElements] = await this.todosRepository.findAndCount({
        where: {
          description: description ? Like(`%${description}%`) : undefined,
          priority: +priority > -1 ? Equal(+priority) : undefined,
        },
        take,
        skip,
      });

      resolve({
        content,
        totalElements,
      });
    });
  }

  findOne(id: string) {
    return this.todosRepository.findOneBy({ id });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.update({ id }, updateTodoDto);
  }

  remove(id: string) {
    return this.todosRepository.delete({ id });
  }
}
