export const getData = () => ({ type: 'GET_DATA' });
export const setStatus = payload => ({ type: 'SET_STATUS', payload });
export const addNewUser = () => ({ type: 'ADD_NEW_USER' });
export const addNewMessage = payload => ({ type: 'ADD_NEW_MESSAGE', payload });
export const initConnection = () => ({ type: 'INIT_CONNECTION' });
export const setNewUserStore = payload => ({ type: 'SET_NEW_USER_STORE', payload });
export const toggleChatModule = () => ({ type: 'TOGGLE_CHAT_MODULE' });
export const addNewMessageStore = payload => ({ type: 'ADD_NEW_MESSAGE_STORE', payload });
export const changeStateSelectedUser = payload => ({ type: 'CHANGE_STATE_SELECTED_USER', payload });
