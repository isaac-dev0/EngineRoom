import { ReferralStatus } from '../enums/ReferralStatus.enum';
import { ReferralDetails } from '../interfaces/ReferralDetails.interface';

export type Referral = {
  id: string;
  reference: string;
  refereeId: string;
  details: ReferralDetails;
  status: ReferralStatus;
  createdAt: string;
  updatedAt?: string;
  withdrawnAt?: string;
};
