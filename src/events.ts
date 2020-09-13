import { pubsub } from './pubsub';
import { EmailsType, PrimitiveEmail } from './types';

enum events {
  ADD_NEW_EMAIL = 'ADD_NEW_EMAIL',
  REMOVE_ELEMENT = 'REMOVE_ELEMENT',

  // Used ones
  REMOVE_EMAIL = 'REMOVE_EMAIL',
  ADD_RANDOM_EMAIL = 'ADD_RANDOM_EMAIL',
  ALERT_EMAILS_SIZE = 'ALERT_EMAILS_SIZE',
  EMAILS_LIST_UPDATED = 'EMAILS_LIST_UPDATED',
  EMAIL_CONTAINER_CLICKED = 'EMAIL_CONTAINER_CLICKED',
  REMOVE_LAST_EMAIL = 'REMOVE_LAST_EMAIL',
}

export const pubSubEvents = {
  emailsUpdated: {
    subscribe(fn: (emails: EmailsType) => void) {
      pubsub.subscribe(events.EMAILS_LIST_UPDATED, fn);
    },
    publish(emails: EmailsType) {
      pubsub.publish(events.EMAILS_LIST_UPDATED, emails);
    },
  },
  emailContainerClicked: {
    subscribe(fn: () => void) {
      pubsub.subscribe(events.EMAIL_CONTAINER_CLICKED, fn);
    },
    publish() {
      pubsub.publish(events.EMAIL_CONTAINER_CLICKED, null);
    },
  },
  addNewEmail: {
    publish(emailValue: PrimitiveEmail) {
      pubsub.publish(events.ADD_NEW_EMAIL, emailValue);
    },
    subscribe(fn: (emailValue: PrimitiveEmail) => void) {
      pubsub.subscribe(events.ADD_NEW_EMAIL, fn);
    },
  },
  addRandomEmail: {
    publish() {
      pubsub.publish(events.ADD_RANDOM_EMAIL, null);
    },
    subscribe(fn: () => void) {
      pubsub.subscribe(events.ADD_RANDOM_EMAIL, fn);
    },
  },
  removeLastEmail: {
    publish() {
      pubsub.publish(events.REMOVE_LAST_EMAIL, null);
    },
    subscribe(fn: () => void) {
      pubsub.subscribe(events.REMOVE_LAST_EMAIL, fn);
    },
  },
  removeEmail: {
    publish(email: PrimitiveEmail) {
      pubsub.publish(events.REMOVE_EMAIL, email);
    },
    subscribe(fn: (email: PrimitiveEmail) => void) {
      pubsub.subscribe(events.REMOVE_EMAIL, fn);
    },
  },
  alertEmailsSize: {
    publish() {
      pubsub.publish(events.ALERT_EMAILS_SIZE, null);
    },
    subscribe(fn: () => void) {
      pubsub.subscribe(events.ALERT_EMAILS_SIZE, fn);
    },
  },
};
