import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmComponent = TypeOrmModule.forRootAsync({
    inject: [
        ConfigService
    ],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
    })
})