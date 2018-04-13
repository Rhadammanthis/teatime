import { Animated } from 'react-native';
import {
    COMPANY_SELECTED,
    APP_STATE,
    TEATIME,
    WOW,
    KOLIBRI,
    GANGVERK,
    UPDATE_TRANSLATION_TARGET,
    SET_SELECTED_ELEMENT,
    SAVE_ELEMENT_SIZE,
    FETCH_COMPANY_DATA,
    SAVE_SELECTED_ELEMENT_POSITION,
    RESET_VIEWS,
    SAVE_ELEMENTS_POSITION
} from '../actions/types'

const INITIAL_STATE = {
    wow: {
        color: 'rgba(154,37,41,1)',
        translationTarget: { x : 0, y: 0},
        elementPosition: { x : 0, y: 0},
        name: "WOW",
        image: require('../assets/wow.png'),
        animTranslation: new Animated.ValueXY(),
        animScale: new Animated.Value(0),
        z: 10
    },
    teatime: {
        color: 'rgba(241,64,92,1)',
        translationTarget: { x : 0, y: 0},
        elementPosition: { x : 0, y: 0},
        name: "Teatime",
        image: require('../assets/teatime.png'),
        animTranslation: new Animated.ValueXY(),
        animScale: new Animated.Value(0),
        z: 10
    },
    kolibri: {
        color: 'rgba(38,67,75,1)',
        translationTarget: { x : 0, y: 0},
        elementPosition: { x : 0, y: 0},
        name: "Kolibri",
        image: require('../assets/kolibri.png'),
        animTranslation: new Animated.ValueXY(),
        animScale: new Animated.Value(0),
        z: 10
    },
    gangverk: {
        color: 'rgba(171,201,175,1)',
        translationTarget: { x : 0, y: 0},
        elementPosition: { x : 0, y: 0},
        name: "Gangverk",
        image: require('../assets/gangverk.png'),
        animTranslation: new Animated.ValueXY(),
        animScale: new Animated.Value(0),
        z: 10
    },
    company: null,
    coordsUpdated: false,
    selection: "",
    scale: new Animated.Value(1),
    elementWidth: 0,
    elementHeight: 0,
    fetchedData: {},
    fetchedFinished: false,
    selectedElemntPosition: { x: 0, y: 0},
    shouldReverse: false,
    rgba: ''
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
        case UPDATE_TRANSLATION_TARGET:
            return {
                ...state,
                teatime: { ...state.teatime, translationTarget: { x: action.payload.teatime.x, y : action.payload.teatime.y}, z: action.payload.teatime.z ? 11 : 10 },
                wow: { ...state.wow, translationTarget: {x: action.payload.wow.x, y: action.payload.wow.y}, z: action.payload.wow.z ? 11 : 10 },
                kolibri: { ...state.kolibri, translationTarget: {x: action.payload.kolibri.x, y: action.payload.kolibri.y}, z: action.payload.kolibri.z ? 11 : 10 },
                gangverk: { ...state.gangverk, translationTarget: {x: action.payload.gangverk.x, y: action.payload.gangverk.y}, z: action.payload.gangverk.z ? 11 : 10 },
                coordsUpdated: true
            }
        case SAVE_ELEMENTS_POSITION:
            switch (action.payload.type) {
                case TEATIME:
                    return { ...state, teatime: { ...state.teatime, elementPosition: { x : action.payload.x, y : action.payload.y } } }
                case WOW:
                    return { ...state, wow: { ...state.wow, elementPosition: { x : action.payload.x, y : action.payload.y } } }
                case KOLIBRI:
                    return { ...state, kolibri: { ...state.kolibri, elementPosition: { x : action.payload.x, y : action.payload.y } } }
                case GANGVERK:
                    return { ...state, gangverk: { ...state.gangverk, elementPosition: { x : action.payload.x, y : action.payload.y } } }
            }
        case SET_SELECTED_ELEMENT:
            return { ...state, selection: action.payload, shouldReverse: false }
        case SAVE_ELEMENT_SIZE:
            return { ...state, elementWidth: action.payload.width, elementHeight: action.payload.height }
        case FETCH_COMPANY_DATA:
            return { ...state, fetchedData: action.payload, fetchedFinished: true }
        case SAVE_SELECTED_ELEMENT_POSITION:
            return { ...state, selectedElemntPosition: {x : action.payload.x, y: action.payload.y } }
        case RESET_VIEWS:
            return {
                ...state,
                coordsUpdated: false,
                selection: "",
                shouldReverse: true
            }
        default:
            return state;
    }
};