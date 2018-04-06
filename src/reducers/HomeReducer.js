import { Animated } from 'react-native';
import {
    GO_TO_DETAILS,
    Go_TO_HOME,
    START_ANIM,
    FINISH_REVERSE
} from '../actions/types'

const INITIAL_STATE = {
    isInHome: true,
    startAnim: false,
    anim: new Animated.Value(1),
    fade: new Animated.Value(1),
    shouldReverse: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GO_TO_DETAILS:
            return { ...state, isInHome: false };
        case Go_TO_HOME:
            return {...state, isInHome: true, shouldReverse : true, startAnim: false};
        case START_ANIM:
            return { ...state, startAnim: true}
        case FINISH_REVERSE:
            return {...state, shouldReverse : false}
        // case PASSWORD_CHANGED:
        //     return { ...state, password: action.payload };
        // case LOGIN_USER_SUCCESS:
        //     return { ...state, ...INITIAL_STATE, user: action.payload};
        // case LOGIN_USER_FAIL:
        //     return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        // case LOGIN_USER:
        //     return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};