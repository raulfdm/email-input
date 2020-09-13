import { pubSubEvents } from '../events';
import { EmailModelType } from '../types';
import { htmlToElement } from '../utils';

function RemoveButton(email: EmailModelType['value']) {
  const button = htmlToElement(`
    <span class="email-tag__remove-button">
      <svg width="8" height="8" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z"
          fill="currentColor"
        />
      </svg>
    </span>
  `);

  button.addEventListener('click', () => {
    pubSubEvents.removeEmail.publish(email);
  });

  return button;
}

function Email(email: EmailModelType) {
  const containerNode = htmlToElement(
    `<span class="email-tag ${!email.isValid ? 'invalid' : ''}"></span>`
  );
  const emailNode = htmlToElement(
    `<span class="email-tag__text">${email.value}</span>`
  );

  const closeButtonNode = RemoveButton(email.value);

  containerNode.appendChild(emailNode);
  containerNode.appendChild(closeButtonNode);

  return containerNode;
}

export function Emails() {
  const emailsContainerNode = htmlToElement(`<div class="emails"></div>`);

  pubSubEvents.emailsUpdated.subscribe((emails) => {
    // It needed to be cleaned up to avoid duplicity
    emailsContainerNode.innerHTML = '';

    for (const email of emails) {
      const emailModel = Email(email);
      emailsContainerNode.appendChild(emailModel);
    }
  });

  return emailsContainerNode;
}
