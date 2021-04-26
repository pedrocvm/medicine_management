import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DayPeriodEnum {
  MORNING = '1',
  AFTERNOON = '2',
  NIGHT = '3',
}

registerEnumType(DayPeriodEnum, {
  name: 'DayPeriodEnum',
});

@ObjectType()
@Entity('medicine')
export class MedicineEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    enum: DayPeriodEnum,
  })
  dayPeriod: DayPeriodEnum;

  @Column()
  doses: number;

  @Column()
  interval: number;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
