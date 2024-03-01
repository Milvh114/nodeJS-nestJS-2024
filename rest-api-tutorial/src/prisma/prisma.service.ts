import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService){
        super({
            datasources: {
                db: {
                    // url: 'postgresql://postgres:123@localhost:5434/nest?schema=public' // do this way not secure anyone can see because if u push code in github repo this will show this attribute && also have error prone bcs if u do an error here, it is hard to notice
                    // url: process.env.DATABASE_URL
                    url: config.get('DATABASE_URL')
                }
            }
        })
        console.log(config)
        console.log(config.get('DATABASE_URL'))
    }
}
