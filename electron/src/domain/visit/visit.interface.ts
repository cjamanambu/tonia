import { ITreatment } from '../treatment';
import { IPharmacist } from '../pharmacist';
import { IPatient } from '../patient';

export interface IVisit {
  id: string;
  indication: string;
  proviDiagnosis: string;
  finalDiagnosis: string;
  pharmacist: IPharmacist;
  patient: IPatient;
  treatment: ITreatment;
  createdAt: Date;
}
