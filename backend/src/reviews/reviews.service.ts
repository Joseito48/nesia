import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().sort({ createdAt: -1 }).exec();
  }

  async create(data: Partial<Review>): Promise<Review> {
    const created = new this.reviewModel(data);
    return created.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Reseña no encontrada');
    }
  }
}
