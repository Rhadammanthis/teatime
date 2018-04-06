import { Animated } from 'react-native';
import {
    COMPANY_SELECTED,
    APP_STATE,
    TEATIME,
    WOW,
    KOLIBRI,
    GANGVERK,
    UPDATE_COORDS,
    SET_SELECTED
} from '../actions/types'

const INITIAL_STATE = {
    wow: {
        finalX: 0,
        finalY: 0,
        name: "WOW",
        image: require('../assets/wow.png'),
        anim: new Animated.ValueXY(),
        extraAnim: new Animated.Value(0),
        z: 10
    },
    teatime: {
        finalX: 0,
        finalY: 0,
        name: "Teatime",
        image: require('../assets/teatime.png'),
        anim: new Animated.ValueXY(),
        extraAnim: new Animated.Value(0),
        z: 10
    },
    kolibri: {
        finalX: 0,
        finalY: 0,
        name: "Kolibri",
        image: require('../assets/kolibri.png'),
        anim: new Animated.ValueXY(),
        extraAnim: new Animated.Value(0),
        z: 10
    },
    gangverk: {
        finalX: 0,
        finalY: 0,
        name: "Gangverk",
        image: require('../assets/gangverk.png'),
        anim: new Animated.ValueXY(),
        extraAnim: new Animated.Value(0),
        z: 10
    },
    company: null,
    coordsUpdated: false,
    selection: "",
    scale: new Animated.Value(1)
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEATIME:
            return { ...state, company: state.teatime }
        case WOW:
            return { ...state, company: state.wow }
        case KOLIBRI:
            return { ...state, company: state.kolibri }
        case GANGVERK:
            return { ...state, company: state.gangverk }
        case UPDATE_COORDS:
            console.log('Coordinates', action.payload)
            return {...state, 
                teatime: {...state.teatime, finalX: action.payload.teatime.x, finalY: action.payload.teatime.y, z: action.payload.teatime.z ? 11 : 10 },
                wow: {...state.wow, finalX: action.payload.wow.x, finalY: action.payload.wow.y, z: action.payload.wow.z ? 11 : 10},
                kolibri: {...state.kolibri, finalX: action.payload.kolibri.x, finalY: action.payload.kolibri.y, z: action.payload.kolibri.z ? 11 : 10},
                gangverk: {...state.gangverk, finalX: action.payload.gangverk.x, finalY: action.payload.gangverk.y, z: action.payload.gangverk.z ? 11 : 10},
                coordsUpdated: true
            }
        case SET_SELECTED:
            return { ...state, selection : action.payload }
        default:
            return state;
    }
};