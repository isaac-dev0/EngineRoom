import { Gender } from '../enums/Gender.enum';
import { Pack } from '../enums/Pack.enum';
import { Clothing } from './Clothing.type';

export type Parent = {
  forename: string;
  surname: string;
  dateOfBirth: string;
  gender: Gender;
  clothing: Array<Clothing>;
  packs: Array<Pack>;
};
