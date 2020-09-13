export declare function PubSub(): {
    subscribe: (eventName: string, fn: Function) => void;
    publish: <T>(eventName: string, data?: T | undefined) => void;
};
