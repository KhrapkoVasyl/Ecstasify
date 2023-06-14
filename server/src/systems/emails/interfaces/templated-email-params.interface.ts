import { TemplateNameEnum } from '../enums';
import { IEmailContext, ITestEmailContext } from './email-context.interface';

export interface ITemplatedEmailParams {
  templateName: string;
  emails: string[];
  context?: IEmailContext;
}

export interface ITestEmailParams extends ITemplatedEmailParams {
  templateName: TemplateNameEnum.TEST;
  context: ITestEmailContext;
}
