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
    
    //Manual calibration of elemt position due to lack of documentation fro the onLayout method
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
    console.log('Card size w/h', width, height)
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
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export const updateTranslationTargetCoordinates = (type, buttons) => {

    var coordinates = {}
    const marginOffset = 20;

    switch (type) {
        case TEATIME:

            coordinates.teatime = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.teatime.elementPositonX, buttons.teatime.elementPositonY,
                buttons.wow.elementPositonX, buttons.wow.elementPositonY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.teatime.elementPositonX, buttons.teatime.elementPositonY,
                buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.teatime.elementPositonX, buttons.teatime.elementPositonY,
                buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case WOW:

            coordinates.wow = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.wow.elementPositonX, buttons.wow.elementPositonY,
                buttons.teatime.elementPositonX, buttons.teatime.elementPositonY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.wow.elementPositonX, buttons.wow.elementPositonY,
                buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.wow.elementPositonX, buttons.wow.elementPositonY,
                buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case KOLIBRI:

            coordinates.kolibri = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY,
                buttons.wow.elementPositonX, buttons.wow.elementPositonY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY,
                buttons.teatime.elementPositonX, buttons.teatime.elementPositonY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY,
                buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case GANGVERK:
            
        coordinates.gangverk = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY,
                buttons.wow.elementPositonX, buttons.wow.elementPositonY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY,
                buttons.teatime.elementPositonX, buttons.teatime.elementPositonY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.gangverk.elementPositonX, buttons.gangverk.elementPositonY,
                buttons.kolibri.elementPositonX, buttons.kolibri.elementPositonY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }
            
            break;
    }

    return {
        type: UPDATE_TRANSLATION_TARGET,
        payload: coordinates
    }

}

calculateResultant = (Px, Py, Qx, Qy) => {
    return { x: Px - Qx, y: Py - Qy }
}

export const selectElement = (type) => {
    return {
        type: SET_SELECTED_ELEMENT,
        payload: type
    }
}