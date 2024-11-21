import { HttpException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attempts,
  AttemptsDocument,
  AttemptStatus,
} from '../../common/schemas/attempts.schema';

@Injectable()
export class AppService {
  private transporter: Transporter;

  constructor(
    @InjectModel(Attempts.name)
    private readonly attemptsModel: Model<AttemptsDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
  }

  sendPhishingEmail(to: string, emailContent: string): Promise<any> {
    return this.transporter.sendMail({
      from: `"Sender" <${process.env.MAILER_USER}>`,
      to,
      subject: 'Test email',
      text: 'Hello, this is a test email sent via Nodemailer!',
      html: emailContent,
    });
  }

  async simulatePhishing(data: Record<string, string>) {
    const attempt = await this.saveAttempt(data.email, '', AttemptStatus.SENT);
    const emailContent = `Please, click <a href="${process.env.APP_URL}/phishing/${attempt.id}">here</a>`;
    await this.attemptsModel.updateOne(
      { _id: attempt.id },
      { content: emailContent },
    );
    attempt.content = emailContent;
    const res = await this.sendPhishingEmail(data.email, emailContent);
    if (res?.accepted[0] !== data.email) {
      throw new HttpException('Failed to send an email.', 500);
    }
    return {
      success: true,
      attempt,
    };
  }

  async saveAttempt(email: string, content: string, status: AttemptStatus) {
    const attempt = new this.attemptsModel({
      email,
      content,
      status,
    });
    return attempt.save();
  }
}
