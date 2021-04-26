import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMedicineInput } from './create-medicine.input';

@InputType()
export class UpdateMedicineInput extends PartialType(CreateMedicineInput) {}
