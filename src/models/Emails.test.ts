import { createAppEvents } from '../events';
import { PubSub } from '../pubsub';
import { Emails } from './Emails';

function getEmails() {
  const pubSub = PubSub();
  const appEvents = createAppEvents(pubSub);
  return Emails(appEvents);
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
      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888477,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888479,
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "createdAt": 1599996888480,
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

      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888488,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888488,
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "createdAt": 1599996888488,
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "createdAt": 1599996888488,
            "isValid": false,
            "value": "invalid.div",
          },
          Object {
            "createdAt": 1599996888488,
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
      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888490,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888490,
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "createdAt": 1599996888490,
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "createdAt": 1599996888490,
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);

      emails.remove('anotheremail@gmail.com');
      expect(emails.list()).toHaveLength(3);
      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888490,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888490,
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "createdAt": 1599996888490,
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
      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888498,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888498,
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "createdAt": 1599996888498,
            "isValid": true,
            "value": "someone@hotmail.com",
          },
          Object {
            "createdAt": 1599996888498,
            "isValid": false,
            "value": "invalid.div",
          },
        ]
      `);

      emails.removeLast();

      expect(emails.list()).toHaveLength(3);
      expect(emails.list()).toMatchInlineSnapshot(`
        Array [
          Object {
            "createdAt": 1599996888498,
            "isValid": true,
            "value": "raul@gmail.com",
          },
          Object {
            "createdAt": 1599996888498,
            "isValid": true,
            "value": "anotheremail@gmail.com",
          },
          Object {
            "createdAt": 1599996888498,
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
