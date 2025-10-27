import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../users/entity/user.entity";

export class RegisterDto {
    @IsString()
    username: string;

    @IsString()
    // @MinLength(8)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}