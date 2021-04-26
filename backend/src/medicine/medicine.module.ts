import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineEntity } from './medicine.entity';
import { MedicineResolver } from './medicine.resolver';
import { MedicineService } from './medicine.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineEntity])],
  providers: [MedicineService, MedicineResolver],
})
export class MedicineModule {}
