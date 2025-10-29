import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { BookService } from "../services/books.service";
import { CreateBookDto } from "../dto/create_bookDto";
import { UpdateBookDto } from "../dto/update_bookDto";
import { JwtAuthGuard } from "src/auth/gruards/jwt-auth.guard";
import { RolesGuard } from "src/auth/gruards/roles.guard";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService ) {}

    @ApiOperation({summary: 'Get All Books'})
    @ApiResponse({status: 200, description: 'Return All Books'})

    @Post()
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    create(@Body() dto: CreateBookDto) {
        return this.bookService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Trang hiện tại' })
    @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Số sách mỗi trang' })
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ) {
        return this.bookService.findAll(page, limit);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
        return this.bookService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.remove(id);
    }
}