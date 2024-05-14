# How to use

In .env file add 4 field:
JWT_SECRET_KEY="aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
JWT_ACCESS_TOKEN_EXPIRES_IN="30d"
JWT_REFRESH_TOKEN_EXPIRES_IN="30d"
BCRYPT_HASH_ROUNDS="10"

1. Import

```Typescript
...
import ...
@Module({
  imports: [
    ...
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
      cache: true,
      validate: validateConfig,
    }),
    JwtAuthenticationModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig, true>) => ({
        ...configService.get<IConfigAuth>('auth'),
      }),
      inject: [ConfigService],
    }),
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
    private readonly jwtAuthenticationService: jwtAuthenticationService,
    ...
  ) {}

  getAccessToken() {
     const payload = {
      id: user.id,
      roleId: user.roleId,
      userType: user.isSuperAdmin ? UserType.SUPER_ADMIN : UserType.USER,
    };

      return this.jwtAuthenticationService.generateAccessToken(payload);
  }

}


```
