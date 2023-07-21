import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { BodyCreateUserRequest } from '../module/user/dto/create-user.dto';
import { UserService } from '../module/user/user.service';

import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('User')
export class ApiController {
  constructor(private readonly userService: UserService) {}

  /// Get all user
  @Get('/')
  @ApiOperation({ summary: 'Get all new user' })
  async getUser() {
    return await this.userService.getUser();
  }

  /// Create new User
  @Post('/register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User created successfully',
    type: BodyCreateUserRequest,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createUser(
    @Res() response: Response,
    @Body() body: BodyCreateUserRequest,
  ) {
    try {
      if (!body) {
        response.status(HttpStatus.BAD_REQUEST).send({
          status: HttpStatus.BAD_REQUEST,
          msg: 'The body for register is required',
        });
      }
      const isContainUser = await this.userService.getUniqueUser(body.email);

      if (isContainUser) {
        response.status(HttpStatus.BAD_REQUEST).send({
          status: HttpStatus.BAD_REQUEST,
          msg: 'Email is used',
        });
      }

      const newUser = await this.userService.createUser(body);

      if (newUser === null) {
        response.status(HttpStatus.BAD_REQUEST).send({
          status: HttpStatus.BAD_REQUEST,
          msg: 'User created failed',
        });
      } else {
        response.status(HttpStatus.CREATED).send({
          status: HttpStatus.CREATED,
          msg: 'User created success',
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
