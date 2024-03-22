import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//datasource
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.getOrThrow('MYSQL_HOST'),
                port: config.getOrThrow('MYSQL_PORT'),
                username: 'root',
                password: config.getOrThrow('MYSQL_ROOT_PASSWORD'),
                database: config.getOrThrow('MYSQL_DATABASE'),
                // entities: [
                //     __dirname + '/../**/*.entity{.ts,.js}',
                // ],
                synchronize: config.getOrThrow('MYSQL_SYNCHRONIZE'), //synchronize our database schema with the MYSQL server on every application launch( usefull when we're developing  locally however it could cause to data loss in production so make sure we check to see if we want  do this )
                autoLoadEntities: true, // we dont have to manually tell typeorm: where our models are and have to do that manually.
                timezone: '+07:00'
            }),
            inject: [ConfigService]
        }),
    ],
})
export class DatabaseModule {}
