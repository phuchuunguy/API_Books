import { IsString, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../entity/user.entity";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
