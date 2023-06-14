import { TemplateNameEnum } from '../enums';
import {
  IEmailContext,
  ITestEmailContext,
  IUserRegisteredEmailContext,
} from './email-context.interface';

export interface ITemplatedEmailParams {
  templateName: string;
  emails: string[];
  context?: IEmailContext;
}

export interface ITestEmailParams extends ITemplatedEmailParams {
  templateName: TemplateNameEnum.TEST;
  context: ITestEmailContext;
}

export interface IUserRegisteredEmailParams extends ITemplatedEmailParams {
  templateName: TemplateNameEnum.USER_REGISTERED;
  context: IUserRegisteredEmailContext;
}
