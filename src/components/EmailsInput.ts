import { htmlToElement } from '../utils';

import { Footer } from './Footer';
import { Body } from './Body';

export function EmailsInput() {
  const emailsInputNode = htmlToElement(
    `<section class="email-input__card" data-name="emails-input"></section>`
  );

  const footerNode = Footer();
  const bodyNode = Body();

  emailsInputNode.appendChild(bodyNode);
  emailsInputNode.appendChild(footerNode);

  return emailsInputNode;
}
