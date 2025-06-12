import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReferralDetails } from './referral-details.entity';
import { ReferralStatus } from '../model/enums/ReferralStatus.enum';
import { Comment } from './comment.entity';

@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  reference: string;

  @Column()
  refereeId: string;

  @OneToOne(() => ReferralDetails, (details) => details.referral, {
    cascade: true,
    eager: true,
  })
  details: ReferralDetails;

  @Column({
    type: 'enum',
    enum: ReferralStatus,
    default: ReferralStatus.PENDING,
  })
  status: ReferralStatus;

  @OneToMany(() => Comment, (comment) => comment.referral, {
    cascade: true,
    eager: true,
  })
  comments: Array<Comment>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: string;

  @Column({ type: 'timestamptz', nullable: true })
  withdrawnAt?: string;
}
