import { 
    GO_TO_DETAILS,
    Go_TO_HOME,
    START_ANIM,
    FINISH_REVERSE
} from './types'
import{ resetView } from '../actions'

export const goToDetail = () => {
    return {
        type: GO_TO_DETAILS
    }
}

export const goToHome = () => {
    return {
        type: Go_TO_HOME
    }
}

export const updatePosition = (company, position) => {
    
    return {
        type: company,
        payload: position
    }
}

export const startHomeButtonAnim = () => {
    return{
        type: START_ANIM
    }
}

export const finishReverseFlow= () =>{
    return{
        type: FINISH_REVERSE
    }
}