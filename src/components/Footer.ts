import { pubSubEvents } from '../events';
import { htmlToElement } from '../utils';

export function Footer() {
  const footer = htmlToElement(
    `<footer class="email-input__actions-container"></footer>`
  );

  const addEmailButton = htmlToElement(
    `<button class="email-input__button">Add email</button>`
  );

  addEmailButton.addEventListener('click', () => {
    pubSubEvents.addRandomEmail.publish();
  });

  const countEmailsButton = htmlToElement(
    `<button class="email-input__button">Get emails count</button>`
  );

  countEmailsButton.addEventListener('click', () => {
    pubSubEvents.alertEmailsSize.publish();
  });

  footer.appendChild(addEmailButton);
  footer.appendChild(countEmailsButton);

  return footer;
}
