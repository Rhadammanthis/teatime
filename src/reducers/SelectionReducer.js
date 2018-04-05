import {
    COMPANY_SELECTED,
    APP_STATE,
    TEATIME_POSSITION,
    WOW_POSSITION,
    KOLIBRI_POSSITION,
    GANGVERK_POSSITION
} from '../actions/types'

const INITIAL_STATE = {
    selection: '',
    isInHome: true,
    companies: {
        teatime: {
            possition: {},
            info: {}
        },
        wow: {
            possition: {},
            info: {}
        },
        kolibri: {
            possition: {},
            info: {}
        },
        gangverk: {
            possition: {},
            info: {}
        }
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPANY_SELECTED:
            return { ...state, selection: action.payload, isInHome: false };
        case APP_STATE:
            return { ...state, appState: action.payload }
        case TEATIME_POSSITION:
            update = state.companies;
            update.teatime.possition = action.payload
            return { ...state, companies: update }
        case WOW_POSSITION:
            update = state.companies;
            update.wow.possition = action.payload
            return { ...state, companies: update }
        case KOLIBRI_POSSITION:
            update = state.companies;
            update.kolibri.possition = action.payload
            return { ...state, companies: update }
        case GANGVERK_POSSITION:
            update = state.companies;
            update.gangverk.possition = action.payload
            console.log(update)
            return { ...state, companies: update }
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