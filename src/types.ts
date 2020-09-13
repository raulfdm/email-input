import { EmailModel } from './models/Email';

export type PrimitiveEmail = string;
export type EmailModelType = ReturnType<typeof EmailModel>;
export type EmailsType = EmailModelType[];
