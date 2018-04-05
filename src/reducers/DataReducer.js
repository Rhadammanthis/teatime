import { Animated } from 'react-native';
import {
    COMPANY_SELECTED,
    APP_STATE,
    TEATIME,
    WOW,
    KOLIBRI,
    GANGVERK
} from '../actions/types'

const INITIAL_STATE = {
    teatime: {
        finalX: 0,
        finalY: 0,
        name: "Teatime",
        image: require('../assets/teatime.png'),
        anim: new Animated.ValueXY(),
        z: 10
    },
    wow: {
        finalX: 0,
        finalY: 0,
        name: "Teatime",
        image: require('../assets/teatime.png'),
        anim: new Animated.ValueXY(),
        z: 10
    },
    kolibri: {
        finalX: 0,
        finalY: 0,
        name: "Teatime",
        image: require('../assets/teatime.png'),
        anim: new Animated.ValueXY(),
        z: 10
    },
    gangverk: {
        finalX: 0,
        finalY: 0,
        name: "Teatime",
        image: require('../assets/teatime.png'),
        anim: new Animated.ValueXY(),
        z: 10
    },
    company: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEATIME:
            console.log("New props", state.teatime)
            return { ...state, company: state.teatime }
        case WOW:
            return { ...state, company: state.wow }
        case KOLIBRI:
            return { ...state, company: state.kolibri }
        case GANGVERK:
            return { ...state, company: state.gangverk }
        default:
            return state;
    }
};