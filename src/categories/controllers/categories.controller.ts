import { CategoriesService } from './../services/categories.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create_categoryDto";
import { UpdateCategoryDto } from "../dto/update_categoryDto";
import { JwtAuthGuard } from 'src/auth/gruards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gruards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @ApiOperation({summary: 'Get All Category'})
    @ApiResponse({status: 200, description: 'Return All Category'})

    @Post()
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.categoriesService.findAll();
    }

    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id);
    }
}