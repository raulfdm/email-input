import { AppEvents } from '../types';
import { htmlToElement } from '../utils';
import { Emails } from './Emails';
import { Inputs } from './Inputs';

export function Body(appEvents: AppEvents) {
  const bodyNode = htmlToElement(`<div class="email-input__body"></div>`);

  const titleNode = htmlToElement(
    `<h2 class="title">Share <strong>Board name</strong> with others</h2>`
  );
  bodyNode.appendChild(titleNode);

  const emailsContainerNode = htmlToElement(
    `<div class="emails-container"></div>`
  );
  bodyNode.appendChild(emailsContainerNode);

  emailsContainerNode.addEventListener('click', function (event) {
    /**
     * This prevents incorrect event dispatch when some internal
     * element (e.g. remove button) got clicked.
     */
    if (event.target === emailsContainerNode) {
      appEvents.emailContainerClicked.publish();
    }
  });

  function renderEmails() {
    Emails({ emailsContainerNode, appEvents });
  }

  function renderInputs() {
    Inputs({ emailsContainerNode, appEvents });
  }

  renderEmails();
  renderInputs();

  return bodyNode;
}
