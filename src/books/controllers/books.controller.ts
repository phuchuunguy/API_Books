import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { BookService } from "../services/books.service";
import { CreateBookDto } from "../dto/create_bookDto";
import { UpdateBookDto } from "../dto/update_bookDto";

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService ) {}

    @Post()
    create(@Body() dto: CreateBookDto) {
        return this.bookService.create(dto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
        return this.bookService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.remove(id);
    }
}