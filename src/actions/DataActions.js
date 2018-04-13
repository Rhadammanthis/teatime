import {
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
import axios from 'axios'
import { pointSubstraction } from '../util'

export const getCompanyData = (company) => {
    return {
        type: company,
    }
}

export const resetView = () => {
    return {
        type: RESET_VIEWS
    }
}

export const saveElementsPosition = (type, x, y, height) => {

    //Manual calibration of elemt position
    switch (type) {
        case KOLIBRI:
            y += height + 10
            break;
        case GANGVERK:
            y += height + 10
            break;
    }

    return {
        type: SAVE_ELEMENTS_POSITION,
        payload: { type: type, x: x, y: y }
    }
}

export const saveSelectedElementsPosition = (type, x, y, width, height) => {

    var selectedElemntPositionX, selectedElemntPositionY
    const marginOffset = 10
    
    //Manual calibration of elemt position due to lack of documentation from the onLayout method
    switch (type) {
        case TEATIME:
            selectedElemntPositionX = x
            selectedElemntPositionY = y
            break;
        case WOW:
            selectedElemntPositionX = x - (width / 2) - marginOffset
            selectedElemntPositionY = y
            break;
        case KOLIBRI:
            selectedElemntPositionX = x
            selectedElemntPositionY = y + (height / 2) + marginOffset
            break;
        case GANGVERK:
            selectedElemntPositionX = x - (width / 2) - marginOffset
            selectedElemntPositionY = y + (height / 2) + marginOffset
            break;
    }

    return {
        type: SAVE_SELECTED_ELEMENT_POSITION,
        payload: { x: selectedElemntPositionX, y: selectedElemntPositionY }
    }
}

export const saveElementSize = (width, height) => {
    return {
        type: SAVE_ELEMENT_SIZE,
        payload: { width: width, height: height }
    }
}

export const fetchCompanyData = (type) => {
    var url = `http://apis.is/company?name=${type}`

    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                dispatch({ type: FETCH_COMPANY_DATA, payload: response });
            })
            .catch((error) => {
                dispatch({ type: FETCH_COMPANY_DATA, payload: null });
            });
    }

}

export const updateTranslationTargetCoordinates = (type, buttons) => {

    var targetCoordinates = {}, origin = {}

    switch (type) {
        case TEATIME:

            origin = buttons.teatime.elementPosition

            targetCoordinates.teatime = { x: 0, y: 0, z: true }
            targetCoordinates.wow = pointSubstraction(origin, buttons.wow.elementPosition)
            targetCoordinates.kolibri = pointSubstraction(origin, buttons.kolibri.elementPosition)
            targetCoordinates.gangverk = pointSubstraction(origin, buttons.gangverk.elementPosition)

            break;
        case WOW:

            origin = buttons.wow.elementPosition

            targetCoordinates.wow = { x: 0, y: 0, z: true }
            targetCoordinates.teatime = pointSubstraction(origin, buttons.teatime.elementPosition)
            targetCoordinates.kolibri = pointSubstraction(origin, buttons.kolibri.elementPosition)
            targetCoordinates.gangverk = pointSubstraction(origin, buttons.gangverk.elementPosition)

            break;
        case KOLIBRI:

            origin = buttons.kolibri.elementPosition

            targetCoordinates.kolibri = { x: 0, y: 0, z: true }
            targetCoordinates.teatime = pointSubstraction(origin, buttons.teatime.elementPosition)
            targetCoordinates.wow = pointSubstraction(origin, buttons.wow.elementPosition)
            targetCoordinates.gangverk = pointSubstraction(origin, buttons.gangverk.elementPosition)

            break;
        case GANGVERK:
            
            origin = buttons.gangverk.elementPosition

            targetCoordinates.gangverk = { x: 0, y: 0, z: true }
            targetCoordinates.teatime = pointSubstraction(origin, buttons.teatime.elementPosition)
            targetCoordinates.kolibri = pointSubstraction(origin, buttons.kolibri.elementPosition)
            targetCoordinates.wow = pointSubstraction(origin, buttons.wow.elementPosition)
            
            break;
    }

    return {
        type: UPDATE_TRANSLATION_TARGET,
        payload: targetCoordinates
}

}

export const selectElement = (type) => {
    return {
        type: SET_SELECTED_ELEMENT,
        payload: type
    }
}