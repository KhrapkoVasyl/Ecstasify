import { ITemplatedEmailParams } from './templated-email-params.interface';

export interface IEmailsService {
  sendTemplatedEmail<T extends ITemplatedEmailParams>(params: T): Promise<void>;
}
