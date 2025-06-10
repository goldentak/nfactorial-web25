import { Store } from '@tanstack/store';

const messageStore = new Store({
    messagesByChat: {} as Record<string, { text: string, fromUser: boolean }[]>,
});

export default messageStore;
