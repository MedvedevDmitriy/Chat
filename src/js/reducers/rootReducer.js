import config from '../config/config';
import constants from '../constants/constants';
import { combineReducers } from 'redux';
import lang from '../languages/english/en';

const configReducer = (state = config, action) => {
    switch(action.type) {
        case constants.TOGGLE_CHAT_MODULE: {
            return {
                ...state,
                activeBlocks: {
                    ...state.activeBlocks,
                    chat: !state.activeBlocks.chat
                }
            }
        }
        case constants.SET_STATUS_STORE: {
            return {
                ...state,
                modules: {
                    ...state.modules,
                    header: {
                        ...state.modules.header,
                        status: action.payload,
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
};

const languageReducer = (state = lang, action) => {
    switch(action.type) {
        case constants.CHANGE_LANGUAGE: {
            return {...action.payload}
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    config: configReducer,
    strings: languageReducer,
})