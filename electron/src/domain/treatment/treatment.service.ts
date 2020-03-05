import { ITreatmentInput } from './treatment.input';
import { ITreatment } from './treatment.interface';

export interface ITreatmentService {
  createAndService(treatmentInput: ITreatmentInput): Promise<ITreatment>;
}
