import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { DayPeriodEnum } from '../medicine.entity';

@InputType()
export class CreateMedicineInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Day Period is required' })
  dayPeriod: DayPeriodEnum;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Interval is required' })
  interval: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Number of Doses is required' })
  doses: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}
