import { AppEvents } from '../types';
import { htmlToElement } from '../utils';

export function Footer(appEvents: AppEvents) {
  const footer = htmlToElement(
    `<footer class="emails-input__actions-container"></footer>`
  );

  const addEmailButton = htmlToElement(
    `<button class="emails-input__button" type="button">Add email</button>`
  );

  addEmailButton.addEventListener('mousedown', (event) => {
    appEvents.addRandomEmail.publish();

    event.preventDefault();
  });

  const countEmailsButton = htmlToElement(
    `<button class="emails-input__button" type="button">Get emails count</button>`
  );

  countEmailsButton.addEventListener('mousedown', (event) => {
    appEvents.alertEmailsSize.publish();

    event.preventDefault();
  });

  footer.appendChild(addEmailButton);
  footer.appendChild(countEmailsButton);

  return footer;
}
