import { createAppEvents } from './events';
import { EmailModel } from './models/Email';
import { PubSub } from './utils/pubsub';
export declare type PrimitiveEmail = string;
export declare type EmailModelType = ReturnType<typeof EmailModel>;
export declare type EmailsType = EmailModelType[];
export declare type PubSubType = ReturnType<typeof PubSub>;
export declare type AppEvents = ReturnType<typeof createAppEvents>;
export declare type Event = {
    [eventName: string]: Function[];
};
