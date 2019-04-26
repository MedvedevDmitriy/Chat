import { takeEvery, put, call, take, apply } from 'redux-saga/effects';
import constants from '../constants/constants';
// import faker from 'faker';
// import * as actions from './actions';
import { eventChannel } from 'redux-saga';

let ws = null;
let channel = null;

export default function* watchChatSaga() {
    console.log('watchChatSaga')
    // yield takeEvery(constants.SET_STATUS, setStatus);
    // yield takeEvery(constants.ADD_NEW_USER, addNewUser);
    yield takeEvery(constants.INIT_CONNECTION, initConnection);
    yield takeEvery(constants.SHOW_CONSOLE, showInConsole);
    yield takeEvery(constants.ADD_NEW_MESSAGE, sendMessage);
}

export function* sendMessage(action) {
    const message = yield apply(JSON, JSON.stringify, [action.payload]);
    yield apply(ws, ws.send, [message]);
}

// export function* addNewUser() {
//     const payload = yield apply(faker, faker.internet.userName);
//
//     yield put(actions.setNewUserStore({
//         name: `@${payload.toLocaleLowerCase()}`,
//         isSelected: false
//     }));
//     yield put(actions.addNewMessageStore({
//         text: 'HELLO EVERYBODY',
//         author: `@${payload.toLocaleLowerCase()}`,
//         datetime: new Date().getTime(),
//     }));
// }

export function* initConnection() {
    console.log('initConnection')
    channel = yield call(createWebSocket);

    while(channel) {
        const eventAction = yield take(channel);
        yield put(eventAction);
    }
}

export function createWebSocket() {
    console.log('createWebSocket')
    ws = new WebSocket('ws://localhost:4000');

    return eventChannel(emitter => {
        ws.onopen = () => {
            emitter({
                type: 'SHOW_CONSOLE',
                payload: 'ONLINE',
            });
        };

        ws.onclose = () => {
            emitter({
                type: 'SHOW_CONSOLE',
                payload: 'DISCONNECTED',
            });
        };

        ws.onmessage = response => {
            emitter({
                type: 'SHOW_CONSOLE',
                payload: response.data,
            });
        };

        return () => {
            closeWs();
        }
    })
}

export function closeWs() {
    channel.close();
    channel = null;
}

export function* showInConsole(action) {
    yield console.log(action.payload)
}

//
// export function* setStatus(action) {
//     yield put(actions.setStatusStore(action.payload));
// }
//
// export function setWs(socket) {
//     ws = socket;
// }
