import { TemplateNameEnum } from './enums';

const EMAIL_WELCOMING_APP_NAME = 'Ecstasify🎵';

export const templateSubjects: { [key in TemplateNameEnum]: string } = {
  [TemplateNameEnum.TEST]: `${EMAIL_WELCOMING_APP_NAME}: Test email`,
  [TemplateNameEnum.USER_REGISTERED]: `${EMAIL_WELCOMING_APP_NAME}: Welcome`,
};
