import { IVisit } from '../visit';

export interface IHistory {
  id: string;
  medicalHistory: string;
  medicationHistory: string;
  familyHistory: string;
  visitHistory: IVisit[];
}
