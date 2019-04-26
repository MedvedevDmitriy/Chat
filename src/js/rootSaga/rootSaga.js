import { all } from 'redux-saga/effects';
import watchChatSaga from '../mainComponent/saga';

export default function* watchRootSaga() {
    yield all([
        watchChatSaga()
    ]);
}