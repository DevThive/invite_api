import { Test, TestingModule } from '@nestjs/testing';
import { DesignController } from './design.controller';

describe('DesignController', () => {
  let controller: DesignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignController],
    }).compile();

    controller = module.get<DesignController>(DesignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
