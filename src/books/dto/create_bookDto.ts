import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    categoryId: number;
}