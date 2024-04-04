import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTypeormService } from './database-typeorm.service';

describe('DatabaseTypeormService', () => {
  let service: DatabaseTypeormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseTypeormService],
    }).compile();

    service = module.get<DatabaseTypeormService>(DatabaseTypeormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
