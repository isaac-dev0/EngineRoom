import { Child } from '../types/Child.type';
import { Parent } from '../types/Parent.type';

export interface ReferralDetails {
  parents: Array<Parent>;
  children: Array<Child>;
  postcode: string;
  referralReason: string;
  hasReferredBefore: boolean;
}
