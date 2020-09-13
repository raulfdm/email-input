import { AppEvents, PrimitiveEmail } from '../types';
export declare function Emails(appEvents: AppEvents): {
    add: (emailValue: PrimitiveEmail) => void;
    size: () => number;
    addRandom: () => void;
    remove: (email: PrimitiveEmail) => void;
    removeLast: () => void;
    list(): {
        value: string;
        isValid: boolean;
        createdAt: number;
    }[];
};
