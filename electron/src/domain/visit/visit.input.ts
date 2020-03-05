import { IPharmacist } from '../pharmacist';
import { IPatient } from '../patient';
import { ITreatment } from '../treatment';

export interface IVisitInput {
  indication: string;
  proviDiagnosis: string;
  finalDiagnosis: string;
  pharmacist: IPharmacist;
  patient: IPatient;
  treatment: ITreatment;
}
