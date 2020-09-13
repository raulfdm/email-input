import { AppEvents, PrimitiveEmail } from '../types';
import { htmlToElement } from '../utils';

export function Inputs({
  emailsContainerNode,
  appEvents,
}: {
  emailsContainerNode: HTMLElement;
  appEvents: AppEvents;
}) {
  const mainInputNode = htmlToElement(
    `<input class="input" type="text" placeholder="add more people… " />`
  ) as HTMLInputElement;

  const hiddenInput = htmlToElement(
    `<input type="hidden" name="emails-input" />`
  ) as HTMLInputElement;

  appEvents.emailsUpdated.subscribe((emails) => {
    const serializedEmails = emails.map((e) => e.value).join(',');
    hiddenInput.value = serializedEmails;
  });

  mainInputNode.addEventListener('paste', (event) => {
    /**
     * MDN Implementation
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
     */
    const pastedValue = (event.clipboardData || window.clipboardData).getData(
      'text'
    );

    onNewEmail(pastedValue);
    /**
     * Prevents the event to add in the input the user text because it's already
     * has been handled by onNewEmail flow
     */
    event.preventDefault();
  });

  function focusMainInput() {
    mainInputNode.focus();
  }

  function onNewEmail(emailValue: PrimitiveEmail) {
    mainInputNode.value = '';
    appEvents.addNewEmail.publish(emailValue);
    focusMainInput();
  }

  mainInputNode.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'Backspace': {
        /**
         * We only want to remove last element if
         * there is nothing being typed on the input
         */
        if (mainInputNode.value.length === 0) {
          appEvents.removeLastEmail.publish();
          focusMainInput();
        }
        break;
      }
      case 'Comma':
      case 'Enter': {
        /**
         * This prevents:
         * - (comma case) adding "," into the input
         * - (enter) submitting form if input is inside
         */
        event.preventDefault();
        onNewEmail(mainInputNode.value);
        break;
      }
      default:
        break;
    }
  });

  mainInputNode.addEventListener('focusout', () => {
    if (mainInputNode.value.length > 0) {
      onNewEmail(mainInputNode.value);
    }
  });

  appEvents.removeEmail.subscribe(() => {
    focusMainInput();
  });

  appEvents.emailContainerClicked.subscribe(() => {
    focusMainInput();
  });

  emailsContainerNode.appendChild(hiddenInput);
  emailsContainerNode.appendChild(mainInputNode);
}
