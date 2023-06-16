import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailsService } from './emails.service';
import { AppConfigModule } from 'src/config';
import { AppConfigService } from 'src/config/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    MailerModule.forRootAsync({
      useFactory: async (appConfigService: AppConfigService) => ({
        transport: {
          host: appConfigService.get('EMAIL_HOST'),
          port: appConfigService.get('EMAIL_PORT'),
          auth: {
            user: appConfigService.get('EMAIL_USER'),
            pass: appConfigService.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: appConfigService.get('EMAIL_FROM'),
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      imports: [AppConfigModule],
      inject: [AppConfigService],
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
