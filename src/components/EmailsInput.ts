import { htmlToElement } from '../utils';

import { Footer } from './Footer';
import { Body } from './Body';
import { AppEvents } from '../types';

export function EmailsInput(appEvents: AppEvents) {
  const emailsInputNode = htmlToElement(
    `<section class="email-input__card" data-name="emails-input"></section>`
  );

  const footerNode = Footer(appEvents);
  const bodyNode = Body(appEvents);

  emailsInputNode.appendChild(bodyNode);
  emailsInputNode.appendChild(footerNode);

  return emailsInputNode;
}
