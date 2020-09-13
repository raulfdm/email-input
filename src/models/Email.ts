import { PrimitiveEmail } from '../types';
import { isEmailValid, sanitizeEmail } from '../utils';

export function EmailModel(email: PrimitiveEmail) {
  return {
    value: sanitizeEmail(email),
    isValid: isEmailValid(email),
    createdAt: new Date().getTime(),
  };
}
