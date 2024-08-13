import { Controller, Body, Get, Param, Post, UsePipes, ValidationPipe, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/dto/createUser.dto";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
