import {
    TEATIME,
    WOW,
    KOLIBRI,
    GANGVERK,
    UPDATE_COORDS,
    SET_SELECTED,
    RECORD_SIZE,
    FETCH_COMPANY_DATA,
    SELECTION_POSITON,
    RESET_VIEWS,
    SAVE_POSITION
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

export const savePosition = (type, x, y, height) => {

    switch (type) {

        case KOLIBRI:
            y += height + 10
            break;
        case GANGVERK:
            y += height + 10
            break;
    }

    return {
        type: SAVE_POSITION,
        payload: { type: type, x: x, y: y }
    }
}

export const saveSelectionPosition = (type, x, y, width, height) => {

    var centerX, centerY
    switch (type) {
        case TEATIME:

            centerX = x
            centerY = y

            break;
        case WOW:

            centerX = x - (width / 2) - 10
            centerY = y
            break;
        case KOLIBRI:

            centerX = x
            centerY = y + (height / 2) + 10
            break;
        case GANGVERK:
            centerX = x - (width / 2) - 10
            centerY = y + (height / 2) + 10
            break;
    }

    return {
        type: SELECTION_POSITON,
        payload: { x: centerX, y: centerY }
    }
}

export const recordSize = (width, height) => {
    console.log('Card size w/h', width, height)
    return {
        type: RECORD_SIZE,
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

export const updateTargetCoordinates = (type, buttons) => {

    var coordinates = {}
    const marginOffset = 20;

    switch (type) {
        case TEATIME:

            coordinates.teatime = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.teatime.positionX, buttons.teatime.positionY,
                buttons.wow.positionX, buttons.wow.positionY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.teatime.positionX, buttons.teatime.positionY,
                buttons.kolibri.positionX, buttons.kolibri.positionY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.teatime.positionX, buttons.teatime.positionY,
                buttons.gangverk.positionX, buttons.gangverk.positionY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case WOW:

            coordinates.wow = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.wow.positionX, buttons.wow.positionY,
                buttons.teatime.positionX, buttons.teatime.positionY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.wow.positionX, buttons.wow.positionY,
                buttons.kolibri.positionX, buttons.kolibri.positionY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.wow.positionX, buttons.wow.positionY,
                buttons.gangverk.positionX, buttons.gangverk.positionY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case KOLIBRI:

            coordinates.kolibri = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.kolibri.positionX, buttons.kolibri.positionY,
                buttons.wow.positionX, buttons.wow.positionY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.kolibri.positionX, buttons.kolibri.positionY,
                buttons.teatime.positionX, buttons.teatime.positionY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.kolibri.positionX, buttons.kolibri.positionY,
                buttons.gangverk.positionX, buttons.gangverk.positionY)
            coordinates.gangverk = { x: resultant.x, y: resultant.y }

            break;
        case GANGVERK:
            
        coordinates.gangverk = { x: 0, y: 0, z: true }

            var resultant = calculateResultant(buttons.gangverk.positionX, buttons.gangverk.positionY,
                buttons.wow.positionX, buttons.wow.positionY)
            coordinates.wow = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.gangverk.positionX, buttons.gangverk.positionY,
                buttons.teatime.positionX, buttons.teatime.positionY)
            coordinates.teatime = { x: resultant.x, y: resultant.y }

            var resultant = calculateResultant(buttons.gangverk.positionX, buttons.gangverk.positionY,
                buttons.kolibri.positionX, buttons.kolibri.positionY)
            coordinates.kolibri = { x: resultant.x, y: resultant.y }
            
            break;
    }

    return {
        type: UPDATE_COORDS,
        payload: coordinates
    }

}

calculateResultant = (Px, Py, Qx, Qy) => {
    return { x: Px - Qx, y: Py - Qy }
}

export const setSelectedButton = (type) => {
    return {
        type: SET_SELECTED,
        payload: type
    }
}