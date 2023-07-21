import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from 'src/module/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ApiController],
})
export class ApiModule {}
