import {
    TEATIME,
    WOW,
    KOLIBRI,
    GANGVERK,
    UPDATE_COORDS,
    SET_SELECTED
} from '../actions/types'

export const getCompanyData = (company) => {
    return {
        type: company,
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
            coordinates.teatime = { x: 0, y: (height + marginOffset)}
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

export const setSelectedButton = (type) => {
    return {
        type: SET_SELECTED,
        payload: type
    }
}