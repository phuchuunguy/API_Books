import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Res, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/gruards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gruards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Get All Users'})
  @ApiResponse({status: 200, description: 'Return All Users'})

  // @Get('me')
  // @UseGuards(JwtAuthGuard)
  // getMe(req: any) {
  //   return { message: 'Hello user', user: req.user };
  // }

  // @Get('admin')
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(new RolesGuard(['admin']))
  // getAdmin(req: any) {
  //   return { message: 'Welcome admin', user: req.user };
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number, @Req()  req) {
    const user = req.user;
    if (user.role !== 'admin' && user.sub !== +id)
      return {messgae: 'Access denied'};
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
