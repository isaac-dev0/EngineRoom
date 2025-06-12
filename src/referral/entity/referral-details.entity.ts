import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferralDetails as ReferralDetailsInterface } from '../model/interfaces/ReferralDetails.interface';
import { Parent } from '../model/types/Parent.type';
import { Child } from '../model/types/Child.type';
import { Referral } from './referral.entity';

@Entity('referral_details')
export class ReferralDetails implements ReferralDetailsInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false })
  parents: Array<Parent>;

  @Column('jsonb', { nullable: false })
  children: Array<Child>;

  @Column({ length: 20 })
  postcode: string;

  @Column('text')
  referralReason: string;

  @Column('boolean')
  hasReferredBefore: boolean;

  @OneToOne(() => Referral, (referral) => referral.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  referral: Referral;
}
