import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ErrorMessagesEnum } from 'src/common/enums';
import { IEmailsService } from './interfaces';
import { ITemplatedEmailParams } from './interfaces/templated-email-params.interface';
import { templateSubjects } from './emails.constants';

@Injectable()
export class EmailsService implements IEmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTemplatedEmail<T extends ITemplatedEmailParams>({
    templateName,
    emails,
    context = {},
  }: T): Promise<void> {
    const subject = templateSubjects[templateName];
    if (!subject) {
      console.error(
        `Sending email error: ${ErrorMessagesEnum.INVALID_TEMPLATE_SPECIFIED} (template: ${templateName})`,
      );
      return;
    }

    this.mailerService
      .sendMail({
        to: emails,
        template: templateName,
        context,
        subject,
      })
      .catch((err) => console.error(`Sending email error: ${err}`));
  }
}
