import { Emails } from './Emails';

describe('Emails Model', () => {
  describe('getter: list', () => {
    it('returns the list of emails', () => {
      const emails = Emails();

      expect(emails.list).toEqual([]);
    });
  });

  describe('fn: add', () => {
    it('adds single element into the list', () => {
      const emails = Emails();

      emails.add('raul@gmail.com');
      emails.add('anotheremail@gmail.com');
      emails.add('invalid.div');

      expect(emails.list).toHaveLength(3);
      expect(emails.list).toMatchInlineSnapshot(`
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
      const emails = Emails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, really invalid'
      );

      expect(emails.list).toHaveLength(5);

      expect(emails.list).toMatchInlineSnapshot(`
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
      const emails = Emails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, '
      );

      expect(emails.list).toHaveLength(4);
      expect(emails.list).toMatchInlineSnapshot(`
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
      expect(emails.list).toHaveLength(3);
      expect(emails.list).toMatchInlineSnapshot(`
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
      const emails = Emails();

      emails.addRandom();
      emails.addRandom();
      emails.addRandom();
      emails.addRandom();

      expect(emails.list).toHaveLength(4);
      expect(emails.list.filter((e) => e.isValid)).toHaveLength(4);
    });
  });

  describe('fn: remove', () => {
    it('removes email received', () => {
      const emails = Emails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div,'
      );

      expect(emails.list).toHaveLength(4);
    });
  });

  describe('fn: removeLast', () => {
    it('remove the last element from the list', () => {
      const emails = Emails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div,'
      );

      expect(emails.list).toHaveLength(4);
      expect(emails.list).toMatchInlineSnapshot(`
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

      expect(emails.list).toHaveLength(3);
      expect(emails.list).toMatchInlineSnapshot(`
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
      const emails = Emails();

      emails.add(
        'raul@gmail.com,anotheremail@gmail.com, someone@hotmail.com,invalid.div, really invalid'
      );

      expect(emails.size()).toBe(3);
    });
  });
});
