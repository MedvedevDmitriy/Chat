import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './js/mainComponent/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './js/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './js/rootSaga/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <MainComponent/>
    </Provider>,
    document.getElementById('root')
);
