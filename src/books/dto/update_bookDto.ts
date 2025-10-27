import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./create_bookDto";

export class UpdateBookDto extends PartialType(CreateBookDto) {}