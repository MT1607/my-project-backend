import { ApiProperty } from '@nestjs/swagger';

export class BodyCreateUserRequest {
  @ApiProperty({ example: 'sonnguyen', description: 'Name of user' })
  username: string;

  @ApiProperty({ example: 'nguyenson@gmail.com', description: 'Email of User' })
  email: string;

  @ApiProperty({ example: 'password', description: 'Password of User' })
  password: string;

  // @ApiProperty({
  //   example: `${new Date().toISOString()}`,
  //   description: 'Password of User',
  // })
  // create_at: Date;

  // @ApiProperty({
  //   example: `${new Date().toISOString()}`,
  //   description: 'Updated date of User',
  // })
  // update_at: Date;
}
