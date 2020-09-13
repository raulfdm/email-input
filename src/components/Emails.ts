import { AppEvents, EmailModelType } from '../types';
import { htmlToElement } from '../utils';

function RemoveButton({
  email,
  appEvents,
}: {
  email: EmailModelType['value'];
  appEvents: AppEvents;
}) {
  const button = htmlToElement(`
    <span class="email-tag__remove-button" role="button" tabindex="0">
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

  button.addEventListener('mousedown', (event) => {
    appEvents.removeEmail.publish(email);

    /**
     * Prevents trigger submit events
     */
    event.preventDefault();
  });

  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      appEvents.removeEmail.publish(email);
      /**
       * Prevents trigger submit events
       */
      event.preventDefault();
    }
  });

  return button;
}

function Email({
  email,
  appEvents,
}: {
  email: EmailModelType;
  appEvents: AppEvents;
}) {
  const containerNode = htmlToElement(`<span class="email-tag"></span>`);

  if (!email.isValid) {
    containerNode.classList.add('invalid');
  }

  const emailNode = htmlToElement(
    `<span class="email-tag__text">${email.value}</span>`
  );

  const removeButton = RemoveButton({ email: email.value, appEvents });

  containerNode.appendChild(emailNode);
  containerNode.appendChild(removeButton);

  return containerNode;
}

export function Emails({
  emailsContainerNode,
  appEvents,
}: {
  emailsContainerNode: HTMLElement;
  appEvents: AppEvents;
}) {
  function removeExistingTags() {
    const nodes: Element[] = [];

    // IE11 compatibility
    // const nodes = Array.from(
    //   emailsContainerNode.querySelectorAll('.email-tag')
    // );
    const tags = emailsContainerNode.querySelectorAll('.email-tag');
    for (let index = 0; index < tags.length; index++) {
      nodes.push(tags[index]);
    }

    if (tags.length > 0) {
      for (const node of nodes) {
        // IE11 compatibility
        // node.remove();
        node.parentNode!.removeChild(node);
      }
    }
  }

  appEvents.emailsUpdated.subscribe((emails) => {
    removeExistingTags();

    const emailsNode = emails.map((e) => Email({ email: e, appEvents }));

    // IE11 compatibility
    // emailsContainerNode.prepend(...emailsNode);
    emailsNode.reverse().forEach((node) => {
      /**
       * afterbegin because I want the inputs to be the last element in
       * the field
       */
      emailsContainerNode.insertAdjacentElement('afterbegin', node);
    });
  });

  return emailsContainerNode;
}
