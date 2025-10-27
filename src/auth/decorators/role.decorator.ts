import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entity/user.entity";

export const Role = (role: UserRole) => SetMetadata('role', role);