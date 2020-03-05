import { IVisitInput } from './visit.input';
import { IVisit } from './visit.interface';

export interface IVisitService {
  createAndSave(visitInput: IVisitInput): Promise<IVisit>;
}
