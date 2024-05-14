# How to use

In .env file add 2 field:
SENDGRID_API_KEY
SENDGRID_SENDER

1. Import

```Typescript
...
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule } from '@app/send-grid';
import config, { IConfig, IConfigSendGrid, validateConfig } from 'src/config';

@Module({
  imports: [
    ...
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
      cache: true,
      validate: validateConfig,
    }),
    SendGridModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig, true>) => ({
        ...configService.get<IConfigSendGrid>('sendgrid'),
      }),
      inject: [ConfigService],
    })
    ...
  ],
  controllers: [...],
  providers: [...],
})
export class ExampleModule {}

```

2. Use

```Typescript
...
@Injectable()
export class ExampleService {
  constructor(
    ...
    private readonly sendGridService: SendGridService,
    ...
  ) {}

  async sendMail() {
      // Send mail
      const payload: SendMailDto = {
        receiver: 'example@gmail.com',
        subject: 'Send mail',
        content: 'Send example mail'
      };
      await this.sendGridService.sendMail(payload);
  }

}

```
