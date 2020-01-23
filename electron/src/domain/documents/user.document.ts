import { ContactInfo } from '../data/contact-info.data';
import { AccountDocument } from './account.document';

export class UserDocument {

  constructor(
    public userID: string,
    public name: string,
    public contactInfo: ContactInfo,
  ) { }

}
