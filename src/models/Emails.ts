import { pubSubEvents } from '../events';
import { EmailsType, PrimitiveEmail } from '../types';
import { generateRandomEmail, isFalsy, sanitizeEmail } from '../utils';
import { EmailModel } from './Email';

export function Emails() {
  let emails: EmailsType = [];

  function updateEmails(newEmailsList: EmailsType) {
    emails = newEmailsList;
    pubSubEvents.emailsUpdated.publish(emails);
  }
  function add(emailValue: PrimitiveEmail) {
    const listOfEmails = emailValue
      .split(',')
      .map(sanitizeEmail)
      .filter(isFalsy)
      .map(EmailModel);

    if (listOfEmails.length > 0) {
      updateEmails(emails.concat(listOfEmails));
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
    const nextEmails = [...emails];
    nextEmails.pop();

    updateEmails(nextEmails);
  }

  return {
    add,
    size,
    addRandom,
    remove,
    removeLast,
    get list() {
      return [...emails];
    },
  };
}
