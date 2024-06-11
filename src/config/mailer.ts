import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import type { MailerOptions } from "@nestjs-modules/mailer";
import * as dotenv from "dotenv";

dotenv.config();
//
const mailerOptions: MailerOptions = {
  transport: {
    service: "gmail",
    // host: process.env.SMTP_HOST,
    // port: +process.env.SMTP_PORT,
    // secure: +process.env.SMTP_PORT === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  defaults: {
    from: '"dravyaa.com" <noreply@dravyaa.com',
  },
  preview: process.env.NODE_ENV === "development",
  template: {
    dir: __dirname + "../../../templates",
    adapter: new HandlebarsAdapter(undefined, {
      inlineCssEnabled: true,
      inlineCssOptions: {},
    }),
    options: {
      strict: true,
    },
  },
};

//
export default mailerOptions;
