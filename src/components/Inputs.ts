import { pubSubEvents } from '../events';
import { PrimitiveEmail } from '../types';
import { htmlToElement } from '../utils';

export function Inputs() {
  const inputContainerNode = htmlToElement(`<div class="inputs"></div>`);

  const mainInputNode = htmlToElement(
    `<input class="input" type="text" placeholder="add more people… " />`
  ) as HTMLInputElement;

  const hiddenInput = htmlToElement(
    `<input type="hidden" name="emails-input" />`
  ) as HTMLInputElement;

  pubSubEvents.emailsUpdated.subscribe((emails) => {
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
    pubSubEvents.addNewEmail.publish(emailValue);
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
          pubSubEvents.removeLastEmail.publish();
          focusMainInput();
        }
        break;
      }
      case 'Comma': {
        onNewEmail(mainInputNode.value);
        /**
         * Prevents the event to add a comma into the input
         */
        event.preventDefault();
        break;
      }
      case 'Enter': {
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

  inputContainerNode.appendChild(hiddenInput);
  inputContainerNode.appendChild(mainInputNode);

  return inputContainerNode;
}
