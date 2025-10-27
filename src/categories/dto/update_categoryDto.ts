import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create_categoryDto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}