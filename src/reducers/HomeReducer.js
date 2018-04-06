import { Animated } from 'react-native';
import {
    COMPANY_SELECTED,
    START_ANIM
} from '../actions/types'

const INITIAL_STATE = {
    isInHome: true,
    startAnim: false,
    anim: new Animated.Value(1),
    fade: new Animated.Value(1)
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPANY_SELECTED:
            return { ...state, isInHome: false };
        case START_ANIM:
            return { ...state, startAnim: true}
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