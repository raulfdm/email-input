import { createAppEvents } from '../events';
import { EmailModelType } from '../types';
import { PubSub } from '../utils/pubsub';
import { Emails } from './Emails';

function getEmails() {
  const pubSub = PubSub();
  const appEvents = createAppEvents(pubSub);
  return Emails(appEvents);
}

/**
 * This method only exists to make easier snapshot, otherwise,
 * every time which we run the tests `createdAt` will be different
 * since it's based on Date().getTime
 *
 * mockDate won't proper work because it'll mock for every element
 * the same information and some functionality relies on
 * createdAt (e.g. removeLast)
 */
function omitCreatedAt(emailValue: EmailModelType) {
  const { createdAt, ...email } = emailValue;

  return email;
}

describe('Emails Model', () => {
  describe('fn: list', () => {
    it('returns the list of emails', () => {
      const emails = getEmails();

      expect(emails.list()).toEqual([]);
    });
  });

  describe('fn: add', () => {
    it('adds single element into the list', () => {
      const emails = getEmails();

      emails.add('raul@gmail.com');
      emails.add('anotheremail@gmail.com');
      emails.add('invalid.div');

      expect(emails.list()).toHaveLength(3);
      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);
    });

    it('adds multiple elements when value is comma based', () => {
      const emails = getEmails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, really invalid'
      );

      expect(emails.list()).toHaveLength(5);

      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "isValid": false,
            "value": "invalid.div",
          },
          Object {
            "isValid": false,
            "value": "really invalid",
          },
        ]
      `);
    });

    it('ignores empty element after comma', () => {
      const emails = getEmails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, '
      );

      expect(emails.list()).toHaveLength(4);
      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);

      emails.remove('anotheremail@gmail.com');
      expect(emails.list()).toHaveLength(3);
      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);
    });
  });

  describe('fn: addRandom', () => {
    it('add random valid emails', () => {
      const emails = getEmails();

      emails.addRandom();
      emails.addRandom();
      emails.addRandom();
      emails.addRandom();

      expect(emails.list()).toHaveLength(4);
      expect(emails.list().filter((e) => e.isValid)).toHaveLength(4);
    });
  });

  describe('fn: remove', () => {
    it('removes email received', () => {
      const emails = getEmails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div,'
      );

      expect(emails.list()).toHaveLength(4);
    });
  });

  describe('fn: removeLast', () => {
    it('remove the last element from the list', () => {
      const emails = getEmails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div,'
      );

      expect(emails.list()).toHaveLength(4);
      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);

      emails.removeLast();

      expect(emails.list()).toHaveLength(3);
      expect(emails.list().map(omitCreatedAt)).toMatchInlineSnapshot(`
        Array [
          Object {
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "isValid": true,
            "value": "someone@hotmail.com",
          },
        ]
      `);
    });
  });

  describe('fn: size', () => {
    it('returns the number of valid elements', () => {
      const emails = getEmails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, really invalid'
      );

      expect(emails.size()).toBe(3);
    });
  });
});
