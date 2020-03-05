import { IUser } from '../user';
import { IVisit } from '../visit';

export interface IPharmacist extends IUser {
  currentVisit: IVisit;
  consultationHistory: IVisit[];
}
