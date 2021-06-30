import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateMedicineInput, UpdateMedicineInput } from './input';
import { MedicineEntity } from './medicine.entity';
import { MedicineService } from './medicine.service';

@Resolver('medicine')
export class MedicineResolver {
  constructor(private readonly service: MedicineService) {}

  @Query(() => [MedicineEntity])
  async findAllMedicine(): Promise<MedicineEntity[]> {
    return await this.service.findAll();
  }

  @Query(() => MedicineEntity)
  async findMedicine(@Args('id') id: string): Promise<MedicineEntity> {
    return this.service.findById(id);
  }

  @Mutation(() => MedicineEntity)
  async createMedicine(
    @Args('data') data: CreateMedicineInput,
  ): Promise<MedicineEntity> {
    return this.service.create(data);
  }

  @Mutation(() => MedicineEntity)
  async updateMedicine(
    @Args('id') id: string,
    @Args('data') data: UpdateMedicineInput,
  ): Promise<MedicineEntity> {
    return this.service.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteMedicine(@Args('id') id: string): Promise<true> {
    await this.service.delete(id);
    return true;
  }
}
