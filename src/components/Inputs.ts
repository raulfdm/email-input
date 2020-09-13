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

  function handleKeyDown(event: KeyboardEvent) {
    function handleBackspace() {
      /**
       * We only want to remove last element if
       * there is nothing being typed on the input
       */
      if (mainInputNode.value.length === 0) {
        appEvents.removeLastEmail.publish();
        focusMainInput();
      }
    }

    function handleCommaAndEnter() {
      /**
       * This prevents:
       * - (comma case) adding "," into the input
       * - (enter) submitting form if input is inside
       */
      event.preventDefault();
      onNewEmail(mainInputNode.value);
    }

    /**
     * IE Compatibility
     * It does not supports event.code
     */
    function IEValidation() {
      const ENTER = 13;
      const COMMA = 188;
      const BACKSPACE = 8;
      switch (event.keyCode) {
        case BACKSPACE: {
          handleBackspace();
          break;
        }
        case ENTER:
        case COMMA: {
          handleCommaAndEnter();
          break;
        }
        default:
          break;
      }
    }

    function modernBrowserValidation() {
      switch (event.code) {
        case 'Backspace': {
          handleBackspace();
          break;
        }
        case 'Comma':
        case 'Enter': {
          handleCommaAndEnter();
          break;
        }
        default:
          break;
      }
    }

    if (event.code) {
      modernBrowserValidation();
    } else {
      IEValidation();
    }
  }

  mainInputNode.addEventListener('keydown', handleKeyDown);

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
