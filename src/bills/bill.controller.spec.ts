import { Test, TestingModule } from '@nestjs/testing';
import { BillController } from './bill.controller';
import { BillService} from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

export const mockCreateBillDto = (): CreateBillDto => ({
  usernumber: 123456,
  amount: 100
})
export const mockBill = (): Bill => ({
  token:24567890,
  usernumber: 123456,
  createAt: new Date().getDate(),
  expired: new Date().getDate()
})
describe('BillController', () => {
  let controller: BillController;
  let service: BillService

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findOne: jest.fn(),
      findToken: jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillController],
      providers: [{
        provide:BillService,
        useValue:mockService
      }
        ],
      
    }).compile();

    controller = module.get<BillController>(BillController);
    service = module.get<BillService>(BillService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create()', () => {
    it('should call billService create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const mockParam = mockCreateBillDto();

      await controller.create(mockParam);

      expect(createSpy).toHaveBeenCalledWith(mockParam);
    })

    it('should throw if BillsService create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(controller.create(mockCreateBillDto())).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn =  mockBill() as unknown as any;
      
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);

      const response = await controller.create(mockCreateBillDto())

      expect(response).toEqual(mockReturn);
    })
  })

  describe('findToken()', () => {
    it('should call VideosService find by id with correct value', async () => {
      const findSpy = jest.spyOn(service, 'findToken');

      await controller.findOne('anyid');

      expect(findSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if VideosService find by id throws', async () => {
      jest.spyOn(service, 'findToken').mockRejectedValueOnce(new Error());

      await expect(controller.findOne('anyid')).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = mockBill() as any

      jest.spyOn(service, 'findToken').mockResolvedValueOnce(mockReturn);

      const response = await controller.findOne('anyid');

      expect(response).toEqual(mockReturn);
    })
  })


});
