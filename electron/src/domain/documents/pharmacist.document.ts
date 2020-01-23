import { UserDocument } from './user.document';
import { TreatmentDocument } from './treatment.document';
import { AccountDocument } from './account.document';

export class PharmacistDocument {

  constructor(
    public userInfo: UserDocument,
    public treatments: TreatmentDocument[],
    public account: AccountDocument,
  ) {}
}
