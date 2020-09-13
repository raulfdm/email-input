import { EmailsInput } from './components/EmailsInput';
import { createAppEvents } from './events';
import { Emails } from './models/Emails';
import { PubSub } from './utils/pubsub';

function EmailsInputLib(node: HTMLElement) {
  const pubsubChannel = PubSub();
  const appEvents = createAppEvents(pubsubChannel);

  const emailsState = Emails(appEvents);

  appEvents.addRandomEmail.subscribe(() => {
    emailsState.addRandom();
  });

  appEvents.addNewEmail.subscribe((emailValue) => {
    emailsState.add(emailValue);
  });

  appEvents.removeLastEmail.subscribe(() => {
    emailsState.removeLast();
  });

  appEvents.removeEmail.subscribe((email) => {
    emailsState.remove(email);
  });

  appEvents.alertEmailsSize.subscribe(() => {
    alert(`Total emails: ${emailsState.size()}`);
  });

  const emailsInputNode = EmailsInput(appEvents);
  node.insertAdjacentElement('afterbegin', emailsInputNode);

  return emailsInputNode;
}

/* Needs to be default to be able to access globally */
export default EmailsInputLib;
