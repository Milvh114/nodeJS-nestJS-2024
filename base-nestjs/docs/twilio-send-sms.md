# How to use

In .env file add 3 field:
TWILIO_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER

1. Import

```Typescript
...
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from '@app/twilio';
import config, { IConfig, IConfigTwilio, validateConfig } from 'src/config';

@Module({
  imports: [
    ...
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
      cache: true,
      validate: validateConfig,
    }),
    TwilioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig, true>) => ({
        ...configService.get<IConfigTwilio>('twilio'),
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
    private readonly twilioService: TwilioService,
    ...
  ) {}

  async sendSms() {
      // Send sms
      const toPhone = '84123456789';
      const content = 'Send example sms';
      await this.twilioService.sendSms(toPhone, content);
  }

}


