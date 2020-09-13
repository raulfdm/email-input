type Event = {
  [eventName: string]: Function[];
};

export const pubsub = {
  events: {} as Event,
  subscribe(eventName: string, fn: Function) {
    const fns = pubsub.events[eventName] || [];
    fns.push(fn);

    pubsub.events[eventName] = fns;
  },
  publish<T>(eventName: string, data?: T) {
    console.log('PUBLISHED:', eventName);
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  },
};
