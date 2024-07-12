import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigProjectModule } from './config/config.module';
import { TemplatesService } from './templates/templates.service';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    ConfigProjectModule,
    TemplatesModule,
    // 기타 모듈들
  ],

  controllers: [AppController],
  providers: [AppService, TemplatesService],
})
export class AppModule {}
