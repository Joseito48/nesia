import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const mockReviewModel = {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ name: 'Ana', comment: 'Muy bien', rating: 5 }]),
      }),
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({ name: 'Ana' }),
    create: jest.fn().mockImplementation((data) => Promise.resolve({ ...data, _id: 'review-1' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review.name),
          useValue: mockReviewModel,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe devolver reseñas ordenadas', async () => {
    const reseñas = await service.findAll();
    expect(reseñas).toBeInstanceOf(Array);
    expect(reseñas[0].name).toEqual('Ana');
  });
});
