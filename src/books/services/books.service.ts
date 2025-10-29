import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "../entity/book.entity";
import { CreateBookDto } from "../dto/create_bookDto";
import { Repository } from "typeorm";
import { UpdateBookDto } from "../dto/update_bookDto";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private repo: Repository<Book>,
    ) {}

    async findAll(page = 1, limit = 5) {
        const skip = (page - 1) * limit;
        const [book, total] = await this.repo.findAndCount({
            relations: ['category'],
            skip,
            take: limit,
            order: {id: 'DESC'},
        });

        return {
            data: book,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total/limit),}
        };
    }

    create(dto: CreateBookDto) {
        const book = this.repo.create(dto);
        return this.repo.save(book);
    }

    // findAll() {
    //     return this.repo.find({relations: ['category']});
    // }

    async findOne(id: number) {
        const book = await this.repo.findOne({where: {id}, relations: ['category']});
        if(!book) throw new NotFoundException('Book not found');
        return(book);
    }

    async update(id: number, dto: UpdateBookDto) {
        const book = await this.findOne(id);
        Object.assign(book, dto);
        return this.repo.save(book);
    }

    async remove(id: number) {
        const book = await this.findOne(id);
        return this.repo.remove(book);
    }
}