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
    RESET_VIEWS
} from '../actions/types'
import axios from 'axios'

export const getCompanyData = (company) => {
    return {
        type: company,
    }
}

export const resetView = () => {
    return{
        type: RESET_VIEWS
    }
}

export const saveSelectionPosition = (type, x, y, width, height) => {

    console.log('WHILE SAVING')
    console.log(x,y,height,width)

    var centerX, centerY
    switch (type) {
        case TEATIME:

            centerX = x 
            centerY = y 

            break;
        case WOW:

            centerX = x - (width/2) - 10
            centerY = y 
            break;
        case KOLIBRI:

            centerX = x 
            centerY = y + (height/2) + 10
            break;
        case GANGVERK:
            centerX = x - (width/2) - 10
            centerY = y + (height/2) + 10
            break;
    }

    console.log('WHILE SAVING')
    console.log(centerX, centerY)

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

export const updateTargetCoordinates = (type, width, height) => {

    var coordinates = {}
    const marginOffset = 20;

    switch (type) {
        case TEATIME:
            coordinates.teatime = { x: 0, y: 0, z: true }
            coordinates.wow = { x: (- width - marginOffset), y: 0 }
            coordinates.kolibri = { x: 0, y: (-height - marginOffset) }
            coordinates.gangverk = { x: (-width - marginOffset), y: (-height - marginOffset) }
            break;
        case WOW:
            coordinates.teatime = { x: (width + marginOffset), y: 0 }
            coordinates.wow = { x: 0, y: 0, z: true }
            coordinates.kolibri = { x: (width + marginOffset), y: (-height - marginOffset) }
            coordinates.gangverk = { x: 0, y: (-height - marginOffset) }
            break;
        case KOLIBRI:
            coordinates.teatime = { x: 0, y: (height + marginOffset) }
            coordinates.wow = { x: (- width - marginOffset), y: (height + marginOffset) }
            coordinates.kolibri = { x: 0, y: 0, z: true }
            coordinates.gangverk = { x: (-width - marginOffset), y: 0 }
            break;
        case GANGVERK:
            coordinates.teatime = { x: (width + marginOffset), y: (height + marginOffset) }
            coordinates.wow = { x: 0, y: (height + marginOffset) }
            coordinates.kolibri = { x: (width + marginOffset), y: 0 }
            coordinates.gangverk = { x: 0, y: 0, z: true }
            break;
    }

    return {
        type: UPDATE_COORDS,
        payload: coordinates
    }

}

calculateResultant = (Px, Py, Qx, Qy) => {
    return {x: Px - Qx, y: Py - Qy }
}

export const setSelectedButton = (type) => {
    return {
        type: SET_SELECTED,
        payload: type
    }
}