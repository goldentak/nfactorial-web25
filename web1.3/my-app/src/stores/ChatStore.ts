import { Store } from '@tanstack/store';

const LOCAL_KEY = 'chat';
const DEFAULT_CHATS = ['zhibek', 'askar', 'team-project'];

const chatStore = new Store({
    chats: JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null') || DEFAULT_CHATS,
    search: '',
});

chatStore.subscribe(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(chatStore.state.chats));
});

export default chatStore;
