import { pubSubEvents } from './events';
import { Emails } from './models/Emails';

export const emailsState = Emails();

pubSubEvents.addRandomEmail.subscribe(() => {
  emailsState.addRandom();
});

pubSubEvents.addNewEmail.subscribe((emailValue) => {
  emailsState.add(emailValue);
});

pubSubEvents.removeLastEmail.subscribe(() => {
  emailsState.removeLast();
});

pubSubEvents.removeEmail.subscribe((email) => {
  emailsState.remove(email);
});
