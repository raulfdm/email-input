import { EmailsType, PrimitiveEmail, PubSubType } from './types';
export declare function createAppEvents(pubsub: PubSubType): {
    emailsUpdated: {
        subscribe(fn: (emails: EmailsType) => void): void;
        publish(emails: EmailsType): void;
    };
    emailContainerClicked: {
        subscribe(fn: () => void): void;
        publish(): void;
    };
    addNewEmail: {
        publish(emailValue: PrimitiveEmail): void;
        subscribe(fn: (emailValue: PrimitiveEmail) => void): void;
    };
    addRandomEmail: {
        publish(): void;
        subscribe(fn: () => void): void;
    };
    removeLastEmail: {
        publish(): void;
        subscribe(fn: () => void): void;
    };
    removeEmail: {
        publish(email: PrimitiveEmail): void;
        subscribe(fn: (email: PrimitiveEmail) => void): void;
    };
    alertEmailsSize: {
        publish(): void;
        subscribe(fn: () => void): void;
    };
};
