import { Event } from '../types';

export function PubSub() {
  const events = {} as Event;

  function subscribe(eventName: string, fn: Function) {
    const fns = events[eventName] || [];
    fns.push(fn);

    events[eventName] = fns;
  }

  function publish<T>(eventName: string, data?: T) {
    if (events[eventName]) {
      events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }

  return {
    subscribe,
    publish,
  };
}
