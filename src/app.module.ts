import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/modules/user.module';
import { TypeOrmComponent } from './infrastructure/db/conect';
import { TaskModule } from './infrastructure/modules/task.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { GroupModule } from './infrastructure/modules/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmComponent,
    UserModule,
    TaskModule,
    AuthModule,
    GroupModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
