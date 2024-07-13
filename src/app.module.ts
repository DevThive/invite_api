import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigProjectModule } from './config/config.module';
import { TemplatesService } from './templates/templates.service';
import { TemplatesModule } from './templates/templates.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigProjectModule,
    TypeormModule.forRoot(),
    TemplatesModule,
    UsersModule,
    AuthModule,
    // 기타 모듈들
  ],

  controllers: [AppController],
  providers: [AppService, TemplatesService],
})
export class AppModule {}
