import { ReferralStatus } from '../enums/ReferralStatus.enum';
import { ReferralDetails } from '../interfaces/ReferralDetails.interface';
import { ReferralComment } from './Comment.type';

export type Referral = {
  id: string;
  reference: string;
  refereeId: string;
  details: ReferralDetails;
  status: ReferralStatus;
  comments: Array<ReferralComment>;
  createdAt: string;
  updatedAt?: string;
  withdrawnAt?: string;
};
