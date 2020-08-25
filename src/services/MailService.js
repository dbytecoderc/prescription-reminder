import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
import sendGridMail from '@sendgrid/mail';
import fs from 'fs';

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

class mailService {
  static send(emailTemplate, mailData) {
    const parsedTemplate = this.parseEmailTemplate(emailTemplate);
    return sendGridMail.send({
      ...mailData,
      html: parsedTemplate || '',
    });
  }

  static getEmailTemplate(templateName) {
    try {
      const file = path.join(__dirname, `./templates/${templateName}`);
      const emailTemplate = fs.readFileSync(file, 'utf-8');

      return emailTemplate;
    } catch (error) {
      return null;
    }
  }

  static parseEmailTemplate(emailTemplate) {
    let template = this.getEmailTemplate(emailTemplate.name);

    if (!template) throw new Error('email template not found');

    Object.keys(emailTemplate.data).forEach((key) => {
      const regex = new RegExp(`{{\.\*${key}\.\*}}`, 'g');

      template = template.replace(regex, emailTemplate.data[key]);
    });

    return template;
  }

  static async remind(receiver, template, usage, duration) {
    return await this.send(
      {
        name: template,
        data: {
          usage,
          duration,
        },
      },
      {
        from: 'dev@hagglex.com',
        to: receiver,
        subject: 'PRESCRIPTION REMINDER',
      },
    )
      .then(() => true)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

export default mailService;
