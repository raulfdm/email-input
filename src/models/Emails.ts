import {
  AppEvents,
  EmailModelType,
  EmailsType,
  PrimitiveEmail,
} from '../types';
import { generateRandomEmail, isFalsy, sanitizeEmail } from '../utils';
import { EmailModel } from './Email';

function createdAtAscend(x: EmailModelType, y: EmailModelType) {
  if (x.createdAt < y.createdAt) {
    return -1;
  }
  if (x.createdAt > y.createdAt) {
    return 1;
  }
  return 0;
}

export function Emails(appEvents: AppEvents) {
  let emails: EmailsType = [];

  function updateEmails(newEmailsList: EmailsType) {
    emails = newEmailsList.sort(createdAtAscend);
    // Do I need to call this event here?
    appEvents.emailsUpdated.publish(emails);
  }

  function add(emailValue: PrimitiveEmail) {
    const listOfEmails = emailValue
      .split(',')
      .map(sanitizeEmail)
      .filter(isFalsy)
      .map(EmailModel);

    if (listOfEmails.length > 0) {
      const next = emails.concat(listOfEmails);

      updateEmails(next);
    }
  }

  function addRandom() {
    const randomEmail = generateRandomEmail();

    add(randomEmail);
  }

  function size() {
    return emails.filter((e) => e.isValid).length;
  }

  function remove(email: PrimitiveEmail) {
    const filteredEmails = emails.filter((e) => e.value !== email);
    updateEmails(filteredEmails);
  }

  function removeLast() {
    const nextEmails = [...emails].sort(createdAtAscend);
    nextEmails.pop();

    updateEmails(nextEmails);
  }

  return {
    add,
    size,
    addRandom,
    remove,
    removeLast,
    list() {
      return [...emails];
    },
  };
}
