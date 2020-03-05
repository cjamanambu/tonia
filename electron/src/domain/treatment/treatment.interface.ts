import { IVisit } from '../visit';

export interface ITreatment {
  id: string;
  medicine: string;
  formulation: string;
  dose: string;
  tbd: string;
  duration: string;
  visit: IVisit;
  createdAt: Date;
}
