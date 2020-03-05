import { IUser } from '../user';
import { IVisit } from '../visit';
import { IHistory } from '../history';

export interface IPatient extends IUser {
  currentVisit: IVisit;
  patientHistory: IHistory;
}
