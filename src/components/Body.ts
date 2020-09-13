import { pubSubEvents } from '../events';
import { htmlToElement } from '../utils';
import { Emails } from './Emails';
import { Inputs } from './Inputs';
import { Title } from './Title';

export function Body() {
  const bodyNode = htmlToElement(`<div class="email-input__body"></div>`);
  bodyNode.appendChild(Title());

  const emailsContainer = htmlToElement(`<div class="emails-container"></div>`);
  bodyNode.appendChild(emailsContainer);

  emailsContainer.addEventListener('click', function (event) {
    /**
     * This prevents incorrect event dispatch when some internal
     * element (e.g. remove button) got clicked.
     */
    if (event.target === emailsContainer) {
      pubSubEvents.emailContainerClicked.publish();
    }
  });

  function renderEmails() {
    const emailsContainerNode = Emails();
    emailsContainer.appendChild(emailsContainerNode);
  }

  function renderInputs() {
    const inputsContainerNode = Inputs();
    emailsContainer.appendChild(inputsContainerNode);
  }

  renderEmails();
  renderInputs();

  return bodyNode;
}
