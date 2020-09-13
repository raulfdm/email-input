import { EmailsInput } from './components/EmailsInput';
import { pubSubEvents } from './events';
import { emailsState } from './state';

function EmailsInputLib(node: HTMLElement) {
  pubSubEvents.alertEmailsSize.subscribe(() => {
    alert(`Total emails: ${emailsState.size()}`);
  });

  node.appendChild(EmailsInput());
}

/* Needs to be default to be able to access globally */
export default EmailsInputLib;
