import { applyMiddleware, createStore } from 'redux';
import rootSaga from '../js/rootSaga/rootSaga';
import rootReducer from '../js/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import en from '../js/languages/english/en';
// import logo from '../../assets/react-logo.svg';

const initialState = {
    users: [
        {name: '@john_123', isSelected: true},
        {name: '@alex_345', isSelected: false},
        {name: '@fred_678', isSelected: false},
    ],
    config: {
        activeBlocks: {
            chat: true,
        },
        modules: {
            chat: {
                isActive: true,
            },
            sidebar: {
                isActive: true,
            },
            header: {
                // logo: logo,
                status: '',
                isActive: true,
            },
            footer: {
                isActive: true,
            }
        }
    },
    strings: en,
    messages: [
        {
            text: 'Hello everyone',
            author: '@john_123',
            datetime: 1547303615302,
        },
        {
            text: 'Hi John',
            author: '@alex_345',
            datetime: 1547303815302,
        }
    ],
};

const sagaMiddleware = createSagaMiddleware();

global.store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
