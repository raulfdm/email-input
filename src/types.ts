import { createAppEvents } from './events';
import { EmailModel } from './models/Email';
import { PubSub } from './utils/pubsub';

export type PrimitiveEmail = string;
export type EmailModelType = ReturnType<typeof EmailModel>;
export type EmailsType = EmailModelType[];
export type PubSubType = ReturnType<typeof PubSub>;
export type AppEvents = ReturnType<typeof createAppEvents>;
export type Event = {
  [eventName: string]: Function[];
};
