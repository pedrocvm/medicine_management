import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicineInput, UpdateMedicineInput } from './input';
import { MedicineEntity } from './medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private repository: Repository<MedicineEntity>,
  ) {}

  async findAll(): Promise<MedicineEntity[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<MedicineEntity> {
    try {
      const medicine = await this.repository.findOne(id);
      if (!medicine) {
        throw new BadRequestException('Medicine not found');
      }
      return medicine;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(data: CreateMedicineInput): Promise<MedicineEntity> {
    try {
      const medicine = this.repository.create(data);
      return this.repository.save(medicine);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: UpdateMedicineInput): Promise<MedicineEntity> {
    try {
      const medicine = await this.findById(id);

      if (!medicine) {
        throw new BadRequestException('Medicine not found');
      }

      return this.repository.save({ ...medicine, ...data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const medicine = await this.findById(id);

      if (!medicine) {
        throw new BadRequestException('Medicine not found');
      }

      return await this.repository.remove(medicine);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
